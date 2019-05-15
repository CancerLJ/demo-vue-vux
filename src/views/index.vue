<template>
  <div class="page" style="-webkit-box-orient: vertical;" v-title="'首页'">
    <x-header :left-options="{showBack: false}">首页</x-header>
    <tab :line-width=2 v-model="tabActive">
      <tab-item class="vux-center" v-for="(item, index) in category" :key="index" @on-item-click="handleTab(item)" >{{item.name}}</tab-item>
    </tab>
    <div class="container" style="-webkit-box-flex: 1;">
      <panel :list="list" type="5" @on-img-error="onImgError"></panel>
    </div>
    <com-footer></com-footer>
  </div>
</template>

<script>
import { XHeader, Tab, TabItem, Panel } from 'vux'
import comFooter from 'components/common/footer'

import { getCategoryLists, getArticlesByCateId } from 'api/article'
export default {
  data() {
    return {
      category: [],
      tabActive: 0,
      list: [],
      page: 1,
      size: 10,
      total: 1
    }
  },
  async created() {
    this.category = await this.getCategoryLists()
    this.getArticleLists(0)
  },
  methods: {
    handleTab(item) {
      this.page = 1
      this.getArticleLists(0)
    },
    getCategoryLists() {
      return new Promise((resolve, reject) => {
        getCategoryLists().then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getArticleLists(flag) {
      if (this.category[this.tabActive] === undefined) {
        return false
      }

      this.$vux.loading.show({ text: 'Loading' })
      let data = {
        cat_id: this.category[this.tabActive].id,
        page: this.page,
        size: this.size
      }
      getArticlesByCateId(data).then(res => {
        this.total = res.data.total
        if (res.data.list.length > 0) {
          this.page++
          const formatList = this.formatList(res.data.list)
          this.list = flag === 0 ? formatList : this.list.concat(formatList)
        } else {
          this.list = []
          // this.$refs.scroll.forceUpdate()
        }
        this.$vux.loading.hide()
        return true
      }).catch(() => {
        // this.$refs.scroll.forceUpdate(false)
        this.$vux.loading.hide()
        return false
      })
    },
    formatList(list) {
      return list.map((item) => {
        let obj = {}
        obj.title = item.title
        obj.desc = item.desc
        if (item.thumbnail !== '' && item.thumbnail !== null) {
          obj.src = this.$urlUpload + item.thumbnail
        }
        obj.url = `/article/${item.id}`
        return obj
      })
    },
    onImgError (item, $event) {
      console.log(item, $event)
    }
  },
  components: {
    XHeader,
    Tab,
    TabItem,
    Panel,
    comFooter
  }
}
</script>

<style lang="less" scoped>
</style>
