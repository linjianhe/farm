const express = require('express');
const router = express.Router();
const connection = require('../public/javascripts/mysql')
const nodemailer = require('nodemailer')
const utils = require('../public/javascripts/utils')
const session = require('express-session')
const svgCaptcha = require('svg-captcha')

//邮箱相关配置
let transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  service: 'qq',
  secure: true,
  auth: {
    user: '378176159@qq.com',
    pass: 'jmuhyvzubpwtcbeg'
  }
})

router.post('/login', function(req, res, next) {
  console.log(req.session.captcha)
  let userName = req.body.userName
  let password = req.body.password
  connection.query('SELECT * from user', function (err, rows, fields) {
    if (err) {
      return res.json({code:201, msg: '获取失败'})
    }
    if(rows){ //获取用户列表，循环遍历判断当前用户是否存在
      let isTrue = 0
      for (let i=0;i<rows.length;i++) {
        if(rows[i].userName === userName && rows[i].password === password) {
          isTrue = 1
          return res.json({code:200, msg: '登录成功', userInfo: rows[i].userName})
        }
      }
      if(!isTrue) {
        return res.json({code: 201, msg: '账号或者密码错误' })
      }
    }
  })
});

router.post('/register', function (req, res, next) {
  console.log(req.body)
  connection.query('select * from user where email = ?', [req.body.email],function (err, rows, fields) {
    if(err){
      console.log('INSERT ERROR - ', err.message)
      return;
    }
    console.log(rows)
    if(rows.length) {
      return res.json({ code: 202, msg: '账号已经注册过了' })
    } else {
      let values = {userName: req.body.email, password: req.body.password, email: req.body.email, money: 0}
      connection.query('INSERT INTO `user` SET ?', [values],function (err, rows, fields) {
        if(err){
          console.log('INSERT ERROR - ', err.message)
          return;
        }
        return res.json({ code: 200, msg: '注册成功' })
      })
    }
  })
})

router.post('/forgetPass', function (req, res, next) {

})

router.post('/sendEmail', function (req, res, next) {
  let email = req.body.email;
  let code = utils.createCode()
  let mailOptions = {
    from: '378176159@qq.com',
    to: email,
    subject: 'You have a new checkCode',
    text: '您的验证码为' + code + '有效时间2分钟'
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return res.json({ code: 202, msg: '发送失败' })
    }
    return res.json({ code: 200, msg: '邮件发送成功' })
  })
})

//一次性图形验证码
router.get('/captcha', function (req, res, next) {
  let captcha = svgCaptcha.create({
    color: true,
    noise: 2,
    ignoreChars: '0oli',
    size: 4
  })
  req.session.captcha = captcha.text.toLocaleLowerCase()
  console.log(req.session.captcha)
  res.type('svg')
  res.send(captcha.data)
})

module.exports = router;
