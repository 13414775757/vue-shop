const sqlMap = {
  user: {
    queryUser: 'SELECT user_id, username, password, user_sex FROM users WHERE username = ? AND password = ?',
    insertToken: 'UPDARE users SER token = ? WHERE username = ?',
  }
};

module.exports = sqlMap;