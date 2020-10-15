<template>
  <div>
    <h1>商品分类</h1>
    <el-button type="primary" @click="fn">添加</el-button>

    <v-list @change='edit'></v-list>
    <v-add :info='info' ref="look"></v-add>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vList from "./components/list";
import vAdd from "./components/add";
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
        isBtn:1,
      }
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    fn(){
      this.info.isshow=true;
      this.info.isBtn=1;
    },
    edit(id){
      this.info.isshow=true;
      this.info.isBtn=2;
      this.$refs.look.look(id)
    }
  },
  mounted() {},
};
</script>
<style scoped>
</style>
