<template>
  <div>
    <h1>首页管理</h1>

    <div class="box" id="box"></div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import echarts from "echarts";
import listVue from "../cate_商品分类/components/list.vue";
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

  watch: {
    list: {
      handler() {
        if (this.list.length > 0) {
          //绘制柱形图
          // 基于准备好的dom，初始化echarts实例
          var myChart = echarts.init(document.getElementById("box"));

          // 指定图表的配置项和数据
          var option = {
            title: {
              text: "商品分类",
            },
            tooltip: {},
            legend: {
              data: ["分类数量 "],
            },
            xAxis: {
              data: this.list.map((item) => item.catename),
            },
            yAxis: {},
            series: [
              {
                name: "分类数量",
                type: "pie",
                data: this.list.map(item=>item.children.length)
              },
            ],
          };

          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
        }
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions({
      reqList: "cate/reqListAction",
    }),
  },
  mounted() {
    this.reqList(); //一进页面请求cate数据库里的数据
  },
};
</script>
<style scoped>
.box {
  width: 80%;
  margin: 20px auto;
  border: 1px solid black;
  height: 400px;
}
</style>
