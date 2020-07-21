<template>
  <div id="wait-delivery">
    <el-card>
      <el-row type="flex" justify="space-between">
        <el-col :span="6">
          <el-tooltip effect="dark" content="返回" placement="top-start">
            <el-button circle class="el-icon-back" @click="$router.push('/orderList')"></el-button>
          </el-tooltip>
        </el-col>
        <el-col :span="6" class="delivery">
          <el-button @click="goToDeliver" type="primary" size="medium">去发货
            <i class="el-icon-right"></i>
          </el-button>
        </el-col>
      </el-row>
      
      <!-- 步骤条 -->
      <el-steps 
      :active="2" 
      finish-status="success"
      align-center>
        <el-step title="提交订单" :description="orderMsg[0].order_time | dateFormat"></el-step>
        <el-step title="支付订单" :description="orderMsg[0].pay_time | dateFormat"></el-step>
        <el-step title="平台发货" description="未发货"></el-step>
        <el-step title="确认收货"></el-step>
      </el-steps>
      <el-alert
        title="订单当前状态：待发货"
        type="info"
        show-icon>
      </el-alert>
      <el-divider></el-divider>
      <span class="el-icon-collection-tag"> 基本信息</span>
      <el-table
      :data="orderMsg"
      border>
        <el-table-column align="center" label="订单号" prop="order_no"></el-table-column>
        <el-table-column align="center" label="用户账号" prop="username"></el-table-column>
        <el-table-column align="center" label="支付方式" prop="pay_type"></el-table-column>
        <el-table-column align="center" label="订单类型" prop="product_category"></el-table-column>
        <el-table-column align="center" label="订单备注" prop="order_note"></el-table-column>
      </el-table>
      <el-divider></el-divider>
      <span class="el-icon-collection-tag"> 收件人信息</span>
      <el-table 
      :data="orderMsg"
      border stripe>
        <el-table-column align="center" label="收件人" prop="receiver_name"></el-table-column>
        <el-table-column align="center" label="手机号码" prop="receiver_phone"></el-table-column>
        <el-table-column align="center" label="邮政编码" prop="receiver_post_code"></el-table-column>
        <el-table-column align="center" label="收件地址" prop="receiver_address"></el-table-column>
      </el-table>
      <el-divider></el-divider>
      <span class="el-icon-collection-tag"> 商品信息</span>
      <el-table 
      :data="orderMsg"
      border stripe>
        <el-table-column align="center" label="商品图片" prop="product_pic">
          <template slot-scope="scope">
            <!-- 注意 :src 绑定图片时，需要使用 require(url) 进行导入 -->
            <el-image :src="scope.row.product_pic" width="60px" height="70px" alt="商品图片"></el-image>
          </template>
        </el-table-column>
        <el-table-column align="center" label="商品名称" prop="product_brand, product_name">
           <template slot-scope="scope">
            <p>品牌:{{scope.row.product_brand}}</p>
            <p>名称:{{scope.row.product_name}}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" label="价格/货号" prop="product_price, product_no">
          <template slot-scope="scope">
            <p>价格:{{scope.row.product_price | priceFormat}}</p>
            <p>货号:{{scope.row.product_no}}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" label="属性" prop="product_attr">
          <template slot-scope="scope">
            <!-- 字符串转为JSON对象 -->
            <p v-for="item in JSON.parse(scope.row.product_attr)">{{item.key+'/'+item.type}}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" label="数量" prop="product_count"></el-table-column>
        <el-table-column align="center" label="小计">
          <template>
            {{total | priceFormat}}
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        orderMsg: [],
        total: 0,
      }
    },
    created() {
      // 获取数据
      this.orderMsg.push(this.$route.query.order);
      // 获取总价钱
      this.total = this.$route.query.order.product_count * this.$route.query.order.product_price;
      // console.log(this.orderMsg);
    },
    methods: {
      // 去发货
      goToDeliver() {
        this.$router.push({path: '/orderDelivery', query: {order: this.orderMsg}});
      }
    }
  }
</script>

<style scoped>
  .el-alert {
    margin-top: 10px;
  }
  .delivery {
    text-align: right;
  }
  .el-table {
    margin-top: 10px;
  }
</style>