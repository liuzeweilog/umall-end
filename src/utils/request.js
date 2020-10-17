import axios from 'axios'
import url from 'postcss-url';
import qs from 'qs'
import Vue from 'vue'


// 开发时候用
//因为，后端通过他的配置把图片路劲修改成他所适配的格式，然后前端想使用，必须加后端的端口（http://localhost:3000）才能访问到这个图片
Vue.prototype.$imgPre='http://localhost:3000'//挂到vue原型上所有组件都能使用
let baseUrl = '/api';

// 打包时候用
// Vue.prototype.$imgPre=''
// let baseUrl = '';



//响应拦截
axios.interceptors.response.use(res => {
  console.group("=====本次请求的路径是:" + res.config.url)
  console.log(res);
  console.groupEnd()

  return res;
})

/**************菜单管理****************/
//添加
export const reqMenuAdd = (params) => {
  return axios({
    url: baseUrl + '/api/menuadd', //后端数据的路径
    method: 'post', //向后端请求数据的方式
    data: qs.stringify(params)
  })
}

//接收列表数据
export const reqMenuList = () => {
  return axios({
    url: baseUrl + '/api/menulist', //后端数据的路径
    method: 'get', //向后端请求数据的方式
    params: {
      istree: true, //后端规定,返回数据是树形结构就加这行代码
    }
  })
}

//删除列表数据
export const reqMenuDel = (id) => {
  return axios({
    url: baseUrl + '/api/menudelete', //后端数据的路径
    method: 'post', //向后端请求数据的方式
    // data:{
    //   id:id,//要删除列表的id,id就是列表的唯一的值
    // }
    data: qs.stringify({
      id: id
    }),
  })
}

//读取一条列表数据(编辑)
export const reqMenuinfo = (id) => {
  return axios({
    url: baseUrl + '/api/menuinfo', //后端数据的路径
    method: 'get', //向后端请求数据的方式
    params: {
      id: id, //通过id获取对应编号的数据
    }
  })
}

//菜单修改请求
export const reqMenuUpdate = (params) => {
  return axios({
    url: baseUrl + '/api/menuedit', //后端数据的路径
    method: 'post', //向后端请求数据的方式
    data: qs.stringify(
      // id: id,//这些是要修改的数据
      // pid,
      // title,
      // icon,
      // type,
      // url,
      // status,
      params //直接把form当作一个对象传过来了
    ),
  })
}




/**************角色管理****************/
//添加
export const reqRoleAdd = (params) => {
  return axios({
    url: baseUrl + '/api/roleadd', //后端数据的路径
    method: 'post', //向后端请求数据的方式
    data: qs.stringify(params) //接受的是对象,params相当于形参
  })
}

//读取数据库列表数据
export const reqRolelist = () => {
  return axios({
    url: baseUrl + '/api/rolelist', //后端数据的路径
    method: 'get', //向后端请求数据的方式
  })
}

//删除列表数据
export const reqRoleDel = (id) => {
  return axios({
    url: baseUrl + '/api/roledelete', //后端数据的路径
    method: 'post', //向后端请求数据的方式
    // data:{
    //   id:id,//要删除列表的id,id就是列表的唯一的值
    // }
    data: qs.stringify({
      id: id
    }),
  })
}

//读取一条列表数据(编辑)
export const reqRoleinfo = (id) => {
  return axios({
    url: baseUrl + '/api/roleinfo', //后端数据的路径
    method: 'get', //向后端请求数据的方式
    params: {
      id: id, //通过id获取对应编号的数据
    }
  })
}

//菜单修改请求
export const reqRoleUpdate = (params) => {
  return axios({
    url: baseUrl + '/api/roleedit', //后端数据的路径
    method: 'post', //向后端请求数据的方式
    data: qs.stringify(
      // id: id,//这些是要修改的数据
      // pid,
      // title,
      // icon,
      // type,
      // url,
      // status,
      params //直接把form当作一个对象传过来了
    ),
  })
}




