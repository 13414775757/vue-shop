const db = require('../db.js');
const sqlMap = require('../sqlMap.js');
const express = require('express');
const router = express.Router();

// 获取所有订单
router.get('/getAllOrders', function(request, response) {
  // console.log(request.query);
  let size = parseInt(request.query.pageSize);
  let num = parseInt(request.query.pageNum);
  db.query(sqlMap.orders.getAllOrders,[(num-1)*size, size], function(error, data) {
    if (error) {
      return response.json(error);
    }
    // console.log(data);
    response.json(data);
  });
});
// 获取总数
router.get('/getTotal', function(request, response) {
  db.query(sqlMap.orders.getTotal, function(error, data) {
    if (error) {
      return response.json(error);
    }
    // console.log(data);
    response.json(data);
  });
});

// 获取最大物流单号
router.get('/getMaxDeliveryNo', function(request, response) {
  db.query(sqlMap.orders.getMaxNo, function(error, data) {
    if (error) {
      return response.json(error);
    }
    // console.log(data);
    response.json(data);
  });
});

module.exports = router;