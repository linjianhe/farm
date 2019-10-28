var express = require('express');
var router = express.Router();
const connection = require('../public/javascripts/mysql')
const nodemailer = require('nodemailer')
// const bodyParse = require('body-parser')

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
  console.log(req.body)
  let userName = req.body.userName
  let password = req.body.password
  connection.query('SELECT * from user', function (err, rows, fields) {
    if (err) {
      return res.send(err)
    }
    if(rows){ //获取用户列表，循环遍历判断当前用户是否存在
      let isTrue = 0
      let data = {}
      for (let i=0;i<rows.length;i++) {
        if(rows[i].userName === userName && rows[i].password === password) {
          isTrue = 1
          let result = {
            code: 200,
            msg: 'succeed',
            userInfo: rows[i].userName
          };
          data.result = result;
          return res.json(data)
        }
      }
      if(!isTrue) {
        let result = {
          code: 201,
          msg: '账号或者密码错误'
        };
        data.result = result;
        return res.json(data)
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
      let data = {}
      let result = {
        code: 202,
        msg: '账号已经注册过了'
      };
      data.result = result;
      return res.json(data)
    } else {
      let values = {userName: req.body.email, password: req.body.password, email: req.body.email, money: 0}
      connection.query('INSERT INTO `user` SET ?', [values],function (err, rows, fields) {
        if(err){
          console.log('INSERT ERROR - ', err.message)
          return;
        }
        console.log("INSERT SUCCESS")
        let data = {}
        let result = {
          code: 200,
          msg: '注册成功'
        };
        data.result = result;
        return res.json(data)
      })
    }
  })
})

router.post('/sendEmail', function (req, res, next) {
  let email = req.body.email;

  let mailOptions = {
    // 发送邮件的地址
    from: '378176159@qq.com', // login user must equal to this user
    // 接收邮件的地址
    to: email,
    // 邮件主题
    subject: 'You have a new checkCode',
    // 以HTML的格式显示，这样可以显示图片、链接、字体颜色等信息
    text: '13579'
  };
  // 发送邮件，并有回调函数
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: ' + info.response);
  })
  res.send('111')
})

module.exports = router;
