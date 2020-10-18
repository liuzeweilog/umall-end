<template>
  <div>
    <el-button type="primary" @click="btn">添加</el-button>

    <v-list @change="edit"></v-list>
    <v-add :info='info' ref="child"></v-add>
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
    btn(){
      this.info.isshow=true
      this.info.isBtn=1
    },
    edit(id){
      // console.log(id);
      this.info.isshow=true
      this.info.isBtn=2
      this.$refs.child.look(id)
    }
  },
  mounted() {},
};
</script>
<style scoped>
</style>
