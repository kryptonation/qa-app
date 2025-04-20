import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Feedback from '../views/Feedback.vue'
import ViewFeedback from '../views/ViewFeedback.vue'
import Login from '../views/Login.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/feedback',
    name: 'Feedback',
    component: Feedback
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/view',
    name: 'ViewFeedback',
    component: ViewFeedback,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated')
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router 