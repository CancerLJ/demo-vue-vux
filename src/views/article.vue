<template>
  <div class="page" style="-webkit-box-orient: vertical;" v-title="article.title?article.title:'文章详情'">
    <x-header :left-options="{backText: ''}" :right-options="{showMore: true}" @on-click-more="handleMore">文章详情</x-header>
    <div class="container article" style="-webkit-box-flex: 1;">
      <!-- <div class="scroll-container"> -->
        <!-- <com-scroll ref="scroll"> -->
        <div class="article_h">{{article.title}}</div>
        <div class="article_tips" v-show="article.update_time">
          <span>{{article.update_time|dateFormat}}</span>
        </div>
        <div class="article_content" v-html="article.content"></div>
        <!-- </com-scroll> -->
      <!-- </div> -->
    </div>
    <actionsheet v-model="operateFlag" :menus="menus" @on-click-menu="handleActionsheet" show-cancel></actionsheet>
  </div>
</template>

<script>
import { XHeader, Actionsheet, dateFormat } from 'vux'
// import comScroll from 'components/scroll/scroll'

import { getArticleDetail } from 'api/article'

export default {
  filters: {
    dateFormat
  },
  data() {
    return {
      article: {},
      operateFlag: false,
      menus: {
        menu1: '拍照',
        menu2: '从相册中选择'
      }
    }
  },
  created() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      getArticleDetail(this.$route.params.id).then(res => {
        this.article = res.data
      })
    },
    handleMore() {
      this.operateFlag = true
    },
    handleActionsheet(val) {
      console.log(this.menus[val])
    }
  },
  components: {
    XHeader,
    Actionsheet
  }
}
</script>

<style lang="less">
@import '../assets/less/article.less';
</style>

<style lang="less" scoped>
.article{
  padding: 10px;
  overflow: auto !important;
  .article_h{
    font-size: 18px;
  }
  .article_tips{
    margin: 10px 0;
    font-size: 12px;
    color: #aaa;
  }
  .article_content{
    font-size: 14px;
  }
}
</style>
