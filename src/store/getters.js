/*
 * @Author: fridolph 
 * @Date: 2017-08-16 22:56:51 
 * @Last Modified by: fridolph
 * @Last Modified time: 2017-08-29 20:28:47
 */

export const singer = state => state.singer

// 播放相关的
export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playList = state => state.playList

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currenIndex = state => state.currentIndex

export const currentSong = state => state.playList[state.currentIndex]