import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export let indexRoutes = [
  {
    path:'menu',//菜单管理
    name:'菜单管理',
    component:()=>import('../pages/menu_菜单管理/menu.vue')
  },
  {
    path:'role',//角色管理
    name:'角色管理',
    component:()=>import('../pages/role_角色管理/role.vue')
  },
  {
    path:'manage',//管理员管理
    name:'管理员管理',
    component:()=>import('../pages/manage_管理员管理/manage.vue')
  },
  {
    path:'cate',//商品分类
    name:'商品分类',
    component:()=>import('../pages/cate_商品分类/cate.vue')
  },
  {
    path:'specs',//商品规格
    name:'商品规格',
    component:()=>import('../pages/specs_商品规格/specs.vue')
  },
  {
    path:'goods',//商品管理
    name:'商品管理',
    component:()=>import('../pages/goods_商品管理/goods.vue')
  },
  {
    path:'member',//会员管理
    name:'会员管理',
    component:()=>import('../pages/member_会员管理/member.vue')
  },
  {
    path:'banner',//轮播图管理
    name:'轮播图管理',
    component:()=>import('../pages/banner_轮播图管理/banner.vue')
  },
  {
    path:'seckill',//秒杀活动
    name:'秒杀活动',
    component:()=>import('../pages/seckill_秒杀活动/seckill.vue')
  }
]

export default new Router({
  routes: [
    {
      path: "/login",//登录页路由
      component: () => import('../pages/login.vue')
    },
    {
      path: "/",//首页路由
      component: () => import('../pages/index.vue'),
      children:[//配置二级路由在首页显示
        {
          path:'',
          component:()=>import('../pages/home/home.vue')
        },
        {
          path:'home',
          component:()=>import('../pages/home/home.vue')
        },
        ...indexRoutes
      ]
    },


  ]
})
