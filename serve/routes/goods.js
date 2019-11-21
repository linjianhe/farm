var express = require('express')
var router = express.Router()
var connection = require('../public/javascripts/mysql')

router.get('/', function (req, res, next) {
  connection.query('SELECT * from goods', function (err, rows, fields) {
    if (err) {
      return res.json({ code: 201, msg: '获取失败' })
    }
    return res.json({ code: 200, msg: 'success', data: rows })
  })
  // next();
})

router.get('/detail', function (req, res, next) {
  let data = {}
  connection.query('SELECT * from goods where productId = ?', [req.query.id], function (err, rows, fields) {
    if (err) {
      return res.json({ code: 201, msg: '获取失败' })
    } else {
      data.goods = {
        productName: rows[0].productName,
        describe: rows[0].describe
      }
    }
  })
  connection.query('SELECT * from sku where productId = ?', [req.query.id], function (err, rows, fields) {
    if (err) {
      return res.json({ code: 201, msg: '获取失败' })
    } else {
      data.goodsSku = rows
      return res.json({ code: 200, msg: 'success', data: data })
    }
  })
})

router.get('/addCart', function (req, res, next) {
  console.log(req.query)
  if (req.session.userId) {
    // 查询自己购物车里是否有该商品
    connection.query('SELECT * from cart where productId = ? and goods_sku_id = ? and member_id= ?', [req.query.goodsId, req.query.goodsSkuId, req.session.userId], function (err, rows, fields) {
      if (err) {
        return res.json({ code: 201, msg: '获取失败' })
      } else {
        if (rows.length) {
          let num = Number(rows[0].goods_num) + Number(req.query.goodsNum)
          let sql = 'UPDATE cart SET goods_num = ? WHERE member_id = ? and goods_sku_id = ? and productId = ?'
          connection.query(sql, [num, req.session.userId, req.query.goodsSkuId, req.query.goodsId], function (err, rows, fields) {
            if (err) {
              console.log('INSERT ERROR - ', err.message)
            } else {
              return res.json({ code: 200, msg: '加入购物车成功' })
            }
          })
        } else {
          let values = { productId: req.query.goodsId, goods_sku_id: req.query.goodsSkuId, member_id: req.session.userId, goods_num: req.query.goodsNum }
          connection.query('INSERT INTO `cart` SET ?', [values], function (err, rows, fields) {
            if (err) {
              console.log('INSERT ERROR - ', err.message)
            } else {
              return res.json({ code: 200, msg: '加入购物车成功' })
            }
          })
        }
      }
    })
  } else {
    return res.json({ code: 201, msg: '请先登录' })
  }
})

router.get('/updateCart', function (req, res, next) {
  console.log(req.query)
  if (req.session.userId) {
    connection.query('SELECT * from sku where productId = ? and sku_id = ?', [req.query.goodsId, req.query.goodsSkuId], function (err, rows, fields) {
      if (err) {
        return res.json({ code: 201, msg: '获取失败' })
      } else {
        if (req.query.goodsNum > rows[0].stock) {
          return res.json({ code: 201, msg: '库存不足' })
        } else {
          let sql = 'UPDATE cart SET goods_num = ? WHERE member_id = ? and goods_sku_id = ? and productId = ?'
          connection.query(sql, [req.query.goodsNum, req.session.userId, req.query.goodsSkuId, req.query.goodsId], function (err, rows, fields) {
            if (err) {
              console.log('INSERT ERROR - ', err.message)
            } else {
              console.log(rows)
              return res.json({ code: 200, msg: '数量改变成功' })
            }
          })
        }
      }
    })
  } else {
    return res.json({ code: 201, msg: '请先登录' })
  }
})

// 查询购物车
router.get('/cartInfo', function (req, res, next) {
  // req.session.userId = 1
  if (req.session.userId) {
    connection.query('select * from cart where member_id = ?', [req.session.userId], function (err, rows, fields) {
      if (err) {
        console.log('INSERT ERROR - ', err.message)
      } else {
        // console.log(JSON.parse(JSON.stringify(rows)))
        let data = []
        for (let i in rows) {
          data[i] = {}
          data[i].num = rows[i].goods_num
          data[i].productId = rows[i].productId
          data[i].goods_sku_id = rows[i].goods_sku_id
          connection.query('select * from goods where productId = ?', [rows[i].productId], function (err, rows1, fields) {
            data[i].productName = rows1[0].productName
            data[i].checked = rows1[0].checked
          })
          connection.query('select * from sku where productId = ? and sku_id = ?', [rows[i].productId, rows[i].goods_sku_id], function (err, rows2, fields) {
            data[i].sku_name = rows2[0].sku_name
            data[i].special_price = rows2[0].special_price
            data[i].sale_price = rows2[0].sale_price
            data[i].sku_url = rows2[0].sku_url
            if (rows.length - i === 1) {
              return res.json({ code: 200, msg: 'success', data: data })
            }
          })
        }
      }
    })
  } else {
    return res.json({ code: 201, msg: '请先登录' })
  }
})

// 购物车商品增加

module.exports = router
