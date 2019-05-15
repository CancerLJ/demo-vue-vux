<template>
  <div ref="wrapper" class="list-wrapper">
    <template>
      <div class="scroll-content">
        <div ref="listWrapper" v-show="!loading">
          <slot></slot>
        </div>
        <slot name="pullup"
          :pullUpLoad="pullUpLoad"
          :isPullUpLoad="isPullUpLoad"
        >
          <div class="pullup-wrapper" v-if="hasMore&&pullUpLoad">
            <loading-item v-if="isPullUpLoad"></loading-item>
            <div v-else v-show="pullUpDirty" class="pullup-tips"></div>
          </div>
        </slot>
      </div>
      <slot name="pulldown"
        :pullDownRefresh="pullDownRefresh"
        :pullDownStyle="pullDownStyle"
        :beforePullDown="beforePullDown"
        :isPullingDown="isPullingDown"
        :bubbleY="bubbleY"
      >
        <div ref="pulldown" class="pulldown-wrapper" :style="pullDownStyle" v-if="pullDownRefresh">
          <div class="before-trigger" v-if="beforePullDown">
            <bubble :y="bubbleY"></bubble>
          </div>
          <div class="after-trigger" v-else>
            <div v-if="isPullingDown" class="loading">
              <loading-item></loading-item>
            </div>
            <div v-else class="pulldown-succ"><span>{{refreshTipsTxt}}</span></div>
          </div>
        </div>
      </slot>
    </template>
    <loading-page v-if="loading"></loading-page>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import LoadingItem from './loading.vue'
import LoadingPage from './loading-page.vue'
import Bubble from './bubble.vue'
import {getRect} from 'utils/dom'
const COMPONENT_NAME = 'scroll'
const DIRECTION_H = 'horizontal'
const DIRECTION_V = 'vertical'

export default {
  name: COMPONENT_NAME,
  props: {
    data: {
      type: Array,
      default: () => []
    },
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    listenBeforeScroll: {
      type: Boolean,
      default: false
    },
    listenScrollEnd: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      default: DIRECTION_V
    },
    scrollbar: {
      type: null,
      default: () => ({fade: true})
    },
    pullDownRefresh: {
      type: null,
      default: false
    },
    pullUpLoad: {
      type: null,
      default: false
    },
    startY: {
      type: Number,
      default: 0
    },
    refreshDelay: {
      type: Number,
      default: 500
      // default: 20
    },
    freeScroll: {
      type: Boolean,
      default: false
    },
    mouseWheel: {
      type: Boolean,
      default: true
    },
    bounce: {
      default: true
    },
    zoom: {
      default: false
    },
    hasMore: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      beforePullDown: true,
      isRebounding: false,
      isPullingDown: false,
      isPullUpLoad: false,
      pullUpDirty: true,
      pullDownStyle: 'top:-80px;',
      bubbleY: 0,
      refreshTips: '更新成功'
    }
  },
  created() {
    this.pullDownInitTop = -50
    this.refreshTipsTxt = this.refreshTips
  },
  mounted() {
    setTimeout(() => {
      this.initScroll()
    }, 20)
  },
  activated() {
    this.$nextTick(() => {
      this.refresh()
    })
  },
  methods: {
    initScroll() {
      if (!this.$refs.wrapper) {
        return
      }
      if (this.$refs.listWrapper && (this.pullDownRefresh || this.pullUpLoad)) {
        this.$refs.listWrapper.style.minHeight = `${getRect(this.$refs.wrapper).height + 1}px`
      }

      let options = {
        probeType: this.probeType,
        click: this.click,
        scrollY: this.freeScroll || this.direction === DIRECTION_V,
        scrollX: this.freeScroll || this.direction === DIRECTION_H,
        scrollbar: this.scrollbar,
        pullDownRefresh: this.pullDownRefresh ? {threshold: 90, stop: 40} : false,
        pullUpLoad: this.pullUpLoad ? {threshold: 100} : false,
        startY: this.startY,
        freeScroll: this.freeScroll,
        mouseWheel: this.mouseWheel,
        bounce: this.bounce,
        zoom: this.zoom
      }

      this.scroll = new BScroll(this.$refs.wrapper, options)

      if (this.listenScroll) {
        this.scroll.on('scroll', (pos) => {
          this.$emit('scroll', pos)
        })
      }

      if (this.listenScrollEnd) {
        this.scroll.on('scrollEnd', (pos) => {
          this.$emit('scroll-end', pos)
        })
      }

      if (this.listenBeforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScrollStart')
        })

        this.scroll.on('scrollStart', () => {
          this.$emit('scroll-start')
        })
      }

      if (this.pullDownRefresh) {
        this._initPullDownRefresh()
      }

      if (this.pullUpLoad) {
        this._initPullUpLoad()
      }
    },
    disable() {
      this.scroll && this.scroll.disable()
    },
    enable() {
      this.scroll && this.scroll.enable()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
    getScrollY() {
      if (this.scroll) {
        return this.scroll.y
      } else {
        return 0
      }
    },
    analogRefresh() {
      this.scrollTo(0, 40)
      this.beforePullDown = false
      this.isPullingDown = true
      this.pullDownStyle = 'top: 0'
    },
    destroy() {
      this.scroll.destroy()
    },
    forceUpdate(success = true, dirty = false) {
      if (this.pullDownRefresh && this.isPullingDown) {
        this.isPullingDown = false
        this.pullUpDirty = true
        this.refreshTipsTxt = success ? this.refreshTips : '更新失败'
        this._reboundPullDown().then(() => {
          this._afterPullDown()
        })
      } else if (this.pullUpLoad && this.isPullUpLoad) {
        this.isPullUpLoad = false
        this.scroll.finishPullUp()
        this.pullUpDirty = dirty
        this.$nextTick(() => {
          this.refresh()
        })
      } else {
        this.refresh()
      }
    },
    _initPullDownRefresh() {
      this.scroll.on('pullingDown', () => {
        this.beforePullDown = false
        this.isPullingDown = true
        this.$emit('refresh')
      })

      this.scroll.on('scroll', (pos) => {
        if (!this.pullDownRefresh) {
          return
        }
        if (this.beforePullDown) {
          this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop)
          // this.pullDownStyle = `top:${Math.min(pos.y + this.pullDownInitTop, 10)}px`
          this.pullDownStyle = `top:${Math.min(pos.y + this.pullDownInitTop, 0)}px`
        } else {
          this.bubbleY = 0
        }

        if (this.isRebounding) {
          this.pullDownStyle = `top:${10 - (this.pullDownRefresh.stop - pos.y)}px`
        }
      })
    },
    _initPullUpLoad() {
      this.scroll.on('pullingUp', () => {
        this.isPullUpLoad = true
        setTimeout(() => {
          this.$emit('load')
        }, 1000)
        // this.isPullUpLoad = true
        // this.$emit('pullingUp')
      })
    },
    _reboundPullDown() {
      const {stopTime = 800} = this.pullDownRefresh
      return new Promise((resolve) => {
        setTimeout(() => {
          this.isRebounding = true
          this.scroll.finishPullDown()
          resolve()
        }, stopTime)
      })
    },
    _afterPullDown() {
      this.pullDownStyle = `top:${this.pullDownInitTop}px`
      this.beforePullDown = true
      this.isRebounding = false
      this.refresh()
      // setTimeout(() => {
      //     this.pullDownStyle = `top:${this.pullDownInitTop}px`
      //     this.beforePullDown = true
      //     this.isRebounding = false
      //     this.refresh()
      // }, this.scroll.options.bounceTime)
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.forceUpdate(true, true)
      }, this.refreshDelay)
    }
  },
  components: {
    LoadingItem,
    LoadingPage,
    Bubble
  }
}
</script>

