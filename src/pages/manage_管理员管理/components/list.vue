<template>
  <div>
    <el-table :data="manageList" border style="width: 100%">
      <el-table-column prop="id" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="rolename" label="所属角色"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)"
            >编辑</el-button
          >
          <el-button type="danger" @click="del(scope.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页按钮 -->
    <!-- background背景颜色，蓝色框框 -->
    <!--  layout="prev（ 上一页）, pager（页码列表）, next（下一页）"-->
    <!-- :page-size每页显示的数据的数量,有多少页不用自己计算 -->
    <!-- 需要展示的内容 -->
    <!-- :total="1000"总数据，1000条数据，自己数据的数量，这不是一个固定值 -->
    <!-- 分页按钮的事件 @current-change，当前页码改变时会触发这个事件-->
    <!-- 出发了分页按钮事件执行changePage事件 -->
    <!-- @current-change="changePageAction",也可以直接这样写，这样写就相当于直接把分页按钮的新参传递到了changePageAction方法里  -->
    <el-pagination background layout="prev, pager, next" :total="total" hide-on-single-page
    :page-size="size" @current-change='changePage'
    >
    </el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqUserinfo, reqUserDel } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      manageList: "manage/list",
      size:'manage/size',
      total:'manage/total',
      page:'manage/page',
    }),
  },
  methods: {
    ...mapActions({
      //刷新页面
      reqManageListAction: "manage/reqListAction", //命名空间
      //获取list的总数方法
      reqTotalAction:'manage/reqTotalAction',
      //修改页码的方法
      changePageActions:'manage/changePageActions'
    }),

    //角色管理删除功能
    del(uid) {
      this.$confirm("您确定删除此条数据吗?", "⚠警告", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reqUserDel(uid).then((res) => {
            if (res.data.code == 200) {
              //更新页面
              this.reqManageListAction();
              //更新list的总数（用于分页）
              this.reqTotalAction()
              successAlert(res.data.msg);
            } else {
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

    //修改功能(编辑按钮)
    edit(uid) {
      // console.log(id);id时本行数据的id
      this.$emit("change", uid);
    },

    //分页按钮事件被触发从而执行的方法
    changePage(e){//修改了当前页码
                //分页按钮事件默认有个形参传递的就是页码（e）
      this.changePageActions(e)
    }
  },
  mounted() {
    //获取的list
    this.reqManageListAction();
    //获取的数据（list）总数（用于分页）
    this.reqTotalAction();
  },
};
</script>
<style scoped>
</style>
