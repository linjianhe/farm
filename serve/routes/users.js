const express = require('express')
const router = express.Router()
const connection = require('../public/javascripts/mysql')
const nodemailer = require('nodemailer')
const utils = require('../public/javascripts/utils')
// const session = require('express-session')
const svgCaptcha = require('svg-captcha')
const jwt = require('../public/javascripts/token')

// 邮箱相关配置
let transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  service: 'qq',
  secure: true,
  auth: {
    user: '378176159@qq.com',
    pass: 'jmuhyvzubpwtcbeg'
  }
})

// 登录接口
router.post('/login', function(req, res, next) {
  let userName = req.body.userName
  let password = req.body.password
  let code = req.body.code.toLowerCase()

  // 判断验证码是否相等
  if (code !== req.session.captcha) {
    return res.json({ code: 101, msg: '图形验证码错误' })
  }

  // 判断账号密码是否相等
  connection.query('SELECT * from user', function (err, rows, fields) {
    if (err) {
      return res.json({ code: 201, msg: '数据获取失败' })
    }
    if (rows) { // 获取用户列表，循环遍历判断当前用户是否存在
      let isTrue = 0
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].userName === userName && rows[i].password === password) {
          isTrue = 1
          req.session.userId = rows[i].userId
          let token = jwt.encrypt({ id: rows[i].userId }, '1h')
          return res.json({ code: 200, msg: '登录成功', userInfo: { userName: rows[i].userName, money: rows[i].money }, token: token })
        }
      }
      if (!isTrue) {
        return res.json({ code: 0, msg: '账号或者密码错误' })
      }
    }
  })
})

router.post('/register', function (req, res, next) {
  connection.query('select * from user where email = ?', [req.body.email], function (err, rows, fields) {
    if (err) {
      return res.json({ code: 201, msg: '查询用户是否注册获取失败' })
    }
    if (rows.length) {
      return res.json({ code: 202, msg: '账号已经注册过了' })
    } else {
      // 判断邮件验证码
      connection.query('select * from checkCode where email = ?', [req.body.email], function (err, rows, fields) {
        if (err) {
          return res.json({ code: 201, msg: '查询用户注册验证码获取失败' })
        }
        if (rows.length) {
          if (rows[0].code === req.body.checkCode) {
            if ((new Date()).getTime() - rows[0].date < 5 * 60 * 1000) {
              let values = { userName: req.body.email, password: req.body.password, email: req.body.email, money: 0 }
              connection.query('INSERT INTO `user` SET ?', [values], function (err, rows, fields) {
                if (err) {
                  console.log('INSERT ERROR - ', err.message)
                  return
                }
                return res.json({ code: 200, msg: '注册成功' })
              })
            } else {
              return res.json({ code: 101, msg: '验证码已过期，请重新发送' })
            }
          } else {
            return res.json({ code: 0, msg: '验证码错误' })
          }
        } else {
          return res.json({ code: 0, msg: '验证码查询出现错误，请重新发送' })
        }
      })
    }
  })
})

router.post('/forgetPass', function (req, res, next) {
  connection.query('select * from user where email = ?', [req.body.email], function (err, rows, fields) {
    if (err) {
      return res.json({ code: 201, msg: '查询用户是否注册获取失败' })
    }
    if (!rows.length) {
      return res.json({ code: 202, msg: '该账号并未注册' })
    } else {
      // 判断邮件验证码
      connection.query('select * from checkCode where email = ?', [req.body.email], function (err, rows, fields) {
        if (err) {
          return res.json({ code: 201, msg: '查询用户注册验证码获取失败' })
        }
        if (rows.length) {
          if (rows[0].code === req.body.checkCode) {
            if ((new Date()).getTime() - rows[0].date < 5 * 60 * 1000) {
              let userModSql = 'UPDATE user SET password = ? WHERE email = ?'
              connection.query(userModSql, [req.body.password, req.body.email], function (err, rows, fields) {
                if (err) {
                  console.log('[UPDATE ERROR] - ', err.message)
                  return
                }
                return res.json({ code: 200, msg: '找回密码成功' })
              })
            } else {
              return res.json({ code: 101, msg: '验证码已过期，请重新发送' })
            }
          } else {
            return res.json({ code: 0, msg: '验证码错误' })
          }
        } else {
          return res.json({ code: 0, msg: '验证码查询出现错误，请重新发送' })
        }
      })
    }
  })
})

router.post('/sendEmail', function (req, res, next) {
  let email = req.body.email
  let code = utils.createCode()
  let mailOptions = {
    from: '378176159@qq.com',
    to: email,
    subject: 'You have a new checkCode',
    text: '您的验证码为' + code + '有效时间2分钟'
  }
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return res.json({ code: 202, msg: '发送失败' })
    }
    connection.query('select * from checkCode where email = ?', [req.body.email], function (err, rows, fields) {
      if (err) {
        return res.json({ code: 201, msg: '数据获取失败' })
      }
      if (rows.length) {
        // 之前已经发过验证码，把数据库中数据删除
        let userDelSql = 'DELETE FROM checkCode WHERE email = ?'
        connection.query(userDelSql, [email], function (err, result) {
          if (err) {
            console.log('[DELETE ERROR] - ', err.message)
          }
        })
      }
      let values = { email: email, code: code, date: (new Date()).getTime() }
      connection.query('INSERT INTO `checkCode` SET ?', [values], function (err, rows, fields) {
        if (err) {
          console.log('INSERT ERROR - ', err.message)
        }
      })
    })
    return res.json({ code: 200, msg: '邮件发送成功' })
  })
})

// 一次性图形验证码
router.get('/captcha', function (req, res, next) {
  let captcha = svgCaptcha.create({
    color: true,
    noise: 2,
    ignoreChars: '0oli',
    size: 4
  })
  req.session.captcha = captcha.text.toLocaleLowerCase()
  console.log(req.session)
  res.type('svg')
  res.send(captcha.data)
})

// 判断用户是否已经登录过
router.get('/isLogin', function (req, res, next) {
  let userId = req.session.userId
  connection.query('select * from user where userId = ?', [userId], function (err, rows, fields) {
    if (err) {
      return res.json({ code: 201, msg: '数据获取失败' })
    } else {
      if (rows.length) {
        return res.json({ code: 200, msg: '用户已经登录', userInfo: { userName: rows[0].userName, money: rows[0].money } })
      } else {
        return res.json({ code: 201, msg: '用户未登录' })
      }
    }
  })
})

// 登出
router.get('/logout', function (req, res, next) {
  if (req.session.userId) {
    delete req.session.userId
    return res.json({ code: 200, msg: '退出成功' })
  }
})

module.exports = router
