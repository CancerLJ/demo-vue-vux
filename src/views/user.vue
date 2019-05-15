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
        <tbody>
          <tr v-for="(item, index) in searchList" :key="index">
            <td>{{index}}</td>
            <td>{{item.keywords}}</td>
            <td>{{item.time|formatTime}}</td>
          </tr>
        </tbody>
      </x-table>
    </div>
    <com-footer></com-footer>
  </div>
</template>

<script>
import { XHeader, XTable, dateFormat } from 'vux'
import comFooter from 'components/common/footer'

import { mapGetters } from 'vuex'
import '@/filters/formatTime'
export default {
  filters: {
    dateFormat
  },
  computed: {
    ...mapGetters(['searchList'])
  },
  components: {
    XHeader,
    XTable,
    comFooter
  }
}
</script>
