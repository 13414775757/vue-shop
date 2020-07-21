<template>
  <div id="had-delivery">
    <el-card>
      <el-row>
        <el-col :span="6">
          <el-tooltip effect="dark" content="返回" placement="top" >
            <el-button circle class="el-icon-back" @click="$router.push('/orderList')"></el-button>
          </el-tooltip>
          <span> 订单详情</span>
        </el-col>
      </el-row>
      <el-steps
      :active="3"
      finish-status="success"
      align-center>
        <el-step title="提交订单" :description="orderMsg[0].order_time | dateFormat"></el-step>
        <el-step title="订单支付" :description="orderMsg[0].pay_time | dateFormat"></el-step>
        <el-step title="订单发货" :description="orderMsg[0].delivery_time | dateFormat"></el-step>
        <el-step title="确认收货" description="等待确认"></el-step>
      </el-steps>
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
       <el-table
      class="second-table" 
      :data="orderMsg"
      border stripe>
        <el-table-column align="center" label="配送方式" prop="delivery_company"></el-table-column>
        <el-table-column align="center" label="物流单号" prop="delivery_no"></el-table-column>
        <el-table-column align="center" label="确认收货时间" prop="receive_time">
          <template slot-scope="scope">
            {{scope.row.order_status !== '已完成' ? '未确认' : (scope.row.receive_time | timeFormat)}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="订单积分" prop="order_integration"></el-table-column>
        <el-table-column align="center" label="活动类型" prop="order_type"></el-table-column>
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
      this.orderMsg.push(this.$route.query.order);
      this.total = this.$route.query.order.product_price * this.$route.query.order.product_count;
      // console.log(this.orderMsg);
    },
    methods: {

    }
  }
</script>

<style scoped>
  .el-steps {
    margin-top: 10px;
  }
  .el-table {
    margin-top: 10px;
  }
</style>