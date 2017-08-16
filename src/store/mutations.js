/*
 * @Author: fridolph 
 * @Date: 2017-08-16 22:50:10 
 * @Last Modified by: fridolph
 * @Last Modified time: 2017-08-16 23:55:08
 */

import * as types from './mutation-types'

const mutations = {
  /**
   * @param {state} 获取当前状态树的state 
   * @param {singer} 所要传的参数
   */
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  }
}

export default mutations