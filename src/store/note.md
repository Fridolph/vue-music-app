编写 Vuex 的步骤：

创建 store 文件夹，并建立以下文件

* actions.js          异步修改数据通常放到actions里
* getters.js          一层封装，通过getters获取数据到组件中
* index.js            把store初始化，入口
* mutation-type.js    mutations的一些字符串常量
* mutations.js        定义要修改的操作(同步)
* state.js            存放所有的状态