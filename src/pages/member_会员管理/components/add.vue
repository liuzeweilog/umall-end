<template>
  <div>
    <!-- <h1>添加</h1> -->
    <el-dialog title="会员编辑" :visible.sync="info.isshow">
      <!-- 因为这个是用户自己输入内容让后添加到数据库的,所以要用tableData里的内容 -->
      <el-form :model="tableData" label-width="80px">
        <!-- 手机号 -->
        <el-form-item label="手机号">
          <el-input v-model="tableData.phone"></el-input>
        </el-form-item>
        <!-- 昵称 -->
        <el-form-item label="昵称">
          <el-input v-model="tableData.nickname"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码">
          <el-input v-model="tableData.password"></el-input>
        </el-form-item>
        <!-- 状态 -->
        <el-form-item label="状态">
          <el-switch
            v-model="tableData.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>

      <!-- 确定取消按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="out">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import { reqMemberinfo, reqMemberUpdate } from "../../../utils/request";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      //用户自己把数据写上传递给数据库
      tableData: {
        uid: "", //会员编号
        nickname: "", //昵称
        phone: "", //手机号
        password: "", //密码
        status: 1, //状态
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      setChangeList: "member/setChangeList",
    }),
    //取消按钮
    out() {
      this.info.isshow = false;
    },
    //点编辑(list里的编辑按钮)获取按钮哪一行数据数据
    look(uid) {
      //console.log(uid);
      //获取一条数据
      reqMemberinfo(uid).then((res) => {
        this.tableData=res.data.list
        this.tableData.uid = uid;
      });
    },

    //修改,父改子通过ref
    edit() {
      //把用户输入框写的内容通过ajax传到数据库
      reqMemberUpdate(this.tableData).then((res) => {
        if (res.data.code == 200) {
          this.out();
          this.setChangeList();
          successAlert(res.data.msg)
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>
