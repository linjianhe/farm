var express = require('express')
var router = express.Router()
var connection = require('../public/javascripts/mysql')

router.get('/',function (req,res,next) {
	connection.query('SELECT * from goods', function (err, rows, fields) {
		if (err) {
			return res.json({code:201, msg: '获取失败'})
		}
		return res.json({code:200, msg: 'success', data: rows})
	})
	// next();
})

module.exports = router;
