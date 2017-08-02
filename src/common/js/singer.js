/*
 * @Author: fridolph 
 * @Date: 2017-08-02 20:53:14 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-08-02 21:23:10
 */

export default class Singer {
  constructor({id, name}) {
    this.id = id
    this.name = name
    this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
  }
}