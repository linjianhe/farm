var express = require('express')
var router = express.Router()
var connection = require('../public/javascripts/mysql')

router.get('/',function (req,res,next) {
  console.log(req.session.captcha)
	connection.query('SELECT * from goods', function (err, rows, fields) {
		if (err) {
			return res.send(err)
		}
		return res.json(rows);
	})
	// next();
})

module.exports = router;
