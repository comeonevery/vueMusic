// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import scroll from './base/scroll'
import slider from './base/slider'
import loading from './base/loading'
import VueLazyload from 'vue-lazyload'
import noResult from './base/no-result'
import switches from './base/switches'
import songList from './base/song-list'
import progressBar from './base/progress-bar'
import progressCircle from './base/progress-circle'
import searchBox from './base/search-box'
import topTip from './base/top-tip'
import confirm from './base/confirm'
import router from './router'

import './common/scss/index.scss'
//引入REM
import './assets/js/rem.js'

Vue.use(slider)
Vue.use(scroll)
Vue.use(loading)
Vue.use(noResult)
Vue.use(switches)
Vue.use(songList)
Vue.use(progressBar)
Vue.use(progressCircle)
Vue.use(topTip)
Vue.use(confirm)
Vue.use(searchBox)

Vue.config.productionTip = false
Vue.use(VueLazyload, {
  loading: require('./common/image/default.png')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
