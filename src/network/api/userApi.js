const db = require('../db.js');
const sqlMap = require('../sqlMap.js');
const express = require('express');
const router = express.Router();
// token 导包
const jwt = require('jsonwebtoken');

// 登录验证
router.post('/login', function(request, response) {
  // console.log(request);
  let username = request.body.username;
  let password = request.body.password;
  db.query(sqlMap.user.queryUser, [username, password], function(error, data) {
    if (error) response.json(error);
    // console.log(data);
    if (data.length === 0) {
      response.json({
        message: '用户不存在',
        code: 400
      });
    } else {
      // 生成 token 
      let content ={username:request.body.username}; // 要生成token的主题信息
      let secretOrPrivateKey="zhy" // 这是加密的key（密钥） 
      let token = jwt.sign(content, secretOrPrivateKey, {
        expiresIn: 60*60*1  // 1小时过期
      });
      // console.log(token);
      // 将 token 存入数据库
      let sql = "UPDATE users SET token = '"+ token +"' WHERE username = '"+ username +"'";
      db.query(sql, function(error, result) {
        if (error) {
          return error;
        }
        // console.log(result);
        // 响应成功数据和token
        response.json({
          message: '登录成功',
          code: 200,
          token      //发给客户端
        });
      });
    }
  });
});

//获取侧边菜单
router.get('/getMenuList', function(request, response) {
  db.query(sqlMap.menus.menusList, function(error, data) {
    if (error) {
      response.json(error);
    }
    var result = [];   // 存储数据库返回的 data 修改后的新数组
    let temp = [];  
    for (let index = 0; index < data.length; index++) {
      let element = data[index];
      // 如果 temp 不包含 data[index].menu_id 
      if (temp.indexOf(element.menu_id) === -1) {
        // 在 result 中修改数组结构如下：
          result.push({
          menuId: element.menu_id,
          menuName: element.menu_name,
          // 子菜单
          children: [{submenuId: element.submenu_id, submenuName: element.submenu_name, submenuPath: element.submenu_path}]
        });
        // 并将该 data[index].menu_id 添加到 temp；用于后续判断
        temp.push(data[index].menu_id);
      } else {
        for (let index = 0; index < result.length; index++) {
          // console.log(result[index].children);
          // 如果 result[index] 中的 menuId 有重复，将该 element 中 menu_id 对应的 子菜单添加到 children 数组。
          if (result[index].menuId === element.menu_id) {
            result[index].children.push({submenuId: element.submenu_id, submenuName: element.submenu_name, submenuPath: element.submenu_path});
            break;
          }
        }
      }
    }
    response.json(result);
  });
});

//获取用户列表
router.get('/getUserList', function(request, response) {
  let keywords = request.query.keywords;
  let pageNum = parseInt(request.query.pageNum);
  let pageSize = parseInt(request.query.pageSize);
  // console.log(request);
  db.query(sqlMap.user.getUserList, [(pageNum-1)*pageSize, pageSize], function(error, data) {
    if (error) {
      response.json(error);
    }
    // console.log(data);
    let newData = [];
    // 根据搜索框关键字返回符合条件的数据
    newData = data.filter(item => {
      if (item.username.includes(keywords) || item.user_sex.includes(keywords) || item.user_phone.includes(keywords || item.user_email.includes(keywords))) {
        return true;
      }
    });
    // console.log(newData);
    response.json(newData);
  });
});
// 获取用户数量
router.get('/getTotalUser', function(request, response) {
  let total = '';
  // 查询总用户数
  db.query(sqlMap.user.calcTotal, function(error, result) {
    if (error) {
      response.json(error);
    }
    // console.log(result);
    
    response.json(result);
  });
});

// 添加新用户
router.post('/addNewUser', function(request, response) {
  // console.log(request.body);
  let username = request.body.username;
  let password = request.body.password;
  let gender = request.body.gender;
  let phone = request.body.phone;
  let email = request.body.email;
  let userInfo = [username, password, gender, phone, email];
  db.query(sqlMap.user.insertOneUser, userInfo, function(error, data) {
    if (error) {
      response.json(error);
    }
    console.log(data);
    response.json(data);
  });
});

// 修改用户
router.put('/editUserInfo', function(request, response) {
  // console.log(request.body);
  let userId = request.body.user_id;
  let userSex = request.body.user_sex;
  let userPhone = request.body.user_phone;
  let userEmail = request.body.user_email;
  let editInfo = [userSex, userPhone, userEmail, userId];
  db.query(sqlMap.user.updataOneUser, editInfo, function(error, data) {
    if (error) {
      response.json(error);
    }
    // console.log(data);
    response.json(data);
  });
});

// 删除用户
router.delete('/deleteUser', function(request, response) {
  // console.log(typeof request.query.id);
  let id = request.query.id;
  db.query(sqlMap.user.deleteOneUser, id, function(error, data) {
    if (error) response.json(error);
    // console.log(data);
    
    response.json(data);
  });
});

module.exports = router;