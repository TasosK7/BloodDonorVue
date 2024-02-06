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
      path: '/createNewApplication',
      name: 'createNewApplication',
      component: () => import('../views/CreateApplicationView.vue')
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

        },
    {
      path: '/editDetails',
      name: 'editDetails',
      component: () => import('../views/EditDetailsView.vue')
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
    {
    path: '/thankyou',
    name: 'thankyou',
    component: () => import('../views/ThankYouView.vue')
     },
    {
      path: '/changedDetails',
      name: 'changedDetails',
      component: () => import('../views/ChangedDetailsView.vue')
    },



  ]
})

export default router