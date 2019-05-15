<template>
  <div class="page" style="-webkit-box-orient: vertical;" v-title="'搜索'">
    <search
      @result-click="resultClick"
      @on-change="onChange"
      v-model="value"
      :autoFixed="false"
      @on-focus="onFocus"
      @on-cancel="onCancel"
      @on-submit="onSubmit"
      ref="search"></search>
    <div class="container" style="-webkit-box-flex: 1;">
      <ul class="tags">
        <li v-for="(item, index) in tags" :key="index" @click="handleTags(item)">
          {{item.name}}
          <badge :text="item.count"></badge>
        </li>
      </ul>
      <div class="result" v-if="list.length">
        <h2 class="result_h">搜索结果</h2>
        <panel :list="list" type="5"></panel>
      </div>
    </div>
    <com-footer></com-footer>
  </div>
</template>

<script>
import { Search, Badge, Panel } from 'vux'
import comFooter from 'components/common/footer'

import { getTags, searchArticles } from 'api/search'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      value: '',
      tags: [],
      list: [],
      page: 1,
      size: 10,
      total: 1
    }
  },
  created() {
    this.getTags()
  },
  methods: {
    ...mapMutations(['addSearchList', 'setSearchList']),
    resultClick() {},
    onChange(val) {},
    onFocus() {},
    onCancel() {},
    onSubmit() {
      this.$refs.search.setBlur()
      this.page = 1
      this.addSearchList({
        keywords: this.value,
        time: new Date().getTime()
      })
      searchArticles({
        keywords: this.value,
        page: this.page,
        size: this.size
      }).then(res => {
        // this.list = res.data
        this.list = this.resultFormat(res.data)
        if (this.list.length === 0) {
          this.$vux.toast.show({
            type: 'text',
            position: 'top',
            text: '没有检索到结果'
          })
        }
      })
    },
    getTags() {
      getTags().then(res => {
        this.tags = res.data
      })
    },
    handleTags(tag) {
      this.page = 1
      searchArticles({
        tag: tag.id,
        page: this.page,
        size: this.size
      }).then(res => {
        // this.list = res.data
        this.list = this.resultFormat(res.data)
        if (this.list.length === 0) {
          this.$toast({
            message: '没有检索到结果',
            duration: 5000
          })
        }
      })
    },
    resultFormat(list) {
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
    }
  },
  components: {
    Search,
    Badge,
    Panel,
    comFooter
  }
}
</script>

<style lang="less" scoped>
.tags{
  li{
    display: inline-block;
    margin: 5px 10px;
    padding: 3px 8px;
    background: #e6e6e6;
    border-radius: 16px;
  }
}

.result{
  margin-top: 10px;
  .result_h{
    margin: 5px 10px;
    font-size: 16px;
  }
}
</style>
