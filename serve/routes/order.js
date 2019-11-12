const express = require('express')
const router = express.Router()
const utils = require('../public/javascripts/utils')
const connection = require('../public/javascripts/mysql')

router.post('/addOrder', function (req, res, next) {
  console.log(req.body)
  if(req.session.userId) {
    const totalPrice = req.body.total
    let orderId = utils.createOrderId()
    let time = utils.formatTime()
    let values = {order_id: orderId, order_price: totalPrice, pay_price: 0, member_id: req.session.userId, order_status: 1, receiver_name: '林剑河', receiver_tel: '15059088060', receiver_address: '福建省漳平市溪南镇下林村44号', create_time: time}
    connection.query('INSERT INTO `order` SET ?', [values],function (err, rows, fields) {
      if(err){
        console.log('INSERT ERROR - ', err.message)
        return;
      } else {
        let goodsList = req.body.goods
        for(let i=0;i<goodsList.length;i++) {
          let goods = goodsList[i]
          let values = {order_id: orderId, productId: goods.productId, productName: goods.productName, goods_sku_id: goods.goods_sku_id, goods_sku_name: goods.sku_name, goods_num: goods.num, salePrice: goods.sale_price, discount_price: goods.special_price, productImg: goods.sku_url}
          connection.query('INSERT INTO `order_goods` SET ?', [values],function (err, rows, fields) {
            if(err){
              console.log('INSERT ERROR - ', err.message)
              return;
            }
          })
          if(goodsList.length - i === 1){
            return res.json({code:200, msg: '成功'})
          }
        }
      }
    })
  } else {
    return res.json({code:201, msg: '请先登录'})
  }
})

router.post('/getOrder', function (req, res) {
  if(req.session.userId) {
    connection.query('select * from `order` where member_id = ?', [req.session.userId],function (err, rows1, fields) {
      if(err){
        console.log('INSERT ERROR - ', err.message)
        return;
      } else {
        let data = []
        for(let i in rows1){
          data[i] = {}
          data[i].order = rows1[i]
          connection.query('select * from `order_goods` where order_id = ?', [rows1[i].order_id],function (err, rows2, fields) {
            if(err){
              console.log('INSERT ERROR - ', err.message)
              return;
            } else {
              data[i].goods = rows2
              if(rows1.length - i === 1){
                res.json({code:200, msg: 'success', data: data})
              }
            }
          })
        }
      }
    })
  } else {
    return res.json({code:201, msg: '请先登录'})
  }
})

module.exports = router
