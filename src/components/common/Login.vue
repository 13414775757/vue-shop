<template>
  <div class="login">
    <div class="loginBox">
      <div class="loginHeader">
        <h2>登录</h2>
      </div>
      <!-- 表单区 :rules绑定表单验证规则属性-->
      <el-form :model="loginForm" :rules="rules" ref="loginFormRef" label-width="0px" class="loginForm">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="toLogin()">登录</el-button>
          <el-button type="info" @click="reset()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 数据绑定
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 设置验证规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }  
        ]
      }
    }
  },
  methods: {
    toLogin() {
      // 发起登录请求前，进行表单验证
      this.$refs.loginFormRef.validate(validate => {
        if (!validate) return;
        // console.log(this.loginForm);
        this.$http.post('/login', this.loginForm)
        .then(result => {
          console.log(result);
          if (result.data.code === 400) {
            return this.$message.error(result.data.message);
          }
          if (result.data.code === 200) {
            // console.log(result.data.message);
            this.$message({
              message: result.data.message,
              type: 'success'
            });
            // console.log(result.data.token);
            // 保存生成的 token 到 sessionStorage(会话期间有效) localStorage 持久化有效
            window.sessionStorage.setItem('token', result.data.token);
            // 跳转
            this.$router.push('/home');
          }
        });
      });
    },
    // 重置表单
    reset() {
      // console.log(this);
      // this 中有一个 $refs 对象，里面有一个el-form表单中的属性ref,ref为表单的属性对象loginFormRef，
      // 再调用loginFormRef其重置方法。
      this.$refs.loginFormRef.resetFields();
      
    }
  }

}
</script>

<style scoped>
  .login {
    background-color: gray;
    height: 100%;
  }
  .loginBox {
    width: 450px;
    height: 300px;
    background-color: aliceblue;
    border-radius: 3px;
    position: absolute;
    /* 这里只能左上角处于屏幕居中 */
    left: 50%;
    top: 50%;
    /* 往x轴和y轴移动自身宽度50% 实现中心居中*/
    transform: translate(-50%, -50%);
  }
  .loginHeader {
    text-align: center;
  }
  .loginForm {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    /* 为元素设定的宽度和高度决定了元素的边框盒。 */
    box-sizing: border-box;
  }
  .btn {
    display: flex;
    justify-content: flex-end;
  }
</style>>
