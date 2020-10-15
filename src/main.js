// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

//1.引入配置好的样式表
import './assets/css/reset.css'

//2.引入公共组件
import './components/index'

//3.路由组件

//4.数据交互

//5.设置过滤器

//6.vuex
import store from './store'

//7.引入element.ui,用来写页面
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
