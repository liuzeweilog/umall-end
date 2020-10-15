<template>
  <div>
    <h1>菜单add</h1>

    <!-- Dialog 对话框，添加数据的坦框 :visible.sync="info.isshow"点击出现消失 -->
    <!-- @closed是dialog对话框中的一个事件属性Dialog(菜单弹框)彻底关闭时的回调 -->
    <!-- 菜单名称 -->
    <el-dialog
      :title="info.isAdd ? '添加菜单' : '编辑菜单'"
      :visible.sync="info.isshow"
      @closed='close'
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-select
            v-model="form.pid"
            placeholder="请选择上级菜单"
            @change="changePid"
          >
            <!-- label给用户看的,value里是给后端看的 -->
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <!--菜单类型  -->
        <el-form-item label="菜单类型">
          <!-- <el-radio-group v-model="form.resource"> -->
          <el-radio :label="1" v-model="form.type" disabled>目录</el-radio
          ><!-- v-if="form.pid==0" -->
          <el-radio :label="2" v-model="form.type" disabled>菜单</el-radio
          ><!-- v-if="!form.pid==0"  -->
          <!-- </el-radio-group> -->
        </el-form-item>

        <!-- 菜单图标 -->
        <el-form-item label="菜单图标" v-if="form.type == 1">
          <el-select v-model="form.icon" placeholder="请选择图标">
            <!-- label给用户看的,value里是给后端看的 -->
            <el-option
              v-for="item in icons"
              :key="item"
              :label="item"
              :value="item"
            >
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>

        <!-- 菜单地址 -->
        <el-form-item label="菜单地址" v-else>
          <el-select v-model="form.url" placeholder="请选择菜单地址">
            <!-- label给用户看的,value里是给后端看的 -->

            <el-option
              v-for="item in indexRoutes"
              :key="item.path"
              :label="item.name"
              :value="'/' + item.path"
            >
              <!-- <i :class="item"></i> -->
            </el-option>
          </el-select>
        </el-form-item>

        <!-- 状态 -->
        <el-form-item label="状态">
          <!-- 状态，选中的时候是1active-value="1"，没选中的时候是2:inactive-value="2" -->
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd == true"
          >添 加</el-button
        >
        <el-button type="primary" @click="update" v-else>编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { indexRoutes } from "../../../router/index";
import { reqMenuAdd, reqMenuinfo, reqMenuUpdate } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert.js";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      //图标
      icons: [
        "el-icon-setting",
        "el-icon-s-custom",
        "el-icon-shopping-bag-1",
        "el-icon-chat-line-round",
      ],
      //路由
      indexRoutes, //页面使用变量都要在data里面定义一下,这里把路由引进来,方便在当前页面使用

      form: {
        //这里面的数据要和后端的（字段）保持一致
        pid: 0, //上级菜单分类编号，顶级菜单为0
        title: "", //菜单的名字
        icon: "", //菜单图标
        type: 1, //选的是目录(1)还是菜单(2)，菜单类型
        url: "", //菜单地址
        status: 1, //状态（启用/禁用） 1为正常，2是禁用
      },
      radio: "",
    };
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
    //添加数据弹框取消按钮
    cancel() {
      this.info.isshow = false;
      // this.empty();
    },
    close(){//如果是编辑弹窗就清空数据,如果是添加就保留数据(默认就是保留)
      //如果是添加开的弹框,就什么都不做,如果是编辑的弹框,就清楚form(数据)
      if(!this.info.isAdd){//取反就是假的,假的就是编辑
        this.empty();
      }
    },
    //数据重置
    empty() {
      this.form = {
        //这里面的数据要和后端的（字段）保持一致
        pid: 0, //上级菜单分类编号，顶级菜单为0
        title: "", //菜单的名字
        icon: "", //菜单图标
        type: 1, //选的是目录(1)还是菜单(2)，菜单类型
        url: "", //菜单地址
        status: 1, //状态（启用/禁用） 1为正常，2是禁用
      };
    },
    //修改了pid
    changePid() {
      if (this.form.pid == 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
    //点击了弹框的添加按钮
    add() {
      reqMenuAdd(this.form).then((res) => {
        // console.log(this.form);
        if (res.data.code === 200) {
          successAlert(res.data.msg);

          //数据重置
          this.empty();
          //弹框消失
          this.cancel();
          //列表数据要刷新
          //添加完数据列表直接刷新
          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //获取1条菜单详情
    look(id) {
      //向后端发请求获取当前编辑按钮行的数据
      reqMenuinfo(id).then((res) => {
        if (res.data.code == 200) {
          //获取到数据,并把数据赋值到了form数据列表上,因为,请求到的数据名字和前端一样,所以可以直接用,不需要给名字
          //这个时候form是没有id的,因为form里面就没写id,所以没有
          this.form = res.data.list;
          this.form.id = id; //把从编辑获取到的id传到from里面,这时form就有了id

        } else {
          //用户长时间不动鼠标,有可能这个页面掉线
          warningAlert(res.data.msg);
        }
      });
    },
    //修改菜单
    update() {
      reqMenuUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          //数据重置
          this.empty();
          //弹框消失
          this.cancel();
          //列表数据要刷新
          //添加完数据列表直接刷新
          this.reqListAction();
          successAlert(res.data.msg);
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
