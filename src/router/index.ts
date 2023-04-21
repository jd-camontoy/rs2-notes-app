import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Notes',
      component: HomeView,
      beforeEnter: (to, from, next) => {
        const isAuthenticated = localStorage.getItem('user');
        if (isAuthenticated) {
          next()
        } else {
          next('/login');
        }
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
      beforeEnter: (to, from, next) => {
        const isAuthenticated = localStorage.getItem('user');
        if (isAuthenticated) {
          next('/')
        } else {
          next();
        }
      }
    },
    
    {
      path: '/register',
      name: 'Register',
      component: RegisterView,
      beforeEnter: (to, from, next) => {
        const isAuthenticated = localStorage.getItem('user');
        if (isAuthenticated) {
          next('/')
        } else {
          next();
        }
      }
    }
    // {
    //   path: '/login',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
