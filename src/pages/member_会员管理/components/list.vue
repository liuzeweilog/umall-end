<template>
  <div>
    <h1>会员列表</h1>
    <!-- {{list}} -->
    <!-- 后端传到页面的数据 -->
    <!-- list是因为,list已经通过ajax获取到数据的直接用就行,不用加前缀 -->
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="uid" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" width="180">
      </el-table-column>
      <el-table-column prop="phone" label="手机号"> </el-table-column>
      <el-table-column prop="password" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="(scope.row.status==1)">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqMemberList } from "../../../utils/request";
export default {
  props: [],
  components: {},
  data() {
    return {
      //直接从后端数据库拿数据,这里不用数据
    };
  },
  computed: {
    ...mapGetters({
      list: "member/list",
    }),
  },
  methods: {
    ...mapActions({
      setChangeList: "member/setChangeList",
    }),

    edit(uid) {
      console.log(uid);
      this.$emit("change", uid);
    },
  },
  mounted() {
    this.setChangeList();
  },
};
</script>
<style scoped>
</style>
