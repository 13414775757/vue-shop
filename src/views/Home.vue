<template>
  <el-container class="home">
    <el-header>
      <div>
        <span>系统首页</span>
      </div>
      <el-dropdown>
        <span class="el-dropdown-link el-icon-user-solid">
          我的
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>设置</el-dropdown-item>
          <el-dropdown-item @click.native="logout()">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container>
      <!-- 侧边导航 -->
      <el-aside :width="!isCollapse ? '64px' : '200px'">
        <div class="toggle" @click="toggleCollapse">
          <span :class="isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'"></span>
        </div>
        <!-- 侧边菜单 -->
        <!-- collapse 是否折叠 -->
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#24252E"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="!isCollapse"
          :collapse-transition="false"
          :default-active="activeItem"
          :router="true"    
          :unique-opened="true">  <!--是否只打开一个，默认是false，绑定需要使用: 。或者直接写-->
          <!-- 一级菜单 -->
          <!-- :index 绑定的是字符串，所以拼接一个空字符将其转为字符串 -->
          <el-submenu :index="item.menuId+''" v-for="item in menuList" :key="item.menuId">
            <template slot="title">
              <!-- 根据键取值 -->
              <i :class="iconList[item.menuId]"></i>
              <span>{{item.menuName}}</span>
            </template>
            <!-- 二级菜单 -->
            <!-- 通过 el-menu 绑定 router 属性，根据 index 绑定的值激活导航栏进行路由跳转 -->
            <el-menu-item v-for="subItem in item.children" :index="'/' + subItem.submenuPath" :key="subItem.submenuId" @click="changeActiveItem(subItem.submenuPath)">
              <template>
                <i class="el-icon-menu"></i>
                <span>{{subItem.submenuName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 路由展位 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menuList: [],
      iconList: {
        '1': 'el-icon-s-custom',
        '2': 'el-icon-s-goods',
        '3': 'el-icon-s-order',
        '4': 'el-icon-s-marketing'
      },
      isCollapse: true,
      activeItem: ''
    };
  },
  created() {
    this.getMenuList();
  },
  methods: {
    logout() {
      this.$messageBox.confirm('确定要退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!'
        });
        window.sessionStorage.clear();
        this.$router.push("/login");
      }).catch(() => {
        return
      });
    },
    // 获取菜单列表
    getMenuList() {
      this.$http.get('/getMenuList')
      .then(result => {
        // console.log(result);
        this.menuList = result.data;
      }).catch(error => {
        console.log(error);
        
      });
    },
    // 菜单的展开与折叠
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    changeActiveItem(path) {
      this.$store.commit('chengePath', '/' + path);
      // console.log(this.$store.state.activePath);
      this.activeItem = this.$store.state.activePath;
      // console.log(this.activeItem);
      
    }
  }
};
</script>

<style scoped>
.home {
  height: 100%;
}
.el-header {
  background-color: #24252E;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-dropdown {
  color: #ffffff;
}
.toggle {
  text-align: center;
  width: 100%;
  color: #ffffff;
}
.el-aside {
  background-color: #24252E;
  color: white;
}
.el-aside .el-menu {
  border-right: none;   /* 解决子菜单突出1px问题 */
}
.el-main {
  background-color:lightgray;
}
</style>