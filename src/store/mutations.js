/*
 * @Author: fridolph 
 * @Date: 2017-08-16 22:50:10 
 * @Last Modified by: fridolph
 * @Last Modified time: 2017-08-29 20:26:53
 */

import * as types from './mutation-types'

const mutations = {
  /**
   * @param {state} 获取当前状态树的state 
   * @param {singer} 所要传的参数
   */
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },

  [types.SET_PLAYING_STATE](state, flag) {
    state.playing = flag
  },

  [types.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag
  },

  [types.SET_PLAY_LIST](state, list) {
    state.playlist = list
  },

  [types.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list
  },

  [types.SET_MODE](state, mode) {
    state.mode = mode
  },

  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index
  }
}

export default mutations