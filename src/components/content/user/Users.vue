<template>
  <div class="user">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item class="active">用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-input v-model="queryInfo.keywords" placeholder="请输入内容" class="input-with-select" clearable>
            <el-button @click="getUserList()" slot="append" icon="el-icon-search"></el-button>
          </el-input>    
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addUserDialog = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!--当el-table元素中注入data对象数组后，在el-table-column中用prop属性来对应对象中的键名即可填入数据 -->
      <el-table border stripe :data="usersList">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="性别" prop="user_sex"></el-table-column>
        <el-table-column label="电话" prop="user_phone"></el-table-column>
        <el-table-column label="邮箱" prop="user_email"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">  
            <el-button
              size="mini"
              type="primary"
              @click="editUserMsg(scope.row)">编辑</el-button>  <!-- scope.row 可以获取到对应行的数据 -->
            <el-button  
              size="mini"
              type="danger"
              @click="deleteUser(scope.row.user_id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页栏 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :background="true"
        :current-page="queryInfo.pageNum"   
        :page-sizes="[2, 3, 4, 5]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>

      <!-- 添加用户对话框 -->
      <el-dialog title="注册用户" :visible.sync="addUserDialog" @close="reset()">
        <!-- 对话框表单 -->
        <el-form :model="addUserForm" :rules="addUserRules" 
        :status-icon="true" ref="addUserFormRef" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addUserForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="addUserForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-select placeholder="请选择性别" v-model="addUserForm.gender">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input v-model="addUserForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addUserForm.email"></el-input>
          </el-form-item>
        </el-form>
        <!-- 对话框底部 -->
        <div slot="footer" class="dialog-footer">
          <el-button @click="addUserDialog = false">取 消</el-button>
          <el-button type="info" @click="reset()">重置</el-button>
          <el-button type="primary" @click="addUserConfirm()">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 修改用户对话框 -->
      <el-dialog title="编辑用户" :visible.sync="editUserDialog" @close="editUserDialogClose()">
        <el-form :status-icon="true" :model="editUserForm" :rules="editUserRules" ref="editUserFormRef" label-width="80px" class="demo-ruleForm" >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="editUserForm.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-select placeholder="请选择性别" v-model="editUserForm.user_sex">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号" prop="user_phone">  <!-- prop属性用户获取校验规则 -->
            <el-input v-model="editUserForm.user_phone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="user_email">
            <el-input v-model="editUserForm.user_email"></el-input>
          </el-form-item>
        </el-form>
        <!-- 对话框底部 -->
        <div slot="footer" class="dialog-footer">
          <el-button @click="editUserDialog = false">取 消</el-button>
          <el-button type="info" @click="editUserDialogClose()">重置</el-button>
          <el-button type="primary" @click="editUserConfirm()">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    // 自定义验证邮箱规则 （查看element表单验证自定义验证）
    var checkEmail = (rule, value, callback) => {
      // 通过正则进行验证
      // ^()对于任意符合，+ 表示至少1个，@表示@字符拼接，\. 表示 . 
      const RegEmail = /^([a-zA-Z0-9])+@([a-zA-Z0-9])+(\.[a-zA-Z0-9])+/;
      if (RegEmail.test(value)) {
        // 如果匹配成功，合法邮箱，调用callback
        return callback();
      }
      callback(new Error('请输入正确邮箱格式'));
    };
    // 自定义验证手机号规则
    var checkPhone = (rule, value, callback) => {
      // 正则验证手机号 ^1表示以1开头 \d{9}$ $表示结尾 \d 表示数字 {9} 表示 9 个
      const RegPhone = /^[1](3|4|5|7|8)\d{9}$/;
      // const RegPhone = /^[1](3|4|5|7|8)[0-9]{9}$/;
      if (RegPhone.test(value)) {
        // 验证成功
        return callback();
      }
      // 验证失败
      callback(new Error('手机号格式错误'));
    };
    return {
      queryInfo: {
        keywords: '',
        pageNum: 1,     // 页码
        pageSize: 2     // 每页显示数量
      },
      total: 0,          // 存储用户数量
      usersList: [],      // 存储用户列表
      addUserDialog: false,    // 添加用户对话框是否可见
      editUserDialog: false,  // 编辑用户对话框   
      addUserForm: {         // 添加用户的表单数据对象
        username: '',
        password: '',
        gender: '男',
        phone: '',
        email: ''
      },  
      // 添加用户表单验证规则
      addUserRules: {
        username: [
          {required: true, message: '请输入用户名',trigger: 'blur'},
          {min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur'}
          ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur'}
        ],
        phone: [
          // 根据自定义验证变量，使用表单的方法 validator 进行验证
          {required: true, validator: checkPhone, trigger: 'blur'}
        ],
        email: [
          {required: true, validator: checkEmail, trigger: 'blur'}
        ]  
      },
      // 编辑用户表单验证规则
      editUserRules: {
        user_phone: [
          // 根据自定义验证变量，使用表单的方法 validator 进行验证
          {required: true, validator: checkPhone, trigger: 'blur'}
        ],
        user_email: [
          {required: true, validator: checkEmail, trigger: 'blur'}
        ]  
      },
      editUserForm: {},    // 存储根据scope.row获取的用户    
    }
  },
  created() {
    this.getUserList();
    this.getTotalUser();
  },
  methods: {
    // 获取用户列表
    getUserList() {
      this.$http.get('/getUserList', { params:this.queryInfo })
      .then(result => {
        if (result.status !== 200) {
          return;
        }
        // console.log(result);
        this.usersList = result.data;
      });
    },
    // 获取用户数量
    getTotalUser() {
      this.$http.get('/getTotalUser')
      .then(result => {
        // console.log(result.data);
        this.total = result.data[0].total;
      });
    },
    // 监听 pageSize 改变的事件
    handleSizeChange(value) {
      console.log(`每页 ${value} 条`);
      this.queryInfo.pageSize = value;
      this.getUserList();
    },
    // 监听页码值改变的事件
    handleCurrentChange(value) {
      console.log(`当前页: ${value}`);
      this.queryInfo.pageNum = value;
      this.getUserList();
    },
    // 重置表单
    reset() {
      // console.log(this);
      // this 中有一个 $refs 对象，里面有一个el-form表单中的属性ref,ref为表单的属性对象addUserFormRef，
      // 再调用addUserFormRef其重置方法。
      this.$refs.addUserFormRef.resetFields();
      
    },
    // 点击确定按钮添加用户
    addUserConfirm() {
      // 添加前进行表单预验证
      this.$refs.addUserFormRef.validate(valid => {
        // console.log(valid);
        // 如果 false 验证不通过直接返回
        if (!valid) {
          return;
        }
        // 验证通过提交表单
        this.$http.post('/addNewUser', this.addUserForm)
        .then(result => {
          // console.log(result);
          if (result.status !== 200) {
            return this.$message.error('添加用户失败!!!');
          }
          this.$message.success('添加用户成功!!!');
          this.addUserDialog = false;
          this.getUserList();
        }).catch(error => {
          return error;
        });
      });
    },
    // 获取要编辑的用户
    editUserMsg(user) {
      this.editUserDialog = true;
      // console.log(user);
      this.editUserForm = user;
    },
    editUserDialogClose() {
      // resetFields	对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
      this.$refs.editUserFormRef.resetFields();
    },
    // 确定修改发送请求
    editUserConfirm() {
      // console.log(this.editUserForm);
      // 表单验证通过判断
      this.$refs.editUserFormRef.validate(valid => {
        // 验证不通过直接返回
        if (!valid) {
          return this.$message.error('修改内容有误，请重新检查!!!');
        }
        // 验证通过
        this.$http.put('/editUserInfo', this.editUserForm)
        .then(result => {
          if (result.status !== 200) {
            return this.$message.error('修改信息出现错误!!!');
          }
          this.$message.success('修改信息成功!!!');
          this.editUserDialog = false;  // 关闭对话框
          this.getUserList();    // 重新获取新数据
        });
      }); 
    },
    // 删除用户
    deleteUser(id) {
      this.$messageBox.confirm('你确定要删除该用户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {    // 点击确定删除成功执行
        this.$http.delete('/deleteUser?id=' + id)    // 发起删除请求
        .then(result => {      // 请求成功
          if (result.status !== 200) {
            return this.$message.error('删除失败了');
          }
          this.$message.success('删除成功了');
          this.getUserList();   // 刷新
        }).catch(error => error);    // 请求失败
      }).catch(() => this.$message.warning('真是深思熟虑呢！！！'));  // 点击取消
    }
  }

}
</script>

<style scoped>
  .box-card {
    margin-top: 15px;
    box-shadow: 0 1px 1px 1px lightgray !important;
  }
  .el-table {
    margin-top: 15px;
    color: black;
  }
  .el-pagination {
    margin-top: 10px;
  }
</style>