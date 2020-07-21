<template>
  <div class="order-delivery">
    <el-card>
      <span class="el-icon-s-order"> 发货列表</span>
      <el-divider></el-divider>
      <el-table
      :data="deliveryList"
      border stripe>
        <el-table-column align="center" label="订单编号" prop="order_no"></el-table-column>
        <el-table-column align="center" label="收件人" prop="username"></el-table-column>
        <el-table-column align="center" label="手机号" prop="receiver_phone"></el-table-column>
        <el-table-column align="center" label="邮政编码" prop="receiver_post_code"></el-table-column>
        <el-table-column align="center" label="收件地址" prop="receiver_province, receiver_address">
          <template slot-scope="scope">
            {{scope.row.receiver_province+scope.row.receiver_address}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="配送方式" prop="delivery_company">
          <template slot-scope="scope">
            <el-select v-model="deliveryCompany" clearable placeholder="选择物流公司">
              <el-option v-for="item in deliveryWays" :key="item.wayId"
              :value="item.value"
              :label="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column align="center" label="物流单号">
          <template slot-scope="scope">
            <!-- v-popover:popover 自定义指令v-popoper绑定 el-popoper中的ref属性值 -->
            <el-input v-model="deliveryNo" placeholder="物流单号" v-popover:popover clearable></el-input>
            <!-- 自动填入 -->
            <el-popover
              ref="popover"
              placement="top-start"
              trigger="focus">
              <el-button size="small" type="primary" @click="autoFill">自动填入</el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <div class="btn-option">
        <el-button @click="$router.push('/orderList')">返 回</el-button>
        <el-button 
        type="primary" 
        @click="postOrder()">
          确 定
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        deliveryList: [],
        deliveryWays: [   // 可选择的物流公司
          {wayId: 1, value: '京东快递'},
          {wayId: 2, value: '顺丰快递'},
          {wayId: 3, value: '天天快递'},
          {wayId: 4, value: '邮政快递'},
          {wayId: 5, value: '韵达快递'},
          {wayId: 6, value: '中通快递'},
        ],
        deliveryCompany: '' , // 用于获取select选中的值
        deliveryNo: '',  // 双向绑定物流单号
        // maxDeliveryNo: '', // 获取最大物流单号
      }
    },
    created() {
      // console.log(this.$route.query.order);
      // 获取路由跳转携带的订单对象
      this.deliveryList.push(this.$route.query.order);
      // 初始化可选择的物流公司，放入deliveryList中的deliveryCompany，实现select选中
      // for (let index = 0; index < this.deliveryList.length; index++) {
      //   this.deliveryList[index].deliveryCompany = this.deliveryWays;
      // }
    },
    methods: {
      // 提交发货的订单
      postOrder() {
        // 判断是否完整数据
        if (this.deliveryCompany === '' || this.deliveryNo === '') {
          return this.$message({
            type: 'error',
            message: '未填入物流公司或物流单号'
          });
        }
        // console.log(this.deliveryCompany + this.deliveryNo);
        // 调用loading 组件封装方法
        this.getLoading();
      },
      // 加载 loading 组件封装方法
      getLoading() {
        const loading = this.$loading({
          text: '提交中...',
          spinner: 'el-icon-loading',
          target: document.querySelector('.el-main'), // 改变Loading 的DOM 位置
        });
        setTimeout(() => {
          // 关闭加载中的Loading
          loading.close();
          // 调用成功消息盒子
          this.deliverSuccessBox();   
        }, 1000);
      },
      // 发货成功消息盒子处理方法
      deliverSuccessBox() {
        this.$messageBox.confirm('订单发货完成，需要跳转至该订单详情页面吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success'
        }).then(() => {
          console.log(this.deliveryCompany + this.deliveryNo);
          // this.deliveryList[0].order_status = '已发货';
          this.$router.push({path: '/hadDeliverOrder', query: {order: this.deliveryList}});
          console.log(this,deliveryList);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '该订单状态已改变，请前往查看！！！',
          });
        });
      },
      autoFill() {
        this.$http.get('/getMaxDeliveryNo')
        .then(result => {
          if (result.status !== 200) {
            return;
          }
          // 将获取的字符串最大物流单号转为整型，加 1 再转为字符串，即是最大字符型物流单号
          this.deliveryNo = parseInt(result.data[0].maxNo) + 1 + '';
          // console.log(this.deliveryNo);
          // console.log(result);
        }).catch(error => {
          return error;
        });
      }
    }
  }
</script>

<style scoped>
  .btn-option {
    text-align: center;
    margin-top: 10px;
  }
  .el-popover {
    min-width: auto;
  }
</style>