<template>
  <div>
    <h1>列表</h1>
    <div>
      <!--el-table有children是子节点,必须要求一进页面list是一个数组,不然会报错,所以在状态层请求列表时,如果list如果没有数据,就给他手动赋值一个空数组,这样不会报错 -->
      <el-table
        :data="list"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        border
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="pid" label="分类编号" sortable width="180">
        </el-table-column>
        <el-table-column prop="catename" label="分类名称" width="180">
        </el-table-column>
        <el-table-column prop="img" label="图片">
          <!-- v-if='scope.row.pid!=0' ,一级菜单不展示图片 -->
          <template slot-scope="scope">
            <img v-if='scope.row.pid!=0' :src="$imgPre+scope.row.img" alt="">
          </template>

        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
            <el-button type="info" v-else>禁用</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
            <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from '../../../utils/alert';
import { reCateDel } from "../../../utils/request";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      reqListAction:"cate/reqListAction"
    }),

    del(id) {
      this.$confirm("是否删除条此数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reCateDel(id).then((res) => {
            if(res.data.code==200){
              successAlert(res.data.msg)
              this.reqListAction()
            }else{
              warningAlert(res.data.msg)
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    edit(id){
      this.$emit('change',id)
    },

  },
  mounted() {
    this.reqListAction()
  },
};
</script>
<style scoped>
img{
  width: 100%;
  height: 100%;
}
</style>
