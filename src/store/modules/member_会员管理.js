import {
  reqMemberList
} from '../../utils/request'

export const state = {
  list: [],
}

export const mutations = {
  changeList(state, arr) {
    state.list = arr
  }
}

export const actions = {

  setChangeList(context) {
    reqMemberList().then(res => {
      if (res.data.list ? res.data.list : []) {
        context.commit('changeList', res.data.list)
      }

    })
  }

}

export const getters = {
  list(state) {
    return state.list
  }
}

export default {
  state,
  mutations,
  actions,
  getters,

  //命名空间
  namespaced: true,
}
