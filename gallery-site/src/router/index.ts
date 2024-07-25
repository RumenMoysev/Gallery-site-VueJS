import AddPainting from '@/views/AddPainting.vue'
import EditPainting from '@/views/EditPainting.vue'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import PaintingDetails from '@/views/PaintingDetails.vue'
import PaintingsList from '@/views/PaintingsList.vue'
import Register from '@/views/Register.vue'
import { createRouter, createWebHistory } from 'vue-router'

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
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
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
          component: AddPainting
        },
        {
          path: ':id/edit-painting',
          name: 'EditPainting',
          component: EditPainting
        }
      ]
    }
  ]
})

export default router