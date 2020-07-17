<template>
  <div id="wait-delivery">
    <el-card>
      <el-tooltip effect="dark" content="返回" placement="top-start">
        <el-button circle class="el-icon-back" @click="$router.push('/orderList')"></el-button>
      </el-tooltip>
      <!-- 步骤条 -->
      <el-steps 
      :active="2" 
      finish-status="success"
      align-center>
        <el-step title="提交订单"></el-step>
        <el-step title="支付订单"></el-step>
        <el-step title="平台发货"></el-step>
        <el-step title="确认收货"></el-step>
      </el-steps>
      <el-alert
        title="订单当前状态：待发货"
        type="info"
        show-icon>
      </el-alert>
      <el-divider></el-divider>
      <span class="el-icon-collection-tag"> 基本信息</span>
      <el-table>
        
      </el-table>
      <el-divider></el-divider>
      <span class="el-icon-collection-tag"> 收件人信息</span>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        orderMsg: this.$route.query.order,
      }
    },
    created() {
      console.log(this.orderMsg);
    }
  }
</script>

<style scoped>
  .el-alert {
    margin-top: 10px;
  }
</style>