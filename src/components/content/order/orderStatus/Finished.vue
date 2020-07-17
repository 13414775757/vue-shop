<template>
  <div class="finished">
    <!-- 订单已完成页面 -->
    <el-card>
     <el-tooltip effect="dark" content="返回" placement="top-start">
        <el-button circle class="el-icon-back" @click="$router.push('/orderList')"></el-button>
      </el-tooltip>
      <!-- 步骤条 -->
      <el-steps 
      :active="4" 
      finish-status="success"
      align-center>
        <el-step title="提交订单"></el-step>
        <el-step title="支付订单"></el-step>
        <el-step title="平台发货"></el-step>
        <el-step title="确认收货"></el-step>
      </el-steps>
      <el-alert
        title="订单当前状态：已完成"
        type="success"
        show-icon>
      </el-alert>
      <el-divider></el-divider>
      <span class="el-icon-collection-tag"> 基本信息</span>
      <el-table 
      :data="orderMsg"
      border stripe>
        <el-table-column align="center" label="订单号" prop="orderNo"></el-table-column>
        <el-table-column align="center" label="发货单流水号" prop="serialNo"></el-table-column>
        <el-table-column align="center" label="用户账号" prop="user"></el-table-column>
        <el-table-column align="center" label="支付方式" prop="payway"></el-table-column>
        <el-table-column align="center" label="订单类型" prop="orderClass"></el-table-column>
      </el-table>
      <el-table
      class="second-table" 
      :data="orderMsg"
      border stripe>
        <el-table-column align="center" label="配送方式" prop="deliveryWay"></el-table-column>
        <el-table-column align="center" label="物流单号" prop="deliveryNo"></el-table-column>
        <el-table-column align="center" label="自动确认收货时间" prop="receivingTime"></el-table-column>
        <el-table-column align="center" label="订单积分" prop="orderIntegral"></el-table-column>
        <el-table-column align="center" label="活动信息" prop="activityMsg"></el-table-column>
      </el-table>
      <el-divider></el-divider>
      <span class="el-icon-collection-tag"> 收件人信息</span>
      <el-table 
      :data="receiverMsg"
      border stripe>
        <el-table-column align="center" label="收件人" prop="receiver"></el-table-column>
        <el-table-column align="center" label="手机号码" prop="phoneNo"></el-table-column>
        <el-table-column align="center" label="邮政编码" prop="postalCode"></el-table-column>
        <el-table-column align="center" label="收件地址" prop="receiAddress"></el-table-column>
      </el-table>
      <el-divider></el-divider>
      <span class="el-icon-collection-tag"> 商品信息</span>
      <el-table 
      :data="goodsMsg"
      border stripe>
        <el-table-column align="center" label="商品图片" prop="goodsImgUrl">
          <template slot-scope="scope">
            <!-- 注意 :src 绑定图片时，需要使用 require(url) 进行导入 -->
            <el-image :src="scope.row.goodsImgUrl" width="60px" height="70px" alt="商品图片"></el-image>
          </template>
        </el-table-column>
        <el-table-column align="center" label="商品名称" prop="goodsName"></el-table-column>
        <el-table-column align="center" label="价格/货号" prop="price, goodsNo">
          <template slot-scope="scope">
            <p>价格:{{scope.row.price | priceFormat}}</p>
            <p>货号:{{scope.row.goodsNo}}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" label="属性" prop="goodsAttr"></el-table-column>
        <el-table-column align="center" label="数量" prop="count"></el-table-column>
        <el-table-column align="center" label="小计" prop="total">
          <template slot-scope="scope">
            {{scope.row.total | priceFormat}}
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
        orderMsg: [
          {orderNo: '202007130001', serialNo: '0001', user: 'Jackson', payway: '微信', orderClass: '手机数码',deliveryWay: '顺风快递', deliveryNo: '100001', receivingTime: '2020-07-15', orderIntegral: 20, activityMsg: '正常'}
        ],
        receiverMsg: [
          {receiver: 'Jackson', phoneNo: '13579246855', postalCode: '516000', receiAddress: '惠州学院'}
        ],
        goodsMsg: [
          {goodsImgUrl: require("../../../../assets/images/huaweip30.jpg"), goodsName: '华为P30', price: 3999, goodsNo: 'HW0001', goodsAttr: '魅影/256G', count: 1, total: 3999 }
        ],
        orderMessage: this.$route.query.order
      }
    },
    created() {
      // console.log(this.orderMessage);
    },
    methods: { 

    }
  }
</script>

<style scoped>
  .el-alert {
    margin-top: 10px;
  }
  .el-table{
    margin-top: 20px;
  }
  .second-table {
    margin-top: 0px;
  }
</style>