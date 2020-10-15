<template>
  <div>
    <h1>角色管理</h1>
    <el-button type="primary" @click="add">添加</el-button>


    <v-list @change="edit"></v-list>
    <v-add :info='info' ref="child"></v-add>

  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vAdd from './components/add'
import vList from './components/list'
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
        isB:0,
      }

    };
  },
  computed: {
    ...mapGetters({

    }),
  },
  methods: {
    ...mapActions({}),
    add(){
      this.info.isshow = true
      this.info.isB=1
    },
    edit(id){
      this.info.isshow = true
      this.info.isB=0
      this.$refs.child.look(id)
    }

  },
  mounted() {},
};
</script>
<style scoped>
</style>
