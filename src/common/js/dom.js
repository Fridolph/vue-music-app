/*
 * @Author: fridolph 
 * @Date: 2017-07-18 18:41:41 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-07-18 19:02:25
 */

export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }

  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}