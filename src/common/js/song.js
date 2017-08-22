/*
 * @Author: fridolph 
 * @Date: 2017-08-22 00:39:51 
 * @Last Modified by: fridolph
 * @Last Modified time: 2017-08-22 22:47:23
 */

export default class Song {
  constructor({
    id,
    mid,
    singer,
    name,
    album,
    duration,
    image,
    url
  }) {
    this.id = id;
    this.mid = mid;
    this.singer = singer;
    this.name = name;
    this.album = album;
    this.duration = duration;
    this.image = image;
    this.url = url;
  }
}

export function createSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://dl.stream.qqmusic.qq.com/${musicData.songid}.m4a?vkey=2F11A6BDAAAAAEC26B271FCD5B992C21E98F064CE6522A9B06AE05012C25A974D90431E6EFDB90D988A060CB4F70636C5B9A0C8D38E01626&guid=258171504&uin=0&fromtag=66`
  })
}

function filterSinger(singer) {
  let ret = []
  
  if (!singer) {
    return ''
  }
  singer.forEach(s => {
    ret.push(s.name)
  })
  return ret.join('/')
}