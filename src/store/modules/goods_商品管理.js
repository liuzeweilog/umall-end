import {reqGoodsList} from '../../utils/request'
export const state={
  list:[]
}
export const mutations ={
  changeList(state,arr){
    state.list=arr
  }
}
export const actions ={
  setChangeList(context){
    reqGoodsList({size:3,page:1}).then(res=>{
      context.commit('changeList',res.data.list)
    })
  }
}
export const getters={
  list(state){
    return state.list
  }
}

export default{
  state,
  mutations,
  actions,
  getters,

  namespaced:true
}
