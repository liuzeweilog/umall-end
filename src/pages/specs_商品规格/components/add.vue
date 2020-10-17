<template>
  <div>
    <h1>添加</h1>
    <el-dialog title="收货地址" :visible.sync="info.isshow">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="规格名称">
          <el-input v-model="form.specsname"></el-input>
        </el-form-item>

        <el-form-item
          label="规格属性"
          v-for="(item, index) in attrArr"
          :key="index"
        >
          <div class="box">
            <el-input v-model="item.value"> </el-input>
            <el-button type="primary" v-if="index == 0" @click="addArr"
              >新增规格属性</el-button
            >
            <el-button type="danger" v-else @click="delArr(index)"
              >删除</el-button
            >
          </div>
        </el-form-item>

        <!-- <el-form-item label="规格属性">
          <div class="box">
            <el-input v-model="form.name"> </el-input>
            <el-button type="danger">删除</el-button>
          </div>
        </el-form-item> -->

        <el-form-item label="即时配送">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dis">取 消</el-button>
        <el-button type="primary" @click="add">添 加</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import { reqSpecsAdd } from "../../../utils/request";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      //规格属性的数组
      attrArr: [{ value: "" }, { value: "" }],
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
       setChangeList: "specs/setChangeList",

       //刷新列表总数
       setChangeTotal:"specs/setChangeTotal"
    }),
    // 新增规格属性添加输入框
    addArr() {
      this.attrArr.push({ value: "" });
    },
    // 新增规格属性删除输入框
    delArr(index) {
      this.attrArr.splice(index, 1);
    },

    //点击添加按钮
    add() {
      console.log(this.form);
      // console.log(this.attrArr);

      // item代表数组{}里的值,item里面的value,=>后面的是返回的就是新数组的每一项,这个value相当于键名,这样取到的就是键值,然后用map会生成一个新的数组,这个数组赋值到a变量,a变量相当于接收到了一个新的数组,里面的内容是之前的数组计算得到的新值
      // this.form.attrs= this.attrArr.map(item=>item.value)//["华为", "小米", "vivo", "oppo"]
      //JSON.stringify是为了把数组(object)类型转换为字符串类型(string),后台要求是字符串类型
      //this.form.attrs = JSON.stringify(this.attrArr.map(item=>item.value))

      // console.log(this.attrArr);

      // 旧数组attrArr的值{vlaue:'华为'}{vlaue:'小米'}{vlaue:'vivo'}{vlaue:'oppo'}
      // 新数组a的值//["华为", "小米", "vivo", "oppo"]

      this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.value));
      reqSpecsAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.dis();
          this.reset();
          this.setChangeList();//添加完列表刷新
          this.setChangeTotal()//添加完总数刷新
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    //取消按钮
    dis() {
      this.info.isshow = false;
      this.reset();
    },
    //重置
    reset() {
      (this.attrArr = [{ value: "" }, { value: "" }]),
        (this.form = {
          specsname: "",
          attrs: "",
          status: 1,
        });
    },
  },
  mounted() {
    this.setChangeList();
  },
};
</script>
<style scoped>
.box {
  display: flex;
}
</style>
