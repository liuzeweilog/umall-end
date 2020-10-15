import Vue from 'vue'

let obj={

}

for(i in obj){
  Vue.filter(i,obj[i])
}

