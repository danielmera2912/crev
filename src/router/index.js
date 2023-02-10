import { createRouter, createWebHistory } from 'vue-router'
import PartidosUnicos from '../views/PartidosUnicosView.vue'
import Ligas from '../views/PartidosUnicosView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PartidosUnicos
    },
    {
      path: '/perfil',
      name: 'perfil',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/partido_detalles',
      name: 'partido_detalles',
      component: () => import('../views/PartidoDetallesView.vue')
    }
  ]
})

export default router
