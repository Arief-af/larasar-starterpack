
const routes = [
  {
    path: '/app',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        name: 'calendar', 
        path: '/calendar',
        meta: {requiresAuth: true}, 
        component: () => import('pages/Calendar.vue') },
      { 
        name: 'home', 
        path: '/home',
        meta: {requiresAuth: true}, 
        component: () => import('pages/Home.vue') },
      { 
        name: 'library', 
        path: '/library',
        meta: {requiresAuth: true}, 
        component: () => import('pages/Library.vue') }
    ]
  },
  {
    path: '/',
    name: 'welcome',
    meta: {requiresAuth: false},
    component: () => import('pages/Welcome.vue')
  },
  {
    path: '/Register',
    name: 'Register',
    meta: {requiresAuth: false},
    component: () => import('pages/Auth/Register.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    meta: {requiresAuth: false},
    component: () => import('pages/Auth/Login.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
