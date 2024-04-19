import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes' // Importe le tableau de routes par défaut

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
