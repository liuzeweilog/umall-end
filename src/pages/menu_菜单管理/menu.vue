<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="willAdd">添加</el-button>

    <v-add :info="info" ref="add"></v-add>
    <v-list @change="fn"></v-list>
  </div>
</template>
<script>
import vList from "./components/list";
import vAdd from "./components/add";
import { mapGetters, mapActions } from "vuex";
export default {
  props: [],
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      //添加弹框的状态
      info: {
        isshow: false,
        //编辑还是添加点的弹框 true添加 false编辑
        isAdd: true,
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    //点击了添加按钮
    willAdd() {
      this.info.isshow = true;
      this.info.isAdd = true;
    },
    fn(id) {
      this.info.isshow = true;
      this.info.isAdd = false;
      //让add组件发起获取详情的请求
      //父组件调用子组件的方法
      this.$refs.add.look(id)
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>
