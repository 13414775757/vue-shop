<template>
  <div class="goods-list"> 
     <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item class="active">商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 商品区 -->
    <div class="goodsArea">
      <el-row :gutter="20" class="search">
      <el-col :span="24">
        <el-input placeholder="请输入内容" class="input-with-select" clearable>
          <el-button type="warning" @click="getGoodsList()" slot="append" icon="el-icon-search"></el-button>
        </el-input>    
      </el-col>
      </el-row>
      <el-row :gutter="20" class="list">
        <el-col :span="6" v-for="n in 22" :key="n">
          <el-card class="goodsItem" shadow="always">

          </el-card>
        </el-col>
      </el-row>
      <div class="last">没有更多了</div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  .search {
    /* 距离上边距15px */
    margin-top: 15px;
  }
  .goodsItem {
    height: 200px;
    margin-top: 20px;
  }
  .list {
    overflow: auto;
  }
  .last {
    text-align: center;
    font-size: 14px;
    margin-top: 10px;
  }
</style>