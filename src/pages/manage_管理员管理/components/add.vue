<template>
  <div>
    <h1>角色修改</h1>
    <!-- el-dialog弹框, :visible.sync弹框显示属性-->
    <el-dialog
      :title="info.isB ? '添加用户' : '修改用户'"
      :visible.sync="info.isshow"
      @closed="close"
    >
      <!-- label-width="80px"这个字所占的宽度,不加宽度,字显示不出来 -->
      <el-form label-width="80px" :model="form">
        <!-- 所属角色 -->
        <el-form-item label="所属角色">
          <el-select v-model="form.roleid" placeholder="请选择上级菜单">
            <!-- label给用户看的,value里是给后端看的 -->
            <el-option label="请选择" disabled :value="0"></el-option>
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 选择框 -->
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>

        <!-- 选择框 -->
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>

        <!-- 状态 -->
        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" inactive-value="2">
          </el-switch>
        </el-form-item>
      </el-form>

      <!-- 确定和取消 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="no">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isB">添 加</el-button>
        <el-button type="primary" @click="modify" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqUserAdd, reqUserinfo, reqUserUpdate } from "../../../utils/request"; //axios请求
import { successAlert, warningAlert } from "../../../utils/alert"; //成功失败的弹框
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      //获取的菜单管理数据
      list: "menu/list",
      roleList: "role/list",
    }),
  },
  methods: {
    ...mapActions({
      reqRoleListAction: "role/reqListAction",
      //获取的菜单管理方法
      reqManageListAction: "manage/reqListAction",
      //获取list总数，用于分页，因为添加数据需要获取最新的list数量
      reqTotalAction:'manage/reqTotalAction'
    }),

    //解决最后bug
    close() {
      //当弹框时编辑框的时候,关闭弹框时候清空里面数据,下次打开的时候还时那行的数据
      if (this.info.isB) {
        this.empty();
      }
    },
    //取消弹框
    no() {
      this.info.isshow = false;
    },
    //清空弹窗数据
    empty() {
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },
    //把弹窗里的东西添加到数据库中
    add() {
      //并且清空弹窗中的数据
      reqUserAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          //成功
          successAlert(res.data.msg);
          // list数据刷新   //刷新页面
          this.reqManageListAction();
          //点击完按钮取消弹框,调用no函数
          this.no();
          //清空弹框数据
          this.empty();
           //更新list的总数（用于分页）
            this.reqTotalAction()
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    //查找一条数据
    look(uid) {
      reqUserinfo(uid).then((res) => {
        if (res.data.code == 200) {
          //从后端数据库获取到编辑的本条数据,并赋值给form表单里
          this.form = res.data.list;
          this.form.password = ""; //用户的密码不显示
        }
      });
    },

    //修改数据
    modify() {
      reqUserUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // this.form = res.data.list;
          this.empty();
          this.no();
          this.reqManageListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    // this.reqListAction();
    //如果没有请求过角色管理的数据,就请求一次,如果请求过了,就不用请求了
    if (this.roleList.length == 0) {
      this.reqRoleListAction();
    }
  },
};
</script>
<style scoped>
.inp {
  width: 600px;
}
.el-dialog__body {
  padding: 10px;
}
</style>
