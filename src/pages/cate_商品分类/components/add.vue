<template>
  <div>
    <h1>登录</h1>

    <!-- Dialog 对话框,添加数据的弹框 -->
    <el-dialog
      :title="info.isBtn == 1 ? '添加分类' : '编辑分类'"
      :visible.sync="info.isshow"
      @closed="emp"
    >
      <!-- form表单 -->
      <!-- :model="form",填写数据的, 自动遍历,让下边表格使用 -->
      <!-- label-width="80px"显示字体宽度的,如果没有那么写上级分类,分类名称什么的会显示不出来 -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="上级分类">
          <el-select v-model="form.pid" placeholder="请选择上级分类">
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option
              :label="item.catename"
              :value="item.id"
              v-for="item in list"
              :key="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <!-- 分类名称 -->
        <el-form-item label="分类名称">
          <el-input v-model="form.catename"></el-input>
        </el-form-item>

        <!-- 原生上传图片 start-->
        <!-- input type="file"，file文件类型（用于上传文件） -->
        <el-form-item label="图片" v-if="form.pid != 0">
          <div class="my-upload">
            <h3>+</h3>
            <img :src="imgUrl" v-if="imgUrl" alt="" />
            <!-- change上个事件改变触发，2次上传同一张图，会出现，第二张图上传不上，原因就是e事件的target.files清空，这不是便量清空不了 -->
            <!-- 解决方法，v-if会引起生命周期的加载和销毁，给添加文件这个框加一个v-if方法，出现就是一个新的框，这样之前被保留的files就相当于弹窗消失他就的生命周期就销毁了，第二张图片也不是null,而是新的上一张图片 -->
            <input
              type="file"
              class="my-input"
              @change="getFile"
              v-if="info.isshow"
            />
          </div>
        </el-form-item>
        <!-- 原生上传图片 end-->

        <!-- 状态 -->
        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="no">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isBtn == 1"
          >添 加</el-button
        >
        <el-button type="primary" @click="update" v-else>编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import { reqCateAdd, reqCateinfo, reqCateUpdate } from "../../../utils/request";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      //图片地址
      imgUrl: "",
      form: {
        pid: 0,
        catename: "",
        img: null,
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "cate/list", //调用状态层的list数据
    }),
  },
  methods: {
    ...mapActions({
      reqListAction: "cate/reqListAction", //显示列表数据
    }),

    //设置图片上传的条件
    getFile(e) {
      let file = e.target.files[0];
      console.log(file);
      //1.大小不超过2m
      if (file > 2 * 1024 * 1024) {
        warningAlert("文件不能超过2M");
        return; //如果文件超过2M，就提示用户超过2M,return就是后面的代码不执行了
      }

      //2.验证是不是图片的格式
      let imgExtArr = [".jpg", ".jpeg", ".png", "gif"];
      //slice剪裁，slice()括号里写的时从点的位置开始裁剪，后面没参数就是裁到最后，也就是把整个后缀名剪下来了
      let extname = file.name.slice(file.name.lastIndexOf(".")); //1.jpg,从点的位置裁剪，把后缀名赋值给name
      //  console.log(extname);.jpg

      //一个数组在不在另外一个元素用
      if (!imgExtArr.some((item) => item == extname)) {
        warningAlert("文件格式不正确");
        return;
      }

      //  console.log(e);//文件信息
      //  let file = e.target.files[0]
      // console.log(file);
      //URL.createObjectURL(),可以通过文件生成一个地址,展示给用户
      this.imgUrl = URL.createObjectURL(file); //把文件变为地址
      // console.log(imgUrl)//blob:http://localhost:8080/b1dfcf8a-e1ce-4bd7-95ce-f21524c8a6d5

      //把文件赋值到form里面的img变量中去,就可以实现把这张图片存到数据库中去
      this.form.img = file; //传到后台数据库
    },

    add() {
      // console.log(this.form);
      reqCateAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          this.no();
          this.reset();
          this.reqListAction();
          successAlert(res.data.msg);
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    no() {
      this.reset();
      this.info.isshow = false;
    },
    emp() {
      if ((this.info.isBtn = 2)) {
        this.reset();
      }
    },
    reset() {
      this.form = {
        pid: 0,
        catename: "",
        img: null,
        status: 1,
      };
      this.imgUrl = "";
    },
    look(id) {
      reqCateinfo(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
          //请求到的图片放到imgUrl展示给用户
          this.imgUrl =  this.$imgPre+this.form.img;
          // this.imgUrl = this.$imgPre+res.data.img
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    update() {
      reqCateUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          this.no();
          this.reset();
          this.reqListAction();
          successAlert(res.data.msg);
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    //一进页面,像后端发起ajax请求,获取数据
    this.reqListAction();
  },
};
</script>
<style scoped>
h3 {
  font-size: 30px;
  line-height: 250px;
  text-align: center;
}
.my-upload {
  width: 250px;
  height: 250px;
  border: dashed 1px black;
  position: relative;
}
.my-input {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: red;
  opacity: 0;
  cursor: pointer; /* 小手 */
}
img {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
