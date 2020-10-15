<template>
  <div>
    <h1>角色修改</h1>
    <!-- el-dialog弹框, :visible.sync弹框显示属性-->
    <el-dialog
      :title="info.isB ? '添加角色' : '修改角色'"
      :visible.sync="info.isshow"
      @closed="close"
    >
      <!-- label-width="80px"这个字所占的宽度,不加宽度,字显示不出来 -->
      <el-form label-width="80px" :model="form">
        <!-- 选择框 -->
        <el-form-item label="角色名称">
          <el-input v-model="form.rolename"></el-input>
        </el-form-item>

        <!-- 树形结构 -->
        <el-form-item label="角色权限">
          <!-- 获取框里的权限数字 -->
          <el-tree
            ref="tree"
            :data="list"
            show-checkbox
            node-key="id"
            :props="{ children: 'children', label: 'title' }"
          >
          </el-tree>
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
import { reqRoleAdd, reqRoleinfo, reqRoleUpdate } from "../../../utils/request"; //axios请求
import { successAlert, warningAlert } from "../../../utils/alert"; //成功失败的弹框
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        rolename: "",
        menus: "[]",
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
      //获取的菜单管理方法
      reqListAction: "menu/reqListAction",
      reqRoleListAction: "role/reqListAction",
    }),

    //解决最后bug
    close() {
      //当弹框时编辑框的时候,关闭弹框时候清空里面数据,下次打开的时候还时那行的数据
      if (this.info.isB) {
        this.empty();
      }
      //这个时清空树形结构图里的字符串数组的
      this.$refs.tree.setCheckedKeys([]);
    },
    //取消弹框
    no() {
      this.info.isshow = false;
    },
    //清空弹窗数据
    empty() {
      this.form = {
        rolename: "",
        menus: "[]",
        status: 1,
      };
    },
    //把弹窗里的东西添加到数据库中
    add() {
      //点击完按钮取消弹框,调用no函数
      this.no();
      //并且清空弹窗中的数据
      // this.$refs.tree.getCheckedKeys()获取树形结构的勾选,并转换成字符串,赋值给menus,树形结构和from表单时俩个东西,所以没联系,得写这行代码
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());//getCheckedKeys获取到是数组,手动转为字符串数组,然后赋值到数据里
      reqRoleAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          this.reqRoleListAction();
          //刷新页面
          successAlert(res.data.msg);
          this.empty();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    //查找一条数据
    look(id) {
      reqRoleinfo(id).then((res) => {
        //从后端数据库获取到编辑的本条数据,并赋值给form表单里
        this.form = res.data.list;
        //这时候form里面没有定义id,但是冲list组件里传到父类过本条数据的id,这时把从list那里的id赋值到这里
        this.form.id = id;
      });
    },

    //修改数据
    modify() {
      reqRoleUpdate(this.form).then((res) => {
        if(res.data.code==200){
        this.no();
        this.empty()
        this.reqRoleListAction();
        successAlert(res.data.msg)

        }else{
          warningAlert(res.data.msg)
        }

      });
    },
  },
  mounted() {
    this.reqListAction();
    this.reqRoleListAction();
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
