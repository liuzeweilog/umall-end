// import Vue from 'vue'
// import Vuex from 'vuex'
// Vue.use(Vuex)
import {reqMenuList} from '../../utils/request'

const state={
  //菜单的list
  list:[]//接收数据库中的菜单的列表信息
}

const mutations={
  //修改list
  changeList(state,arr){
    state.list=arr
  }
}

const actions={
  //打开页面发起请求,得到列表数据,得到数据之后修改
  reqListAction(context){
    //页面触发reqListAction函数,立刻向后端发起列表数据请求
    reqMenuList().then(res=>{
       context.commit('changeList',res.data.list)
    })

  }
}

const getters={
  list(state){
    return state.list
  }
}

export default {
  state,
  mutations,
  actions,
  getters,

  //命名空间
  namespaced:true,
}
