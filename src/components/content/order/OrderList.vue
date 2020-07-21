<template>
  <div id="orderList">
    <el-card>
      <!-- 头部区域 -->
      <el-row>
        <el-col :span="16">
          <span class="el-icon-search"></span> 筛选搜索
        </el-col>
        <el-col :span="8">
          <div class="orderBtn">
            <el-button size="small" type="info" @click.stop="resetSearchForm()">重置</el-button>
            <el-button size="small" type="primary">查询搜索</el-button>
          </div>
        </el-col>
      </el-row>
      <!-- 搜索区域 -->
      <!-- form-item 中的 prop 属性是进行表单验证及表单重置 prop 属性值必须等于表单输入框中的 -->
      <el-row :gutter="20" class="order-search">
        <el-form label-width="80px" :model="searchForm" ref="searchFormRef">
          <el-col :span="8">
            <el-form-item label="订单号:" prop="orderNo">
            <el-input clearable v-model="searchForm.orderNo" placeholder="输入订单号" ></el-input>
          </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收件人:" prop="addressee">
            <el-input clearable v-model="searchForm.addressee" placeholder="收件人姓名/手机号"></el-input>
          </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="下单时间:" prop="time">
              <el-date-picker
                v-model="searchForm.time"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单状态:" prop="orderStatus">
              <el-select 
              v-model="searchForm.orderStatus" 
              placeholder="选择订单状态"
              :clearable="true">   
                <el-option 
                v-for="item in orderAllStatus" :key="item.id"
                :label="item.status"
                :value="item.status">   <!-- value 绑定选中的值 -->
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单分类:" prop="cate">
              <!-- v-model 确定选中的值，并存入 -->
              <el-select 
              v-model="searchForm.cate" 
              placeholder="选择订单分类"
              :clearable="true">   
                <el-option 
                v-for="item in orderCategories" :key="item.id"
                :label="item.label"
                :value="item.label">   <!-- value 绑定选中的值 -->
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="支付方式:" prop="pay">
              <el-select 
              v-model="searchForm.pay" 
              placeholder="选择支付方式"
              :clearable="true">
                <el-option 
                v-for="item in payWays" :key="item.value"
                :label="item.label"
                :value="item.label">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col> 
        </el-form>
      </el-row>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 订单展示 -->
      <span class="el-icon-document"> 数据展示</span>
      <el-divider></el-divider>
      <el-table border stripe :data="orderListBySearchForm(searchForm)" 
      @selection-change="handleSelectionChange"
      tooltip-effect="dark">
        <el-table-column align="center" type="selection"></el-table-column>
        <el-table-column align="center" label="订单号" prop="order_no"></el-table-column>
        <el-table-column align="center" label="下单时间" prop="order_time">
          <!-- 使用过滤器 -->
          <template slot-scope="scope">
            {{scope.row.order_time | timeFormat}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="用户账户" prop="username"></el-table-column>
        <el-table-column align="center" label="订单金额" prop="order_price">
          <!-- 使用过滤器 -->
          <template slot-scope="scope">
            {{scope.row.order_price | priceFormat}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="支付方式" prop="pay_type"></el-table-column>
        <el-table-column align="center" label="订单状态" prop="order_status"></el-table-column>
        <el-table-column align="center" label="操作" min-width="120px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="seeOrder(scope.row)">查看订单</el-button>
            <el-button size="mini" 
            :type="scope.row.order_status === '已退款' ? btnStyle[0] : btnStyle[1]" 
            @click="operateOrder(scope.row)"> <!--按钮文字根据方法返回值显示-->
              {{selectBtnMsg(scope.row.order_status)}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :background="true"
      :current-page="pageInfo.pageNum"
      :page-sizes="[3, 4, 5, 6]"
      :page-size="pageInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 搜索内容
      searchForm: {
        orderNo: '',   // 订单号
        addressee: '',  // 收件人
        orderStatus: '', // 订单状态
        pay: '',  // 支付方式 select 框默认绑定
        cate: '', // 分类选择 select 框默认选择
        time: ''
      },
      payWays: [     // 支付方式 options
        {value: 1, label: '微信'},
        {value: 2, label: '支付宝'},
        {value: 3, label: '银行卡'},
      ],
      orderCategories: [   // 分类选择 options 
        {id: 1, label: '服装'},
        {id: 2, label: '家用家电'},
        {id: 3, label: '手机数码'},
        {id: 4, label: '零食'},
        {id: 5, label: '运动鞋'},
      ],
      orderList: [],   // 订单列表数据
      btnStyle: ['danger','info'],   // 根据订单状态，选择不同的按钮样式
      active: 0,  // 步骤条的默认步骤
      orderAllStatus: [   // 所有订单状态
        {id: 1, status: '已完成'}, 
        {id: 2, status: '待发货'}, 
        {id: 3, status: '已发货'}, 
        {id: 4, status: '已退款'}, 
        {id: 5, status: '退货中'}
      ],
      pageInfo: {
        pageNum: 1,
        pageSize: 4
      },
      total: 0,
    }
  },
  created() {
    this.getAllOrders();
    this.getTotal();
    // console.log(this.orderList);
  },
  methods: {
    // 获取所有订单
    getAllOrders() {
      this.$http.get('/getAllOrders', {params: this.pageInfo})
      .then(result => {       
        if (result.status !== 200) {
          return;
        }
        this.orderList = result.data;
        // console.log(this.orderList);
      }).catch(error => {
        return error;
      });
    },
    // 获取total
    getTotal() {
      this.$http.get('/getTotal')
      .then(result => {
        if (result.status !== 200) {
          return;
        }
        this.total = result.data[0].total;
      }).catch(error => {
        return error;
      });
    },
    // 重置搜索表单
    resetSearchForm() {
      // console.log(this.searchForm);
      this.$refs.searchFormRef.resetFields();
    },
    //根据搜索框内容展示
    orderListBySearchForm(searchForm) {
      let newOrderList = [];
      newOrderList = this.orderList.filter(item => {
        if (item.order_no.includes(searchForm.orderNo) && (item.username||item.receiver_phone).includes(searchForm.addressee) && item.order_status.includes(searchForm.orderStatus) && item.pay_type.includes(searchForm.pay) && item.order_time.includes(searchForm.time) && item.product_category.includes(searchForm.cate)) {
          return true;
        }
      });
      return newOrderList;
    },
    // 查看当前订单
    seeOrder(order) {
      // 根据不同状态，实现跳转不同位置并携带该订单信息
      if (order.order_status === "待发货") {
        this.$router.push({path: '/waitDelivery', query: {order: order}});
      } else if (order.order_status === "已发货") {
        this.$router.push({path: '/hadDeliverOrder', query: {order: order}});
      } else if (order.order_status === "已完成") {
        this.$router.push({path: '/finished', query: {order: order}});
      } else if (order.order_status === "已退款") {
        this.$router.push({path: '/closed', query: {order: order}});
      } else if (order.order_status === "退货中") {
        this.$router.push({path: '/returning', query: {order: order}})
      } 
    },
    // 处理订单
    operateOrder(order) {
      if (order.order_status === "待发货") {
        this.$router.push({path: '/orderDelivery', query: {order: order}});
      }
      if (order.order_status === "已退款") {
        this.$messageBox.confirm('确定要删除吗?', '提示', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.orderList.splice(this.orderList.findIndex(item => item.id === order.id), 1);
          this.$message({
            type: 'success',
            message: '删除成功',
          });
        }).catch(() => {
          this.$message('已取消');
        });
      }
      if (order.order_status === "已完成") {
        
      }
      if (order.order_status === "退货中") {
        
      }
    },
    // 点击表格单元格的选择框
    handleSelectionChange(value) {
      console.log(value);
    },
    // 根据状态确定按钮的文字
    selectBtnMsg(status) {
      if (status === "已退款") {
        return "删除记录";
      } else if (status === "待发货") {
        return "订单发货"; 
      } else if (status === "已发货" || status === "已完成") {
        return "跟踪订单";
      } else if (status === "退货中") {
        return "完成退货";
      }
    },
    // 监听页码和每页数量事件
    handleSizeChange(value) {
      this.pageInfo.pageSize = value;
      this.getAllOrders();
    },
    handleCurrentChange(value) {
      this.pageInfo.pageNum = value;
      this.getAllOrders();
    }
  }

}
</script>

<style scoped>
  .orderBtn {
    float: right;
  }
  .order-search {
    margin-top: 10px;
  }
  /* 时间选择器输入框过长问题 */
  .el-date-editor.el-input {
    width: inherit;
  }
  .el-table {
    margin-top: 20px;
  }
  .el-steps {
    margin: 10px;
  }
  .el-pagination {
    margin-top: 10px;
  }
</style>