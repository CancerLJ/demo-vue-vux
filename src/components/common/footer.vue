<template>
  <tabbar @on-index-change="tabbarTaggle">
    <tabbar-item :selected="$route.path=='/'" link="/">
      <svg-icon slot="icon" class="icon" icon-class="home" />
      <span slot="label">首页</span>
    </tabbar-item>
    <tabbar-item :selected="$route.path=='/search'" link="/search">
      <svg-icon slot="icon" class="icon" icon-class="search" />
      <span slot="label">搜索</span>
    </tabbar-item>
    <tabbar-item :selected="$route.path=='/user'" link="/user">
      <svg-icon slot="icon" class="icon" icon-class="user" />
      <span slot="label">我的</span>
    </tabbar-item>
  </tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'

export default {
  methods: {
    tabbarTaggle(index) {
    }
  },
  components: {
    Tabbar,
    TabbarItem
  }
}
</script>
