/*
 * @Author: fridolph
 * @Date: 2017-07-17 20:12:27
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-07-27 23:22:30
 */

import originJSONP from 'jsonp'
/**
 * 封装了JSONP
 *
 * @export
 * @param {any} url
 * @param {any} data
 * @param {any} option
 */
export default function jsonp(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)

  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

function param(data) {
  let url = ''

  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += `&${k}=${encodeURIComponent(value)}`
  }

  return url ? url.substring(1) : ''
}