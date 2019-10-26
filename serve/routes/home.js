const express = require('express')
const router = express.Router()
const connection = require('../public/javascripts/mysql')

router.get('/banner',function (req,res,next) {
  connection.query('SELECT * from banner', function (err, rows, fields) {
    if (err) {
      return res.send(err)
    }
    return res.json(rows);
  })
  // connection.end()
})

module.exports = router;
