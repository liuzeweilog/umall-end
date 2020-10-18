<template>
  <div>
    <h1>添加</h1>
    <el-dialog
      :title="info.isBtn == 1 ? '商品规格添加' : '商品规格修改'"
      :visible.sync="info.isshow"
    >
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
        <el-button type="primary" @click="add" v-if="info.isBtn == 1"
          >添 加</el-button
        >
        <el-button type="primary" @click="modify" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import {
  reqSpecsAdd,
  reqSpecsUpdate,
  reqSpecsinfo,
} from "../../../utils/request";
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
      setChangeTotal: "specs/setChangeTotal",
    }),
    // kong() {
    //   if (this.attrArr.some((item) => item.value == "")) {
    //     warningAlert("请在商品规格输入内容");
    //     return;
    //   }
    // },
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

      if(!this.checkedData()==true){
        return;
      }

      //  console.log(this.form);

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
          this.setChangeList(); //添加完列表刷新
          this.setChangeTotal(); //添加完总数刷新
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    //验证数据是否为空
    checkedData() {
      //验证规格名称输入框里的值是否为空
      if (this.form.specsname == "") {
        warningAlert("商品规格名称不能为空");
        return false;
      }
      //属性值一个都没有就提示报错,不能写因为有一个新增规格属性永远在
      // if(this.attrArr.length==0){

      // }
      //只要有一个属性值(规格属性)是空就提示报错 some就是有一个是假的就是假的
      if (this.attrArr.some((item) => item.value == "")) {
        warningAlert("所有的内容都要填写");
        return false;
      }
      return  true;
    },

    //取消按钮
    dis() {
      this.info.isshow = false;
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

    //点击编辑按钮
    look(id) {
      // console.log(id);
      reqSpecsinfo(id).then((res) => {
        this.form = res.data.list[0]; //把list的内容放到输入框里(form),因为数据在list的下标为0的地方所以写下标0

        this.form.id = id; //因为form里面没有id这个值,从页面编辑按钮获取到id,然后通过id修改这行的信息

        //把页面的attrs(规格属性)里的数组内容,放到attrArr的value里,同样转换成数组才能遍历,所以要转换一下
        //'['s','l','m']'-->[{value:'s'},{value:'l'},{value:'m'}]'
        //1. this.attrArr=JSON.parse(this.form.attrs)这一步之间转换成立这个了'['s','l','m']',但是最终目的转成回attrArr一样的格式,因为要在attrArr上显示
        //2. 所以有了这前提 this.attrArr=JSON.parse(this.form.attrs) ,再把这个里的数(s,l,m)变成一个符合attrArr的新数组,通过map变成一个新数组.map(item=>'value'+item),=>这是要转换成什么样的逻辑,因为直接写{}相当于浏览器回忽略{}直接return,所以要加一个()包起来,这样浏览器就不会忽略{}了
        this.attrArr = JSON.parse(this.form.attrs).map((item) => ({
          value: item,
        }));
      });
    },

    //弹框里的修改按钮
    modify() {
      //不是true值,就结束,是true就继续执行下面代码
      if(!this.checkedData()){
        return;
      }

      this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.value));

      reqSpecsUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          this.reset(); //点击完数据重置
          this.dis(); //弹框消失
          this.setChangeList(); //刷新页面
          successAlert(res.data.msg);
        } else {
          warningAlert(res.data.msg);
        }
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
