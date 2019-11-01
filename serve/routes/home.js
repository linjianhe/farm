const express = require('express')
const router = express.Router()
const connection = require('../public/javascripts/mysql')

router.get('/banner',function (req,res,next) {
  connection.query('SELECT * from banner', function (err, rows, fields) {
    if (err) {
      return res.json({code:201, msg: '获取失败'})
    }
    return res.json({code:200, msg: 'success', data: rows})
  })
  // connection.end()
})

module.exports = router;
