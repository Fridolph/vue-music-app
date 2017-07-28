<template>
  <div class="singer">
    歌手页面
  </div>
</template>

<script>
import { getSingerList } from 'api/singer'
import { ERR_OK } from 'api/config'

export default {
  name: 'singer-page',  
  data() {
    return {
      singers: []
    }
  },

  created() {
    this._getSingerList()
  },

  methods: {
    _getSingerList() {
      getSingerList()
        .then(res => {
          if (res.code === ERR_OK) {
            // console.log(res.data)
            this.singers = res.data.list
            console.log(this.singers)

          }
        })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
