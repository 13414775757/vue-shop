const db = require('../db.js');
const sqlMap = require('../sqlMap.js');
const express = require('express');
const router = express.Router();

// 获取所有分类以及二级分类的重构
router.get('/getAllClasses', function(request, response) {
  let pageNum = parseInt(request.query.pageNum);
  let pageSize = parseInt(request.query.pageSize);
  db.query(sqlMap.goods.queryAllClasses,[(pageNum-1)*pageSize, pageSize], function(error, data) {
    if (error) {
      response.json(error);
    }
    // console.log(data);
    let result = [];  // 一级分类数组
    let temp = [];
    for (let index = 0; index < data.length; index++) {
      let element = data[index];
      // 如果temp数组中没有对应的 class_id 
      if (temp.indexOf(element.class_id) === -1) {
        // 则，修改 element 单个对象的结构，并存入result数组中
        result.push({
          classId: element.class_id,
          goodsName: element.big_name,
          goodsTotal: element.goods_total,
          goodsUnit: element.goods_unit,
          description: element.goods_description,
          isShow: element.show_status === 1 ? true : false,
          children: [{ classId: element.second_class_id, goodsName: element.small_name, goodsTotal: element.second_class_count, goodsUnit: element.second_unit, isShow: element.show_status === 1 ? true : false}]
        });
        // 将修改结构后的 element 中的class_id 存入temp，作为后续判断
        temp.push(element.class_id);
      } else {
        // 如果 element.class_id 已经存在，将该 id 对应的二级分类存入 secondClass 二级分类数组
        for (let index = 0; index < result.length; index++) {
          // console.log(result[index]);
          // 如果一级分类的classId 对应到了element的class_id
          if (result[index].classId === element.class_id) {
            result[index].children.push({secondClassId: element.second_class_id, goodsName: element.small_name, goodsTotal: element.second_class_count, goodsUnit: element.second_unit, isShow: element.show_status === 1 ? true : false});
            break; // 中断上层for循环，回到第一层for循环
          }
        }
      }
    }
    // console.log(result);
    response.json(result);
  });
});

// 获取数量
router.get('/getClassesCount', function(request, response) {
  db.query(sqlMap.goods.calcTotal, function(error, data) {
    if (error) {
      return response.json(error);
    }
    response.json(data);
  });
});


module.exports = router;