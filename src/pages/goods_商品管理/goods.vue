<template>
  <div>
    <!-- <h1>登录</h1> -->
    <el-button type="primary" @click="btn">添加</el-button>
    <v-list></v-list>
    <v-add :info='info'></v-add>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vList from './components/list'
import vAdd from './components/add'
export default {
  props: [],
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      info:{
        isshow:false,
      }
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({

    }),

    btn(){
      this.info.isshow=true
    }
  },
  mounted() {},
};
</script>
<style scoped>
</style>
