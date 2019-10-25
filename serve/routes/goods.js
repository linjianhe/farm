var express = require('express')
var router = express.Router()
var mysql = require('mysql')

router.get('/',function (req,res,next) {
	var connection = mysql.createConnection({
		host     : 'localhost',
	    user     : 'root',
	    password : '123456',
	    database : 'g4'
	})
	connection.connect();
	connection.query('SELECT * from t_goods_info', function (err, rows, fields) {
		if (err) {
			return res.send(err)
		}
		return res.json(rows);
	})
	connection.end()
	// next();
})

module.exports = router;
