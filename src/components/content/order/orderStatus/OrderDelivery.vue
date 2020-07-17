<template>
  <div class="order-delivery">
    <el-card>
      <span class="el-icon-s-order"> 发货列表</span>
      <el-divider></el-divider>
      <el-table
      :data="deliveryList"
      border stripe>
        <el-table-column align="center" label="订单编号" prop="orderNo"></el-table-column>
        <el-table-column align="center" label="收件人" prop="receiver"></el-table-column>
        <el-table-column align="center" label="手机号" prop="phoneNo"></el-table-column>
        <el-table-column align="center" label="邮政编码" prop="postalCode"></el-table-column>
        <el-table-column align="center" label="收件地址" prop="deliveryAttr"></el-table-column>
        <el-table-column align="center" label="配送方式" prop="deliveryWays">
          <template slot-scope="scope">
            <el-select v-model="value" placeholder="选择物流公司" @change="getItem(value)">
              <el-option v-for="item in scope.row.deliveryWays" :key="item.wayId"
              :value="item.value"
              :label="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column align="center" label="物流单号" prop="deliveryNo">
          <template slot-scope="scope">
            <el-input v-model="scope.row.deliveryNo" placeholder="物流单号"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <div class="btn-option">
        <el-button @click="$router.push('/orderList')">返 回</el-button>
        <el-button type="primary" @click="postOrder()">确 定</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        deliveryList: [
          {orderNo: '202007140003', receiver: 'Sarah', phoneNo: '1354230932', postalCode: '516000', deliveryAttr: '惠州学院', deliveryWays: '', deliveryNo: ''}
        ],
        deliveryWays: [
          {wayId: 1, value: '京东快递'},
          {wayId: 2, value: '顺丰快递'},
          {wayId: 3, value: '天天快递'},
          {wayId: 4, value: '邮政快递'},
          {wayId: 5, value: '韵达快递'},
          {wayId: 6, value: '中通快递'},
        ],
        value: ''
      }
    },
    created() {
      for (let index = 0; index < this.deliveryList.length; index++) {
        this.deliveryList[index].deliveryWays = this.deliveryWays;
      }
      // console.log(this.deliveryList);
    },
    methods: {
      postOrder() {
        
      },
      getItem(value) {
        console.log(value);
      }
    }
  }
</script>

<style scoped>
  .btn-option {
    text-align: center;
    margin-top: 10px;
  }
</style>