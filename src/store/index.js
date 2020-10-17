import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

//根组件
import {actions} from './actions'
import {state,mutations,getters} from './mutations'


//自定义组件
import menu from './modules/menu_菜单管理'
import role from './modules/role_角色管理'
import manage from './modules/manage_管理员管理'
import  cate from './modules/cate_商品分类'
import member from './modules/member_会员管理'
import goods from './modules/goods_商品管理'
import specs from './modules/specs_商品规格管理'

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,


  //组件
  modules:{
    menu,
    role,
    manage,
    cate,
    member,
    goods,
    specs,
  }
})
