import { createRouter, createWebHistory } from 'vue-router'
import PartidosUnicos from '../views/PartidosUnicosView.vue'
//import Ligas from '../views/PartidosUnicosView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PartidosUnicos
    },
    {
      path: '/perfil/:id',
      name: 'perfil',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/partido_detalles/:id',
      name: 'partido_detalles',
      component: () => import('../views/PartidoDetallesView.vue')
    }
  ]
})

export default router