/**************管理员管理****************/
//添加
export const reqUserAdd = (params) => {
  return axios({
    url: baseUrl + '/api/useradd', //后端数据的路径
    method: 'post', //向后端请求数据的方式
    data: qs.stringify(params) //接受的是对象,params相当于形参
  })
}

//管理员总数(用于计算分页)
export const reqUserCount = () => {
  return axios({
    url: baseUrl + '/api/usercount',
    method: "get",
  })
}

// 管理员列表（分页）params={page:1,size:10}
export const reqUserList = (params) => {
  return axios({
    url: baseUrl + '/api/userlist', //后端数据的路径
    method: 'get', //向后端请求数据的方式
    params: params,
  })
}



//删除列表数据
export const reqUserDel = (uid) => {
  return axios({
    url: baseUrl + '/api/userdelete', //后端数据的路径
    method: 'post', //向后端请求数据的方式
    // data:{
    //   id:id,//要删除列表的id,id就是列表的唯一的值
    // }
    data: qs.stringify({
      uid: uid
    }),
  })
}

//读取一条列表数据(编辑)
export const reqUserinfo = (uid) => {
  return axios({
    url: baseUrl + '/api/userinfo', //后端数据的路径
    method: 'get', //向后端请求数据的方式
    params: {
      uid: uid, //通过id获取对应编号的数据
    }
  })
}

//菜单修改请求
export const reqUserUpdate = (params) => {
  return axios({
    url: baseUrl + '/api/useredit', //后端数据的路径
    method: 'post', //向后端请求数据的方式
    data: qs.stringify(
      // id: id,//这些是要修改的数据
      // pid,
      // title,
      // icon,
      // type,
      // url,
      // status,
      params //直接把form当作一个对象传过来了
    ),
  })
}



/************** 商品分类管理  ****************/
//添加 //添加 params={pid:1,catename:"123",img:File,state:1}
export const reqCateAdd = (params) => {
  let data = new FormData()//因为要传文件（图片），所以要用new FormData()这种方式，

  /*
    data.append("pid",1)
    data.append("catename","123")
    data.append("img",File)
    data.append("status",1)
    */
   for(let i in params){//遍历params里的数据，不遍历就写要手写就写上边那堆
     data.append(i,params[i])
   }

  return axios({
    url: baseUrl + '/api/cateadd', //后端数据的路径
    method: 'post', //向后端请求数据的方式
    data: data
  })
}

//接收列表数据
//列表 params={istree:true}  {pid:0}
export const reqCateList = (params) => {
  return axios({
    url: baseUrl + '/api/catelist', //后端数据的路径
    method: 'get', //向后端请求数据的方式
    params:params
  })
}

//商品分类删除
export const reCateDel = (id) => {
  return axios({
    url: baseUrl + '/api/catedelete', //后端数据的路径
    method: 'post', //向后端请求数据的方式
    // data:{
    //   id:id,//要删除列表的id,id就是列表的唯一的值
    // }
    data: qs.stringify({
      id: id
    }),
  })
}

//读取一条列表数据(编辑)
export const reqCateinfo = (id) => {
  return axios({
    url: baseUrl + '/api/cateinfo', //后端数据的路径
    method: 'get', //向后端请求数据的方式
    params: {
      id: id, //通过id获取对应编号的数据
    }
  })
}

//菜单修改请求
export const reqCateUpdate = (params) => {
  let data = new FormData()//因为有图片所以才有用formDate,没有图片可以用qs
  for(let i in params){
    data.append(i,params[i])
  }
  return axios({
    url: baseUrl + '/api/cateedit', //后端数据的路径
    method: 'post', //向后端请求数据的方式
    data:data
  })
}




/**************会员管理****************/

//接收列表数据
export const reqMemberList = () => {
  return axios({
    url: baseUrl + '/api/memberlist', //后端数据的路径
    method: 'get', //向后端请求数据的方式

  })
}



