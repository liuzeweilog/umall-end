<template>
  <div>
    <!-- <h1>登录</h1> -->

    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="specsid" label="商品编号" width="180">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="180">
      </el-table-column>
      <el-table-column prop="price" label="商品价格"> </el-table-column>
      <el-table-column prop="market_price" label="市面价格"> </el-table-column>
      <el-table-column prop="img" label="图片"> </el-table-column>
      <el-table-column prop="isnew" label="是否新品">
        <template>
          <el-button type="primary">是</el-button>
          <el-button type="danger">否</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="ishot" label="是否热卖">
        <template>
          <el-button type="primary">是</el-button>
          <el-button type="danger">否</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template>
          <el-button type="primary">添加</el-button>
          <el-button type="info">禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template>
          <el-button type="primary">编辑</el-button>
          <el-button type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "goods/list",
    }),
  },
  methods: {
    ...mapActions({
      setChangeList: "goods/setChangeList",
    }),
  },
  mounted() {
    this.setChangeList();
  },
};
</script>
<style scoped>
</style>
