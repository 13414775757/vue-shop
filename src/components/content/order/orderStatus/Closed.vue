<template>
  <div id="closed">
    <el-card shadow="always">
      <el-tooltip effect="dark" content="返回" placement="top-start">
        <el-button circle class="el-icon-back" @click="$router.push('/orderList')"></el-button>
      </el-tooltip>&nbsp;&nbsp;
      <span>退款详情</span>
      <el-divider></el-divider>
      <span>退款信息</span>
      <el-table 
      :data="orderItem"
      border stripe>
        <el-table-column align="center" label="商品图片" prop="product_pic">
          <template slot-scope="scope">
            <!-- 注意 :src 绑定图片时，需要使用 require(url) 进行导入 -->
            <el-image :src="scope.row.product_pic" width="60px" height="70px" alt="商品图片"></el-image>
          </template>
        </el-table-column>
        <el-table-column align="center" label="商品名称" prop="product_brand, product_name">
          <template slot-scope="scope">
            <p>品牌：{{scope.row.product_brand}}</p>
            <p>名称：{{scope.row.product_name}}</p>
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
      <p>退款原因：{{orderItem[0].return_reason}}</p>
      <p>退款金额：{{orderItem[0].product_price | priceFormat}}</p>
      <p>申请时间：{{orderItem[0].create_time | dateFormat}}</p>
      <p>订单编号：{{orderItem[0].order_no}}</p>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        orderItem: [],
        total: 0,
      }
    },
    created() {
      // 获取订单信息，由于el-table中data属性绑定的是数组，所以使用数组方式
      this.orderItem.push(this.$route.query.order);
      this.total = this.$route.query.order.product_count * this.$route.query.order.product_price;
      // console.log(this.orderItem);
    },
    methods: {

    }
  }
</script>

<style scoped>
  .el-table {
    margin-top: 20px;
  }
</style>