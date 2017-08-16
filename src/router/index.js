import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/recommend/recommend'
import Singer from 'components/singer/singer'
import SingerDetail from 'components/singer-detail/singer-detail'
import Rank from 'components/rank/rank'
import Search from 'components/search/search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      name: 'recommend',
      path: '/recommend',
      component: Recommend
    },
    {
      name: 'singer',
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      name: 'rank',
      path: '/rank',
      component: Rank
    },
    {
      name: 'search',
      path: '/search',
      component: Search
    }
  ]
})
