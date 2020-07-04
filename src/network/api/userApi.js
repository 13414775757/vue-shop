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


module.exports = router;