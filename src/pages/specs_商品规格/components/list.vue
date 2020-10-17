<template>
  <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="规格编号" width="180">
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180">
      </el-table-column>
      <el-table-column prop="name" label="规格属性"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template>
          <el-button type="primary">启用</el-button>
          <el-button type="info">禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作">
        <template slot-scope="scope">
          <el-button type="primary">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 没出来是因为他不知道展示多少条-->

    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="setPage"
      :page-size="size"
    >
    </el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert } from "../../../utils/alert";
import { reqSpecsDel } from "../../../utils/request";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "specs/list",
      size: "specs/size",
      total: "specs/total",
    }),
  },
  methods: {
    ...mapActions({
      setChangeList: "specs/setChangeList",
      setChangePage: "specs/setChangePage",
      setChangeTotal: "specs/setChangeTotal",
    }),
    //获取页码数
    setPage(e) {
      // console.log(e);
      this.setChangePage(e);
    },

    //页面删除按钮

    del(id) {
      // console.log(id);
      this.$confirm("确定删除次条信息吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reqSpecsDel(id).then((res) => {
            successAlert(res.data.msg);
            this.setChangeList();
            this.setChangeTotal();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {
    this.setChangeList();
    this.setChangeTotal();
  },
};
</script>
<style scoped>
</style>
