
const routes = [
  {
    path: '/',
    component: () => import('layouts/base.vue'),
    children: [
      { path: '', component: () => import('pages/login.vue') }
    ]
  },
  {
    path: '/home',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Home.vue') }
    ]
  },
  {
    path: '/log',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Log.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
