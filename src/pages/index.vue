<template>
  <div>
    <el-container>
      <!-- 左边栏 -->
      <el-aside class="left">
        <!-- default-active默认选中index -->
        <!-- router在el-menu里面加一个router属性,el-menu-item里的index会变成路由(相当于router-link里的to) -->
        <el-menu
          default-active="/home"
          class="el-menu-vertical-demo"
          background-color="#20222a"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item index="/home">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-shopping-bag-1"></i>
              <span>商城管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/cate">商品分类</el-menu-item>
              <el-menu-item index="/specs">商品规格</el-menu-item>
              <el-menu-item index="/goods">商品管理</el-menu-item>
              <el-menu-item index="/member">会员管理</el-menu-item>
              <el-menu-item index="/banner">轮播图管理</el-menu-item>
              <el-menu-item index="/seckill">秒杀活动</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/menu">菜单管理</el-menu-item>
              <el-menu-item index="/role">角色管理</el-menu-item>
              <el-menu-item index="/manage">管理员管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 上边栏 -->
        <el-header class="header">
          <p>admin<i class="el-icon-s-custom"></i></p>
        </el-header>
        <!-- 内容区 -->
        <el-main class="main">
          <el-breadcrumb separator-class="el-icon-arrow-right" class="mbx" v-if="$route.name"><!-- 路由中有name才执行下面代码 -->
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item >{{this.$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 显示二级路由 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {};
</script>

<style>

.left {
  height: 100vh;
  background: #20222a;
}
.header {
  line-height: 55px;
  background: #b3c0d1;
}
.header p {
  float: right;
}
.main {
  background: #fff;
}
.mbx{
  margin: 20px 0px;
}
</style>
