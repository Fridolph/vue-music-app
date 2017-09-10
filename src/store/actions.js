/*
 * @Author: fridolph 
 * @Date: 2017-08-16 23:19:25 
 * @Last Modified by: fridolph
 * @Last Modified time: 2017-08-29 22:55:24
 */

import * as types from './mutation-types'

export const selectPlay = function({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_PLAY_LIST, list)
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}