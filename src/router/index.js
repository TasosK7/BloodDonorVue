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
      component: () => import('../views/ChangedDetailsView.vue'),
    },
    {
      path: '/approveApplications',
      name: 'approveApplications',
      component: () => import('../views/ApproveApplicationsView.vue'),

    },
    {
      path: '/applicationsDetails/:id',
      name: 'applicantDetails',
      component: () => import('../views/ApplicantDetailsView.vue')
    },
    {
      path: '/approved',
      name: 'approved',
      component: () => import('../views/ApprovedView.vue')
    },
    {
      path: '/rejected',
      name: 'rejected',
      component: () => import('../views/RejectedView.vue')
    },
    {
      path: '/showUsers',
      name: 'showUsers',
      component: () => import('../views/ShowUsersView.vue')
    },
    {
      path: '/userDetails',
      name: 'userDetails',
      component: () => import('../views/UserDetailsView.vue')
    },
    {
      path: '/userDeleted',
      name: 'userDeleted',
      component: () => import('../views/DeletedUserView.vue')
    },
    {
      path: '/userUpdated',
      name: 'userUpdated',
      component: () => import('../views/UpdatedUserView.vue')
    },
    {
      path: '/createUsers',
      name: 'createUsers',
      component: () => import('../views/CreateUserView.vue')
    },
    {
      path: '/createCitizen',
      name: 'createCitizen',
      component: () => import('../views/CreateCitizenView.vue')
    },
    {
      path: '/completeCitizen:id',
      name: 'completeCitizen',
      component: () => import('../views/CompleteCitizenView.vue')
    },
    {
      path: '/createSecretary',
      name: 'createSecretary',
      component: () => import('../views/CreateSecretaryView.vue')
    },
    {
      path: '/creationSuccess',
      name: 'creationSuccess',
      component: () => import('../views/CreationSuccessView.vue')
    }



  ]
})

export default router