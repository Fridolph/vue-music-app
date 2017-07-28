/*
 * @Author: fridolph 
 * @Date: 2017-07-27 23:12:26 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-07-27 23:24:37
 */

import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'

export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,  
    format: 'jsonp',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0
  })

  return jsonp(url, data, options)
}