import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// const recommend = (resolve) => require(['../components/recommend/recommend'], resolve)
// const disc = (resolve) => require(['../components/disc/disc'], resolve)
const recommend = resolve => {
  import('components/recommend/recommend').then(module => {
    resolve(module)
  })
}
const disc = resolve => {
  import('components/disc/disc').then(module => {
    resolve(module)
  })
}



const singer = resolve => {
  import('components/recommend/recommend').then(module => {
    resolve(module)
  })
}
const rank = resolve => {
  import('components/recommend/recommend').then(module => {
    resolve(module)
  })
}
const search = resolve => {
  import('components/recommend/recommend').then(module => {
    resolve(module)
  })
}
const user = resolve => {
  import('components/user/user').then(module => {
    resolve(module)
  })
}
// const recommend = (resolve) => require(['../components/recommend/recommend'], resolve)
// const disc = (resolve) => require(['../components/disc/disc'], resolve)
// const singer = (resolve) => require(['../components/singer/singer'], resolve)
// const singerDetail = (resolve) => require(['../components/singer-detail/singer-detail'], resolve)
// const rank = (resolve) => require(['../components/rank/rank'], resolve)
// const topList = (resolve) => require(['../components/top-list/top-list'], resolve)
// const search = (resolve) => require(['../components/search/search'], resolve)
// const user = (resolve) => require(['../components/user/user'], resolve)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/recommend',
      name: 'recommend',
      component: recommend,
      children: [
        {
          path: ':id',
          component: disc
        }
      ]
    },
    {
      path: '/singer',
      name: 'singer',
      component: singer,
      children: [
        {
          path: ':id',
          // component: singerDetail
        }
      ]
    },
    {
      path: '/rank',
      name: 'rank',
      component: rank,
      children: [
        {
          path: ':id',
          // component: topList
        }
      ]
    },
    {
      path: '/search',
      name: 'search',
      component: search,
      children: [
        {
          path: ':id',
          // component: singerDetail
        }
      ]
    },
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '*',
      redirect: '/recommend'
    }
  ]
})
