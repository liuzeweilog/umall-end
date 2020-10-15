// import Vue from 'vue'
// import Vuex from 'vuex'
// Vue.use(Vuex)
import {reqUserList, reqUserCount} from '../../utils/request'

const state={
  //菜单的list
  list:[],//接收数据库中的菜单的列表信息
  size:2,//每页显示的数量,(一页的数量)
  // 总数（一共有多少条数据）
  total:0,
  //分页的第几页（页码）
  page:3,//没有第0页，就像是书，都是从第一页开始的
}

const mutations={
  //修改list
  changeList(state,arr){
    state.list=arr
  },
  // changeSize(state,num){
  //   state.size=num
  // },
  //修改分页总数
  changeTotal(state,num){
    state.total=num
  },
  // 修改页码
  changePage(state,page){
    state.page=page//把收到页面的页码赋值到数据里然后修改页面
  },
}

const actions={
  //打开页面发起请求,得到列表数据,得到数据之后修改
  reqListAction(context){//不能用这里的方法给最大值（total），里面请求page和size会限制显示的数量，设置多少就只能获取多少
    //页面触发reqListAction函数,立刻向后端发起列表数据请求
    reqUserList({page:context.state.page,size:context.state.size}).then(res=>{

      // if(res.data.list==null&&res.page>0){
      //   this.page-1
      // }
      let list =res.data.list?res.data.list:[]
      //实现原理： 如果取列表数据的时候取到了null，那么有可能是最后一页没数据了，需要减一页 ，再次请求list
      //页数大于1，并且res请求到达数据(list),里面没内容
      if(context.state.page>1&&list.length==0){
        //调用有changePage方法，并且把page(页码)-1,这样页面就去前一页了，不会出现没数据的bug了
        context.commit('changePage',context.state.page-1)
        //然后，把页面的数据再次刷新，用户看到的就是前一页
        context.dispatch('reqListAction')
        return;
      }

       context.commit('changeList',list)

    })

  },

  //获取总数的请求
  reqTotalAction(context){
    reqUserCount().then(res=>{
      context.commit('changeTotal',res.data.list[0].total)
    })
  },

  //组件(页面)修改了页码（相当于有人点了上一页下一页或者第几页的按钮，就触发修改）
  changePageActions(context,page){//page相当于别人点了第几页，把第几页就传给page,通过changePage方法修改页码
    context.commit('changePage',page)
    //根据新的页码发起list请求，更新页面到第几页
    context.dispatch('reqListAction')//reqListAction里内部是更新list数据的ajax请求，所以一触发他，页码就更新内容，然后更新的数据就出来了
  }
}

const getters={
  list(state){
    return state.list
  },
  size(state){
    return state.size//每页的数据
  },
  total(state){
    return state.total//一共有多少条数据
  },
  page(state){
    return state.page//页码
  },
}

export default {
  state,
  mutations,
  actions,
  getters,

  //命名空间
  namespaced:true,
}
