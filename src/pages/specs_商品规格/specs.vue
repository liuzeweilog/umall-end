<template>
  <div>
    <el-button type="primary" @click="btn">添加</el-button>
    <el-button type="danger">危险按钮</el-button>



    <v-list></v-list>
    <v-add :info='info'></v-add>
  </div>
</template>
<script>
import vAdd from "./components/add";
import vList from "./components/list";
import { mapGetters, mapActions } from "vuex";
export default {
  props: [],
  components: {
    vAdd,
    vList,
  },
  data() {
    return {
     info:{
       isshow:false
     }
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    btn(){
      this.info.isshow=true
    }
  },
  mounted() {},
};
</script>
<style scoped>
</style>