<style lang="less" scoped>
.list-wrapper{
  position: relative;
  height: 100%;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-transform: translate3d(0,0,0);
  transform: translate3d(0,0,0);
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility:hidden;
  -ms-backface-visibility:hidden;
  backface-visibility:hidden;
  -webkit-perspective:1000;
  -moz-perspective:1000;
  -ms-perspective:1000;
  perspective:1000;
  .scroll-content{
    position: relative;
    z-index: 1;
    -webkit-overflow-scrolling: touch;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-transform: translate3d(0,0,0);
    transform: translate3d(0,0,0);
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility:hidden;
    -ms-backface-visibility:hidden;
    backface-visibility:hidden;
    -webkit-perspective:1000;
    -moz-perspective:1000;
    -ms-perspective:1000;
    perspective:1000;
  }
  .list-content{
    position: relative;
    z-index: 10;
    .list-item{
      height: 60px;
      line-height: 60px;
      font-size: 18px;
      padding-left: 20px;
      border-bottom: 1px solid #e5e5e5;
    }
  }
}
.pulldown-wrapper{
  position: absolute;
  width: 100%;
  left: 0;
  text-align: center;
  .pulldown-succ{
    position: relative;
    height: 40px;
    line-height: 40px;
    font-size: .45rem;
    color: #fff;
    span{
      position: relative;
      z-index: 100;
    }
    &:before, &:after{
      position: absolute;
      top: 0;
      display: block;
      content: "";
      width: 50%;
      height: 40px;
      background: #f3ac53;
      -webkit-animation: w-stretch .1s linear;
      animation: w-stretch .1s linear;
    }
    &:before{
      right: 50%;
    }
    &:after{
      left: 50%;
    }
  }
}
.pullup-wrapper{
  width: 100%;
  .pullup-tips{
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: .45rem;
    color: #94927f;
  }
}

@-webkit-keyframes w-stretch{
  0%{width: 0;}
  100%{width: 50%}
}
@keyframes w-stretch{
  0%{width: 0;}
  100%{width: 50%}
}
</style>
