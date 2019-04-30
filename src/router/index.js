import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    const publicPages = ['/']
    const authRequired = !publicPages.includes(to.path)
    const loggedIn = localStorage.getItem('token')
    const permissions = JSON.parse(localStorage.getItem('permissions'))
    if (authRequired && !loggedIn) {
      return next('/')
    } else if (to.path === '/log' && permissions.indexOf('operation.view_logrequest') === -1) {
      return next('/')
    }
    next()
  })
  return Router
}
