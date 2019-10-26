var express = require('express');
var router = express.Router();
const connection = require('../public/javascripts/mysql')
// const bodyParse = require('body-parser')

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
        return res.send('账号或者密码错误');
      }
    }
  })
});

module.exports = router;
