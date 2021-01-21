import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import store from "@/store";

Vue.use(VueRouter)

function isLoggedIn(to, from, next) {
  store.dispatch('auth/authenticate').then(() => {
    next();
  }).catch(() => {
    next('/signin');
  });
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    // meta: { auth: true, },
    beforeEnter: isLoggedIn,
  },
  {
    path: '/boards',
    name: 'Boards',
    component: () => import('@/views/Boards.vue'),
    //meta: { auth: true, },
    beforeEnter: isLoggedIn,
  },
  {
    path: '/boards/:id',
    name: 'Board',
    component: () => import('@/views/Board.vue'),
    // meta: { auth: true, },
    beforeEnter: isLoggedIn,
    props: true
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('@/views/SignUp.vue'),
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import('@/views/SignIn.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes
})

// router.beforeEach((to, from, next) => {
//   const isAuthenticated = store.getters['auth/isAuthenticated']
//   const requiredAuth = to.matched.some(record => record.meta.auth)
//   if (requiredAuth && !isAuthenticated) {
//     next('/signin')
//   } else {
//     next()
//   }
// })

export default router
