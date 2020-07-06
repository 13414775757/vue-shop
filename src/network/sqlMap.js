const sqlMap = {
  user: {
    // 登录验证用户名和密码
    queryUser: 'SELECT user_id, username, password, user_sex FROM users WHERE username = ? AND password = ?',
    // 添加 token
    insertToken: 'UPDARE users SET token = ? WHERE username = ?',
    // 获取所有用户
    getUserList: 'SELECT user_id, username, password, user_sex, user_phone, user_email FROM users LIMIT ?, ?',
    // 计算用户数量
    calcTotal: 'SELECT COUNT(1) AS total FROM users',
    // 添加用户
    insertOneUser: 'INSERT INTO users(user_id, username, password, user_sex, user_phone, user_email) VALUES(null, ?, ?, ?, ?, ?)',
    updataOneUser: 'UPDATE users SET user_sex = ?, user_phone = ?, user_email = ? WHERE user_id = ?',
    deleteOneUser: 'DELETE FROM users WHERE user_id = ?',
  },
  menus: {
    menusList: 'SELECT a.menu_id, a.menu_name, b.submenu_id, b.submenu_name, b.submenu_path FROM menus a LEFT JOIN submenus b ON a.menu_id = b.menu_id',
  }
};

module.exports = sqlMap;