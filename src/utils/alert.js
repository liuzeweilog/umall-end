//二次封装弹窗

import Vue from "vue"
let vm = new Vue()


//相当于把匿名函数赋值给了successAlert这个变量
export const successAlert =(msg)=> {
    vm.$message({
      message:msg,
      type: 'success'
    });
  }

  //相当于把匿名函数赋值给了warningAlert这个变量
  export const warningAlert =(msg)=>{
    vm.$message({
      message: msg,
      type: 'warning'
    })
  }
