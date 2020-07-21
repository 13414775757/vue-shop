<template>
  <div id="returning"> 
    <el-card>
      <el-row type="flex" justify="space-between">
        <el-col :span="6">
          <el-tooltip effect="dark" content="返回" placement="top">
            <el-button circle class="el-icon-back" @click="$router.push('/orderList')"></el-button>
          </el-tooltip>
          <span> 订单详情</span>
        </el-col>
        <el-col :span="6" class="returnBtn">
          <el-button type="primary" @click="$router.push('/returnOrder')">退货处理</el-button>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <span class="el-icon-collection-tag">基本信息</span>
      <el-table 
      border
      :data="orderMsg">
        <el-table-column align="center" label="订单号" prop="order_no"></el-table-column>
        <el-table-column align="center" label="订单用户" prop="username"></el-table-column>
        <el-table-column align="center" label="联系方式" prop="receiver_phone"></el-table-column>
        <el-table-column align="center" label="支付方式" prop="pay_type"></el-table-column>
      </el-table>
      <el-divider></el-divider>
      <span class="el-icon-collection-tag"> 商品信息</span>
      <el-table 
      border
      :data="orderMsg">
        <el-table-column align="center" label="商品图片" prop="product_pic">
          <el-image  width="60px" height="70px" alt="商品图片"></el-image>
        </el-table-column>
        <el-table-column align="center" label="商品名称" prop="product_brand, product_name">
          <template slot-scope="scope">
            <p>品牌:{{scope.row.product_brand}}</p>
            <p>名称:{{scope.row.product_name}}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" label="价格/货号" prop="product_price, product_no">
          <template slot-scope="scope">
            <p>价格：{{scope.row.product_price | priceFormat}}</p>
            <p>货号：{{scope.row.product_no}}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" label="属性" prop="product_attr">
          <template slot-scope="scope">
            <p v-for="item in JSON.parse(scope.row.product_attr)">{{item.key + '/' + item.type}}</p>
          </template>
        </el-table-column>
      </el-table>
      <el-divider></el-divider>
      <!-- 时间线 -->
      <el-timeline :reverse="true">
        <el-timeline-item 
        :timestamp="orderMsg[0].order_time | timeFormat" placement="top"
        icon="el-icon-check"
        type="success">
          <el-card>
            <h4>订单提交</h4>
            <p>提交时间：{{orderMsg[0].order_time | dateFormat}}</p>
            <p>操作人：{{orderMsg[0].username}}</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item 
        :timestamp="orderMsg[0].pay_time | timeFormat" placement="top"
        icon="el-icon-check"
        type="success">
          <el-card>
            <h4>订单支付</h4>
            <p>支付时间：{{orderMsg[0].pay_time | dateFormat}}</p>
            <p>操作人：{{orderMsg[0].username}}</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item 
        :timestamp="orderMsg[0].create_time | timeFormat" placement="top"
        icon="el-icon-check"
        type="success">
          <el-card>
            <h4>申请退款</h4>
            <p>申请时间：{{orderMsg[0].create_time | dateFormat}}</p>
            <p>退款原因：{{orderMsg[0].return_reason}}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        orderMsg: [],
      }
    },
    created() {
      this.orderMsg.push(this.$route.query.order);
      // console.log(this.orderMsg);
    },
    methods: {

    }
  }
</script>

<style scoped>
  .el-table {
    margin-top: 10px;
  }
  .el-timeline {
    margin-top: 10px;
  }
  .returnBtn {
    text-align: right;
  }
</style>