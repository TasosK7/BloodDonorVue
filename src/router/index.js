import { createRouter, createWebHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: () => import('../views/WelcomeView.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/applications',
      name: 'applications',
      component: () => import('../views/ApplicationsView.vue'),
    },
    {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginView.vue')
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => import('../views/ProfileView.vue'),
          children: [
            {
              path: '',
              name: 'editetails',
              component: () => import('../views/EditDetailsView.vue'),
              meta: { requiresAuth: true }
            }
            ]
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/RegisterView.vue')
        },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('../views/LogoutView.vue')
    },


  ]
})

export default router