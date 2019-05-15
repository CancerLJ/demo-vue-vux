import Vue from 'vue'

// 自定义标题
Vue.directive('title', {
  // 第一种方式  v-title="'haha'"  这样使用---传参方法
  bind(el, binding, vunode) {
    document.title = binding.value
  },
  update(el, binding, vunode) {
    document.title = binding.value
  }
  // 第二种方式 v-title data-title="所需要的标题"  这样使用
  // inserted: function (el) {
  //   document.title = el.dataset.title
  // },
  // update: function (el) {
  //   document.title = el.dataset.title
  // }
})
