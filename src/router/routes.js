import { routeNames } from './constants.js'

export const routes = [
  {
    path: '/auth',
    name: routeNames.auth,
    redirect: { name: routeNames.signIn },
    component: () => import('../layouts/AuthLayout.vue'),
    children: [
      {
        path: 'sign-in',
        name: routeNames.signIn,
        component: () => import('../views/SignIn/SignIn.vue'),
        meta: {
          isAuthOptional: true
        }
      },
      {
        path: 'sign-up',
        name: routeNames.signUp,
        component: () => import('../views/SignUp/SignUp.vue'),
        meta: {
          isAuthOptional: true
        }
      }
    ]
  },
  {
    path: '/dashboard',
    alias: '/',
    name: routeNames.dashboard,
    component: () => import('../views/UserDashboard/UserDashboard.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: routeNames.unknown,
    redirect: '/'
  }
]
