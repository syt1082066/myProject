// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/common.css'

import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)

import AMap from 'vue-amap';
Vue.use(AMap);
 
// 初始化vue-amap
AMap.initAMapApiLoader({
  // 申请的高德key
  key: '1c943619083f9511c306657f9b6a1049',
  // 插件集合
  plugin: ['AMap.PlaceSearch', 'AMap.Geolocation']
});


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
