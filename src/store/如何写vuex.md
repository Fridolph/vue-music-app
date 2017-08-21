## 编写 Vuex 的步骤：

创建 store 文件夹，并建立以下文件

* 01index.js            把store初始化，入口
* 02state.js            存放所有的状态
* 03mutations.js        定义要修改的操作(同步)
* 04mutation-type.js    mutations的一些字符串常量
* 05actions.js          异步修改数据通常放到actions里
* 06getters.js          获取state的映射

注： 需要安装 [vue-dev-tools](https://github.com/vuejs/vue-devtools) ？？ 神坑，之前没装，卡了半天数据没反应，安装这个后，vuex就能派发到数据了

### store初始化

1. state.js

```js
const state = {
  singer: {}
}
export default state
```

2. mutation-types.js

```js
export const SET_SINGER = 'SET_SINGER';
```

3. mutations.js

```js
import * as types from './mutation-types.js;
// mutations是多个mutation的包装，每一个mutation就是一个数据操作方法
const mutations = {
  // mutation的第一个参数为state，当前能获取到的state中的某个state
  // 第二个参数为我们提交mutation所传的payload
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  }
}
export default mutations
```

有了mutation修改数据，那如何将修改后的数据映射回state呢？ 

4. getters.js

```js
export const singer = state => state.singer
```

同步暂时就是这样~

5. store/index.js

```js
import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import state from './state';
import mutations from './mutations';
// 通过mutation修改state时，在控制台打印修改记录
import createLogger from 'vuex/dist/logger';
// 注册vuex
Vue.use(Vuex);
// 
const debug = process.env.NODE_ENV !== 'production';
// 创建store的实例
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,  
  strict: debug,  // 本地调试下开启严格模式
  plugins: debug ? [createLogger()] : []
})
```

### 项目里使用Vuex

main.js

```js
// 省略
import store from './store';

// 省略
new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router
});
```

组件里 singer/singer.vue

```js
// 省略部分代码
import { mapMutations } from 'vuex';

export default {
  data() {
    // ...
  },
  methods: {
    selectSinger(singer) {
      this.$router.push({ path: `/singer/${singer.id}`})
      // 3将数据传入mutation映射的方法名，这样就实现了一个mutation的提交
      this.setSinger(singer)
    }
    // 1省略方法， 在所有方法的最后写这句
    ...mapMutations({
      // 2将mutation的修改映射为一个方法名 (之前导入的常量)
      setSinger: 'SET_SINGER'
    })
  }
}
```

以上操作后，state.singer本来为一个空对象，现在通过 `this.setSinger(singer)`， state.singer就有数据了。


**singer-detail/singer-detail.vue**

```js
// 从state中获取数据的一个语法糖
import {mapGetters} from 'vuex';

export default {
  computed: {
    // 通过该写法扩展到computed计算属性里
    ...mapGetters([
      // 该'singer'对应 store/getters.js里的singer
      'singer'
    ])    
  },
  created() {
    console.log(this.singer);
  }
}
```

