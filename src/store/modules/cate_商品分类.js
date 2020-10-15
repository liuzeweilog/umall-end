// import Vue from 'vue'
// import Vuex from 'vuex'
// Vue.use(Vuex)
import {reqCateList} from '../../utils/request'

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
    reqCateList({istree:true}).then(res=>{
      // if(res.data.list==200){
      // }
      //为什么哟啊写下面那段代码的原因: el-table有children是子节点,必须要求一进页面list是一个数组,不然会报错,所以在状态层请求列表时,如果list如果没有数据,就给他手动赋值一个空数组,这样不会报错
      //从后端获取到data里的lsit数据,如果有数据就显示里面的数据,如果没有就显示一个空数组
      let list=res.data.list?res.data.list:[]
       context.commit('changeList',list)
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
