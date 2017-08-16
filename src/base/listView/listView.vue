<template>
  <scroll class="listview"
    :listenScroll="listenScroll"
    :data="data"
    @scroll="scroll"
    :probeType="probeType"
    ref="listview">
    <ul>
      <li
        class="list-group"
        ref="listGroup"
        v-for="group in data">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li
            @click="selectItem(item)"
            class="list-group-item"
            v-for="item in group.items">
            <img class="avatar" v-lazy="item.avatar" />
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>

    <div 
      class="list-shortcut"
      @touchmove.stop.prevent="onShortcutTouchMove"
      @touchstart.stop.prevent="onShortcutTouchStart">
      <ul>
        <li 
          class="item"
          :class="{'current' : currentIndex === index}"
          :data-index="index"
          v-for="(item, index) in shortcutList">
          {{item}}
        </li>
      </ul>
    </div>
    <div class="list-fixed" v-show="fixedTitle" ref="fixed">
      <h1 class="fixed-title">{{fixedTitle}}</h1>
    </div>
    <div v-show="!data.length" class="loading-container">
      <loading></loading>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import { getData } from 'common/js/dom'

const ANCHOR_HEIGHT = 18
const TITLE_HEIGHT = 30

export default {
  props: {
    data: {
      probeType: {
        type: Number,
        default: []
      }
    }
  },

  data() {
    return {
      scrollY: -1,
      currentIndex: 0,
      diff: -1
    }
  },

  computed: {
    shortcutList() {
      return this.data.map(group => {
        return group.title.substr(0, 1)
      })
    },
    fixedTitle() {
      if (this.scrollY > 0) {
        return '';
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : '';
    }
  },

  methods: {
    selectItem(item) {
      this.$emit('select', item);
    },
    
    onShortcutTouchStart(e) {
      let anchorIndex = getData(e.target, 'index')
      let firstTouch = e.touches[0]

      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex
      this._scrollTo(anchorIndex)
    },

    onShortcutTouchMove(e) {
      let firstTouch = e.touches[0]      
      this.touch.y2 = firstTouch.pageY
      // 手指在y轴上的偏移
      let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT || 0
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta
      this._scrollTo(anchorIndex)
    },

    scroll(pos) {
      this.scrollY = pos.y
    },

    _scrollTo(index) {
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 300)
    },

    _calculateHeight() {
      this.listHeight = []
      // 声明list，需要知道每个listGroup的高度
      const list = this.$refs.listGroup
      // 第一组还没开始，所以初始是0
      let height = 0
      this.listHeight.push(height)

      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
  },

  watch: {
    data() {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },

    scrollY(newY) {
      const listHeight = this.listHeight
      // 当滚动到顶部，newY>0
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      // 在中间部分滚动
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i
          this.diff = height2 + newY
          return
        }
      }
      // 当滚动到底部，且-newY大于最后一个元素的上限
      this.currentIndex = listHeight.length - 2
    },

    diff(newVal) {
      let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0

      if (this.fixedTop === fixedTop) {
        return
      }
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px, 0)`;
    }
  },

  created() {
    // touch事件需要共享的属性， 如 手指的pageY
    // data是响应式的，这里不需要，所以在created钩子里创建
    this.probeType = 3
    this.listenScroll = true
    this.touch = {}
    this.listHeight = []
  },

  components: {
    Scroll,
    Loading
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
