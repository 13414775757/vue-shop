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
  },
  goods: {
    // 获取所有分类
    queryAllClasses: 'SELECT a.class_id, a.big_name, a.goods_total, a.goods_unit, a.show_status, a.goods_description, b.sec_id, b.small_name, b.second_class_count, b.second_unit, b.show_status FROM goods_category a LEFT JOIN goods_second_category b ON a.class_id = b.class_id LIMIT ?, ?',
    calcTotal: 'SELECT COUNT(*) AS total FROM goods_second_category',
    // calcSecondTotal: 'SELECT count(*) as total_2 From goods_second_category',
    // 获取所有二级分类
    getAllSecondClasses: 'SELECT '

  },
  orders: {
    // 获取所有订单
    getAllOrders: `SELECT 
    a.id, 
    a.order_no, 
    a.order_time, 
    a.username, 
    a.order_price, 
    a.pay_type, 
    a.order_status, 
    a.order_type, 
    a.order_integration, 
    a.delivery_no, 
    a.delivery_company, 
    a.receiver_name, 
    a.receiver_phone, 
    a.receiver_province, 
    a.receiver_address, 
    a.receiver_post_code, 
    a.pay_time,
    a.delivery_time, 
    a.receive_time, 
    a.order_note, 
    b.id as order_item_id, 
    b.product_id, 
    b.product_no, 
    b.product_pic, 
    b.product_name, 
    b.product_price, 
    b.product_brand, 
    b.product_count, 
    b.product_category, 
    b.product_attr,
    c.order_return_id, 
    c.create_time, 
    c.return_reason
    FROM orders a 
    LEFT JOIN 
    order_item b 
    ON 
    a.id = b.order_id 
    LEFT JOIN
    order_return c
    ON
    a.id = c.order_id 
    LIMIT ?, ?`,

    getTotal: 'SELECT count(1) AS total FROM orders',
    getMaxNo: 'SELECT MAX(delivery_no) AS maxNo FROM orders'
  }
};

module.exports = sqlMap;