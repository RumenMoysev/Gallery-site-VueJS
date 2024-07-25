import * as userService from '@/services/userService'
import AddPainting from '@/views/AddPainting.vue'
import EditPainting from '@/views/EditPainting.vue'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import MyProfile from '@/views/MyProfile.vue'
import NotFound from '@/views/NotFound.vue'
import PaintingDetails from '@/views/PaintingDetails.vue'
import PaintingsList from '@/views/PaintingsList.vue'
import Register from '@/views/Register.vue'
import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalized } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: unAuthGuard
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      beforeEnter: unAuthGuard
    },
    {
      path: '/gallery',
      children: [
        {
          path: '',
          name: 'PaintingsList',
          component: PaintingsList
        },
        {
          path: ':id',
          name: 'PaintingDetails',
          component: PaintingDetails
        },
        {
          path: '/add-painting',
          name: 'AddPainting',
          component: AddPainting,
          beforeEnter: adminGuard
        },
        {
          path: ':id/edit-painting',
          name: 'EditPainting',
          component: EditPainting,
          beforeEnter: adminGuard
        }
      ]
    },
    {
      path: '/my-profile',
      name: 'MyProfile',
      component: MyProfile,
      beforeEnter: authGuard
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

async function authGuard(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  await waitForAuth()

  if(!userService.isLoggedIn.value) {
    next('/login')
  } else {
    next()
  }
}

async function unAuthGuard(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  await waitForAuth()

  if(userService.isLoggedIn.value) {
    next('/')
  } else {
    next()
  }
}

async function adminGuard(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  await waitForAuth()

  if(userService.role.value === 'admin') {
    next()
  } else {
    next('/')
  }
}

async function waitForAuth() {
  if (!userService.isLoggedIn.value && document.cookie.includes('userId=')) {
    return await userService.getUser()
  }
}

export default router