<template>
  <div class="goods-class">
     <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item><b>商品分类</b></el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 商品分类 -->
    <el-card shadow="always">
      <el-row>
        <el-col :span="20">商品分类</el-col>
        <el-col 
        class="addclass" 
        :span="4">
          <el-button type="primary" @click="addCategory()">添加分类</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <!-- :data 数据源 -->
      <tree-table class="treeTable" 
          show-index index-text="#"
          :data="classesList"
          :columns="columns" 
          border
          :selection-type="false"
          :expand-type="false">
          <template slot="isShow" slot-scope="scope">
            <el-switch v-model="scope.row.isShow" @change="changeShow(scope.row.isShow)">
            </el-switch>
          </template>
          <template slot="setting" > 
              <el-button type="Info" size="mini"><i class="el-icon-share"></i>
              转移商品</el-button>
          </template>
          <template slot="handle" slot-scope="scope">
            <el-button type="Info" size="mini" @click="editClass(scope.row)">
              <i class="el-icon-edit"></i>编辑
            </el-button>
            <el-button type="danger" size="mini" @click="deleteClass(scope.row)">
              <i class="el-icon-delete-solid"></i>删除
            </el-button>
          </template>
      </tree-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :background="true"
        :current-page="queryInfo.pageNum"
        :page-sizes="[10, 20, 30]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalClasses">
      </el-pagination>
    </el-card>
    <!-- 添加分类对话框 -->
    <el-dialog title="添加分类" :visible.sync="addClassDialogVisable">
      <!-- 对话框表单 -->
      <el-form :status-icon="true" :model="addCategoryForm" :rules="addCategoryRules" ref="addCategoryRef" label-width="100px">
        <el-form-item label="分类名称：" prop="categoryName">
          <el-input v-model="addCategoryForm.categoryName"></el-input>
        </el-form-item>
        <el-form-item label="二级分类：" prop="secondName">
          <el-input v-model="addCategoryForm.secCateName"></el-input>
        </el-form-item>
        <el-form-item label="数量单位：">
          <el-input v-model="addCategoryForm.unit"></el-input>
        </el-form-item>
        <el-form-item label="是否显示：">
          <el-radio-group v-model="addCategoryForm.isShow">
            <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商品描述：">
          <el-input v-model="addCategoryForm.description"></el-input>
        </el-form-item>
      </el-form>
      <!-- 对话框底部 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="addClassDialogVisable = false">取 消</el-button>
        <el-button type="info" @click="addCategoryReset()">重置</el-button>
        <el-button type="primary" @click="addCategoryConfirm()">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      classesList: [],    // classList 存储的 tree-table 的二级分类数组名称要为children才有效
      columns: [   // tree-table 绑定的每一个表格行属性
        {
          label: '分类名称',
          prop: 'goodsName',
          headerAlign: 'center',
          align: 'center'
        },
        {
          label: '数量',
          prop: 'goodsTotal',
          headerAlign: 'center',
          align: 'center'
        },
        {
          label: '数量单位',
          prop: 'goodsUnit',
          headerAlign: 'center',
          align: 'center'
        },
        {
          label: '是否显示',
          type: 'template',
          template: 'isShow',
          headerAlign: 'center',
          align: 'center'
        }, 
        {
          label: '设置',
          type: 'template',
          template: 'setting',
          headerAlign: 'center',
          align: 'center'
        },
        {
          label: '操作',
          prop: '',
          type: 'template',
          template: 'handle',
          headerAlign: 'center',
          align: 'center'
        }
      ],
      queryInfo: {
        pageNum: 1,   // 页码
        pageSize: 10    // 每页数量
      },
      totalClasses: 0,
      addClassDialogVisable: false,  // 添加分类表单是否可见
      addCategoryForm: {
        categoryName: '',  // 分类名称
        secCateName: '',  // 子类名称
        unit: '',     // 单位
        isShow: 1, // 是否显示
        description: ''
      },
      addCategoryRules: {
        categoryName: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ],
        secondName: [
          { required: true, message: '请输入子类名称', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getAllClasses();
    this.getCountOfClasses();
  },
  methods: {
    // 获取所有分类
    getAllClasses() {
      this.$http.get('/getAllClasses', {params: this.queryInfo})
      .then(result => {
        if (result.status !== 200) {
          return this.$message.error('获取数据出错，请重新加载!');
        }
        this.classesList = result.data;
        // console.log(this.classesList);
      }).catch(error => error);
    },
    // 获取总数
    getCountOfClasses() {
      this.$http.get('/getClassesCount')
      .then(result => {
        if (result.status !== 200) {
          return;
        }
        // console.log(result.data);
        this.totalClasses = result.data[0].total;
      });
    },
    // 监听 pageSize 改变的事件
    handleSizeChange(value) {
      // console.log(`每页 ${value} 条`);
      this.queryInfo.pageSize = value;
      this.getAllClasses();
    },
    // 监听 pageNum 改变的事件
    handleCurrentChange(value) {
      // console.log(`当前页: ${value}`);
      this.queryInfo.pageNum = value;
      this.getAllClasses();
    },
    // 改变是否显示
    changeShow(value) {
      console.log(value);
      
    },
    // 添加分类事件
    addCategory() {
      this.addClassDialogVisable = true;

    },
    // 编辑分类
    editClass(item) {
      console.log(item);
      
    },
    // 删除分类
    deleteClass(item) {
      console.log(item);
      
    },
    // 重置表单
    addCategoryReset() {
      this.$refs.addCategoryRef.resetFields();
    }
  }
}
</script>

<style scoped>
  .goods-class {
    height: 0px;
  }
  .el-card {
    margin-top: 15px;
  } 
  /* 添加分类按钮靠右 */
  .addclass {  
    float: right;
    width: unset;
  }
  .treeTable{
    margin-top: 10px;
  }
  .el-pagination {
    margin-top: 10px;
  }
</style>