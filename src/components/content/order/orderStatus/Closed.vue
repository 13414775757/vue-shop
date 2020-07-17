<template>
  <div id="closed">
    <el-card shadow="always">
      <el-tooltip effect="dark" content="返回" placement="top-start">
        <el-button circle class="el-icon-back" @click="$router.push('/orderList')"></el-button>
      </el-tooltip>&nbsp;&nbsp;
      <span>关闭详情</span>
      <el-divider></el-divider>
      <span>退款信息</span>
      <el-table 
      :data="goodsMsg"
      border stripe>
        <el-table-column align="center" label="商品图片" prop="">
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
      <p>退款原因:其它</p>
      <p>退款金额:{{goodsMsg[0].price | priceFormat}}</p>
      <p>申请时间:2020-07-13</p>
      <p>退款编号:0001</p>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        goodsMsg: [
           {goodsImgUrl: require("../../../../assets/images/huaweip30.jpg"), goodsName: 'Abibas运动鞋', price: 399, goodsNo: 'Ab0001', goodsAttr: '黑色/M码', count: 1, total: 399 }
        ]
      }
    },
    created() {
      // console.log(this.goodsMsg);
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