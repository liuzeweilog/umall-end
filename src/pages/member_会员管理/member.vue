<template>
  <div>
    <v-list @change="edit"></v-list>
    <v-add :info='info' ref="child"></v-add>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vAdd from './components/add'
import vList from './components/list'
export default {
  props: [],
  components: {
    vAdd,
    vList,
  },
  data() {
    return {
      info:{
        isshow:false,
      }
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    edit(uid){
      console.log(uid);
      this.info.isshow=true;
      this.$refs.child.look(uid);
    }
  },
  mounted() {

  },
};
</script>
<style scoped>
</style>
