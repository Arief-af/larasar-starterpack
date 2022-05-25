
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'index', meta: {requiresAuth: true} , component: () => import('pages/Index.vue') },
      { path: '/login', name: 'Login', meta: {requiresAuth: false, guest: true} , component: () => import('pages/auth/Login.vue') },
      { path: '/register', name: 'Register', meta: {requiresAuth: false, guest: true} , component: () => import('pages/auth/Register.vue') },
      { path: '/table', name: 'Table', component: () => import('pages/Table.vue') },
      { path: '/table/:id', name: 'Table params', meta: {requiresAuth: true} , component: () => import('pages/Table.vue') }
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
