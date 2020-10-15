<template>
  <div>
    <!-- tabledata,是变量,里面是需要用到的数据 -->
    <!-- style是样式 -->
    <!-- row-key每一行的唯一标识(每条数据的唯一标识,用于key) -->
    <!--  border 是否带有纵向边框-->
    <!-- default-expand-all是否默认展开所有行，树形表格时有效 -->
    <!-- :tree-props树形控件配置
        -children: '子节点名字',名字可以自己起,名字是什么子节点里面定义树形子节点的名字就是什么,childern子节点,数据(data==>tableData[{},{children:[{}]}]==>>)里面,谁有的children谁就有树形子节点
        -  hasChildren: 'hasChildren',没什么用可以删掉
    -->
    <el-table
      :data="list"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :tree-props="{ children: 'children' }"
    >
      <!-- :load="load" -->
      <!-- prop页面请求完的数据,后端数据名称 -->
      <el-table-column prop="id" label="菜单编号" width="180" sortable>
        <!-- <template slot-scope="scope">{{ scope.$index + 1 }}</template> -->
      </el-table-column>
      <el-table-column prop="title" label="菜单名称" width="180">
      </el-table-column>
      <el-table-column prop="icon" label="菜单图标" width="180">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i
          ><!-- 显示菜单图标,不用temloate标签这样方法写,直接弄显示的就是图表样式的代码 -->
        </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单地址" width="180">
        <!-- <template slot-scope="scope">
          <i :class="scope.row.url"></i>
        </template> -->
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button prop="status" type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button prop="status" type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="fn(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqMenuDel } from "../../../utils/request"; //删除列表
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  methods: {
    ...mapActions({
      reqListAction: "menu/reqListAction",
    }),

    del(id) {
      this.$confirm("你确定要删除吗?", "警告", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //用户点了弹框的确定按钮之后
          reqMenuDel(id).then((res) => {
            //删除当前行的数据
            if (res.data.code == 200) {
              //调用列表里的数据,把删除后的最新页面,让用户看到
              this.reqListAction();
              // 然后出现弹框提示用户删除成功
              successAlert(res.data.msg);
            } else {
              //否则提示用户删除失败
              warningAlert(res.data.msg);
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
    //编辑
    fn(id) {
      this.$emit("change", id);
    },
  },
  mounted() {
    this.reqListAction();
  },
};
</script>
<style scoped>
</style>
