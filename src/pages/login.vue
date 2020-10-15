<template>
  <div class="box">
    <div class="login center">
      <h1 >登录</h1>
      <el-input v-model="username" placeholder="请输入用户名" clearable></el-input>
      <el-input v-model="password" placeholder="请输入密码" clearable show-password></el-input>
      <br>
         <el-button type="primary">登录</el-button>


    </div>

  </div>
</template>

<script>
export default {
  data(){
    return{
      username:'',
      password:'',
    }
  }
};
</script>

<style scoped>
h1{
  margin-top: 20px;
}
.box{
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(50deg, #553443,#303D60);
  position: relative;
}
.login{
  width: 500px;
  height: 300px;
  background: #ffffff;
  border-radius: 15px;
  position:absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
.center{
  text-align: center;
}
.el-input{
  width: 350px;
  margin-top: 20px;
}
.el-button{
  margin-top: 20px;
  width: 350px;
  font-size: 18px;
}
</style>


