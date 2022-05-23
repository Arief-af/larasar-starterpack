
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'index', meta: {requiresAuth: true} , component: () => import('pages/Index.vue') },
      { path: '/login', name: 'Login', meta: {requiresAuth: false} , component: () => import('pages/auth/Login.vue') },
      { path: '/register', name: 'Register', meta: {requiresAuth: false} , component: () => import('pages/auth/Register.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
