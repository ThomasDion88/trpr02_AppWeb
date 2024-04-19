import type { RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MissionView from '../views/MissionView.vue'
import ScoreView from '../views/ScoreView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const routes: Array<RouteRecordRaw> = [
    {
      path: '/',
      name: 'Accueil',
      component: HomeView
    },
    {
      path: '/mission/:playerName/:shipId',
      name: 'Mission',
      component: MissionView,
      props: true
    },
    {
      path: '/score',
      name: 'Score',
      component: ScoreView
    },
    {
      // Route 404
      // Dans l'exemple ci-dessous, le paramètre dynamique pathMatch est égal à la partie de l'url qui suit le caractère /. Par exemple, si l'url est /foo, alors le paramètre pathMatch sera égal à foo. L'expression régulière (.*)* qui suit le paramètre dynamique correspond à n'importe quel caractère. Donc, '/:pathMatch(.*)*' correspond à n'importe quel chemin de l'URL. C'est la façon dont on définit une route 404 dans Vue.js.
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundView
    }
  ]
  
  export default routes