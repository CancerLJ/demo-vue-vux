<template>
  <div class="page" style="-webkit-box-orient: vertical;" v-title="'搜索历史'">
    <x-header :left-options="{showBack: false}">我的搜索历史</x-header>
    <div class="container" style="-webkit-box-flex: 1;">
      <x-table :cell-bordered="false">
        <thead>
          <tr>
            <th>序号</th>
            <th>关键字</th>
            <th>时间</th>
          </tr>
        </thead>
        <tbody v-if="searchList.length>0">
          <tr v-for="(item, index) in searchList" :key="index">
            <td>{{index}}</td>
            <td>{{item.keywords}}</td>
            <td>{{item.time|formatTime}}</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="3" style="color:#999">暂无记录</td>
          </tr>
        </tbody>
      </x-table>
      <box gap="20px 10px">
        <x-button type="primary" @click.native="handleClear">清空记录</x-button>
      </box>
    </div>
    <com-footer></com-footer>
  </div>
</template>

<script>
import { XHeader, XTable, dateFormat, Box, XButton } from 'vux'
import comFooter from 'components/common/footer'

import { mapGetters, mapMutations } from 'vuex'
import '@/filters/formatTime'
export default {
  filters: {
    dateFormat
  },
  computed: {
    ...mapGetters(['searchList'])
  },
  methods: {
    ...mapMutations(['setSearchList']),
    handleClear() {
      this.setSearchList([])
    }
  },
  components: {
    XHeader,
    XTable,
    Box,
    XButton,
    comFooter
  }
}
</script>
