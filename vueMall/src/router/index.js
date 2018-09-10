import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import list from '@/pages/list'
import detail from '@/pages/detail'
import site from '@/pages/site'
import errorpage from '@/pages/errorpage'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/', 
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/list',
      name: 'list',
      component: list
    },
    {
      path: '/detail/:goodsId',
      name: 'detail',
      component: detail
    },
    {
      path: '/site',
      name: 'site',
      component: site
    },
    {
      path: '*',
      name: 'errorpage',
      component: errorpage
    }
  ]
})
export default router