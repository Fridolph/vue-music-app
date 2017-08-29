/*
 * @Author: fridolph 
 * @Date: 2017-08-16 22:47:29 
 * @Last Modified by: fridolph
 * @Last Modified time: 2017-08-29 20:16:27
 */

import { playMode } from 'common/js/config'

const state = {
  singer: {},                 // 当前查看的歌手
  playing: false,             // 默认不播放
  fullScreen: false,          // 默认不全屏
  playlist: [],               // 播放列表
  sequenceList: [],           // 顺序播放列表
  mode: playMode.sequence,    // 默认顺序播放
  currentIndex: -1,           // 当前维护的歌曲
}

export default state