//读取一条列表数据(编辑)
export const reqMemberinfo = (uid) => {
  return axios({
    url: baseUrl + '/api/memberinfo', //后端数据的路径
    method: 'get', //向后端请求数据的方式
    params: {
      uid: uid, //通过id获取对应编号的数据
    }
  })
}

//菜单修改请求
export const reqMemberUpdate = (params) => {
  return axios({
    url: baseUrl + '/api/memberedit', //后端数据的路径
    method: 'post', //向后端请求数据的方式
    data: qs.stringify(
      // id: id,//这些是要修改的数据
      // pid,
      // title,
      // icon,
      // type,
      // url,
      // status,
      params //直接把form当作一个对象传过来了
    ),
  })
}



/************** 商品管理 ****************/
//商品添加
export const reqGoodsAdd = (params) => {
  let data = new FormData
  for(let i in params){
    data.append(i,params[i])
  }

  return axios({
    url: baseUrl + '/api/goodsadd', //后端数据的路径
    method: 'post', //向后端请求数据的方式
    data:data
  })
}




//商品总数(用于计算分页)
export const reqGoodsCount = () => {
  return axios({
    url: baseUrl + '/api/goodscount',
    method: "get",
  })
}

// 商品列表（分页）params={page:1,size:10}
export const reqGoodsList = (params) => {
  return axios({
    url: baseUrl + '/api/goodslist', //后端数据的路径
    method: 'get', //向后端请求数据的方式
    params: params,
  })
}

//商品删除
export const reqGoodsDel=(id)=>{
  return axios({
    url:baseUrl+"/api/goodsdelete",
    method:'post',
    params:{
      id:id,
    }
  })
}

//读取一条列表数据(编辑)
export const reqGoodsinfo = (id) => {
  return axios({
    url: baseUrl + '/api/goodsinfo', //后端数据的路径
    method: 'get', //向后端请求数据的方式
    params: {
      id: id, //通过id获取对应编号的数据
    }
  })
}

//商品修改请求
export const reqGoodsUpdate=(params)=>{
  let data = new FormData
  for(let i in params){
    data.append(i,params[i])
  }
  return axios({
    url:baseUrl+'/api/goodsedit',
    method:'post',
    data: data,
  })
}




/**************商品规格管理****************/
//添加
export const reqSpecsAdd = (params) => {
  return axios({
    url: baseUrl + '/api/specsadd', //后端数据的路径
    method: 'post', //向后端请求数据的方式
    data: qs.stringify(params) //接受的是对象,params相当于形参
  })
}

//商品规格总数(用于计算分页)
export const reqSpecsCount = () => {
  return axios({
    url: baseUrl + '/api/specscount',
    method: "get",
  })
}

// 商品规格列表（分页）params={page:1,size:10}
export const reqSpecsList = (params) => {
  return axios({
    url: baseUrl + '/api/specslist', //后端数据的路径
    method: 'get', //向后端请求数据的方式
    params: params,
  })
}



//删除列表数据
export const reqSpecsDel = (id) => {
  return axios({
    url: baseUrl + '/api/specsdelete', //后端数据的路径
    method: 'post', //向后端请求数据的方式
    // data:{
    //   id:id,//要删除列表的id,id就是列表的唯一的值
    // }
    data: qs.stringify({
      id: id
    }),
  })
}

//读取一条列表数据(编辑)
export const reqSpecsinfo = (id) => {
  return axios({
    url: baseUrl + '/api/specsinfo', //后端数据的路径
    method: 'get', //向后端请求数据的方式
    params: {
      id: id, //通过id获取对应编号的数据
    }
  })
}

//菜单修改请求
export const reqSpecsUpdate = (params) => {
  return axios({
    url: baseUrl + '/api/specsedit', //后端数据的路径
    method: 'post', //向后端请求数据的方式
    data: qs.stringify(
      // id: id,//这些是要修改的数据
      // pid,
      // title,
      // icon,
      // type,
      // url,
      // status,
      params //直接把form当作一个对象传过来了
    ),
  })
}

