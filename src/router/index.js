import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/main'
import rank from '@/components/rank'
import info from '@/components/info'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: main
    },
    {
      path: '/rank',
      name: 'rank',
      component: rank
    },
    {
      path: '/info/:id',
      name: 'info',
      component: info
    }
  ]
})
