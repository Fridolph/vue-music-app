<template>
  <transition name="slide">
    <div class="singer-detail">

    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import {log} from 'common/js/util'
import {getSingerDetail} from 'api/singer'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'

export default {
  data() {
    return {
      song: []
    }
  },
  computed: {
    ...mapGetters([
      'singer'
    ])
  },

  methods: {
    _getDetail() {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id)
        .then(res => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.data.list)
            log('songs, 歌曲', this.songs)
          }
        })
    },

    _normalizeSongs(list) {
      let ret = []
      list.forEach(item => {
        let {musicData} = item

        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
    }
  },

  created() {
    this._getDetail();
    log('this.singer', this.singer)
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'

  .singer-detail
    position: fixed
    z-index: 100
    top: 0
    left:0
    right: 0
    bottom: 0
    background: $color-background
  
  .slide-enter-active, .slide-leave-active
    transition: all 0.4s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>