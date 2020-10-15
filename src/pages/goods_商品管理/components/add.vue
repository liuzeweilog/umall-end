<template>
  <div>
    <el-dialog title="收货地址" :visible.sync="info.isshow">
      <el-form ref="tableData" :model="tableData" label-width="80px">
        <!-- 一级分类 -->
        <el-form-item label="一级分类">
          <el-select
            v-model="tableData.first_cateid"
            placeholder="请选择活动区域"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <!-- 二级分类 -->
        <el-form-item label="二级分类">
          <el-select
            v-model="tableData.second_cateid"
            placeholder="请选择活动区域"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <!-- 商品名称 -->
        <el-form-item label="商品名称">
          <el-input v-model="tableData.goodsname"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="tableData.price"></el-input>
        </el-form-item>
        <el-form-item label="市场价格">
          <el-input v-model="tableData.market_price"></el-input>
        </el-form-item>

        <!-- 图片 -->
        <el-form-item label="图片">
          <!-- <el-input v-model="tableData.first_cateid"></el-input> -->
          <!-- img -->
        </el-form-item>

        <el-form-item label="商品规格">
          <el-select v-model="tableData.specsid" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="规格属性">
          <el-select
            v-model="tableData.specsattr"
            placeholder="请选择活动区域"
            multiple
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品">
          <el-radio-group v-model="tableData.isnew">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否热卖">
          <el-radio-group v-model="tableData.ishot">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="即时配送">
          <el-switch v-model="tableData.status"></el-switch>
        </el-form-item>

        <el-form-item label="商品描述">
          <el-input type="textarea" v-model="tableData.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >添 加</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["info"],
  components: {},
  data() {
    return {
      tableData: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
  },
  mounted() {},
};
</script>
<style scoped>
</style>
