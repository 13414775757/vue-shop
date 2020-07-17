<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
  #app {
    

  }
  /* 解决表头错位问题 */
  body .el-table th.gutter{
      display: table-cell!important;
  }
  body .el-table colgroup.gutter{
      display: table-cell!important;
  }
  /* 解决 vue-table-with-grid 表格体滚动条问题 */
  body .zk-table .zk-table__body-wrapper {
    overflow: hidden !important;
  }
</style>
