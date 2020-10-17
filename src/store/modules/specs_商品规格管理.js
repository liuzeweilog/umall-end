import {
  reqSpecsList,
  reqSpecsCount
} from '../../utils/request'

const state = {
  list: [],
  size: 2, //查询条数
  page: 1, //页码数
  total: 0, //总数
}
const mutations = {
  changeList(state, arr) {
    state.list = arr
  },
  chagnePage(state, e) {
    state.page = e
  },
  changeTotal(state, total) {
    state.total = total
    // console.log(state.total);
  }
}
const actions = {
  setChangeList(context) {
    reqSpecsList({
      size: context.state.size,
      page: context.state.page
    }).then(res => {
        let list=res.data.list?res.data.list:[]
      if (list.length == 0 && context.state.page > 1) {
        // context.state.page--,不能直接修改state里的数，必须让mutations修改，所以通知setChagnePage方法，让他把page-1
        context.dispatch('setChangePage',context.state.page-1)
        // context.dispatch('setChangeList')
        return
      }

      context.commit('changeList', list)
    })
  },
  setChangePage(context, e) {
    context.commit('chagnePage', e)
    context.dispatch('setChangeList')
  },
  setChangeTotal(context) {
    reqSpecsCount().then(res => {

      console.log(context.state.page);
      context.commit('changeTotal', res.data.list[0].total)
    })
  }
}
const getters = {
  list(state) {
    return state.list
  },
  total(state) {
    return state.total
  },
  size(state) {
    return state.size
  }
}



export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
