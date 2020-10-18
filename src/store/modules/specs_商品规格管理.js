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
    //想看修改之后的list,可以再mutations里面查看
    console.log(state.list);
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
        let list=res.data.list?res.data.list:[]//刚才没有写这个判断,如果不判断他获取到的时null,null不能像数组那样有下标能遍历,而遍历null,他就会报错
      if (list.length == 0 && context.state.page > 1) {
        // context.state.page--,不能直接修改state里的数，必须让mutations修改，所以通知setChagnePage方法，让他把page-1
        context.dispatch('setChangePage',context.state.page-1)
        // context.dispatch('setChangeList')
        return
      }
      //页面拿到的数据是字符串的,需要把字符串变成数组然后遍历
      list.forEach(item=>{
        item.attrs=JSON.parse(item.attrs)
      })
      /*
        转换前:
          0: "["小米""
          1: ""华为"]"
        转换后:
          0: "小米"
          1: "华为"

      */
      //赋值之前把list里的字符串转换成数组,接收的时候也就是数组了
      context.commit('changeList', list)
    })
  },
  setChangePage(context, e) {
    context.commit('chagnePage', e)
    context.dispatch('setChangeList')
  },
  setChangeTotal(context) {
    reqSpecsCount().then(res => {

      // console.log(context.state.page);
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
