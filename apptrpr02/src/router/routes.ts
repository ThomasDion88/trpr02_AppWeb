import type { RouteRecordRaw } from 'vue-router'
import PostsView from '../views/PostsView.vue'

const routes: Array<RouteRecordRaw> = [
    {
      // Route par défaut
      // La route / est associé au composant PostsView. C'est ce composant qui est chargé quand l'utilisateur navigue vers la page principale de l'application.
      path: '/',
      name: 'Posts',
      component: PostsView
    },
    {
      // Route de page "à propos"
      // Un import dynamique permet de charger un composant uniquement quand il est nécessaire. Si l'utilisateur n'a pas besoin de la page About, alors le composant AboutView ne sera pas chargé. Cela permet d'optimiser le temps de chargement de l'application.
      path: '/about',
      name: 'About',
      component: () => import('../views/AboutView.vue')
    },
    {
      // Route qui affiche le détail d'un post identifié par son id.
      // Dans la propriété path, on peut utiliser un paramètre dynamique pour capturer une partie d'une chaîne de caractères de l'url et éventuellement utiliser sa valeur dans l'application. Par exemple, dans 'path: '/user/:id', le paramètre dynamique id sera égal à la partie de l'url qui suit /user/. Donc, si l'url est /user/123, alors le paramètre id sera égal à 123.
      // La propriété props définie à vrai autorise le passage de paramètres au composant associé à la route. On autorise donc ici le passage du paramètre id au composant PostDetailView.
      path: '/posts/:id',
      name: 'PostDetail',
      component: () => import('../views/PostDetailView.vue'),
      props: true
    },
    {
      // Route 404
      // Dans l'exemple ci-dessous, le paramètre dynamique pathMatch est égal à la partie de l'url qui suit le caractère /. Par exemple, si l'url est /foo, alors le paramètre pathMatch sera égal à foo. L'expression régulière (.*)* qui suit le paramètre dynamique correspond à n'importe quel caractère. Donc, '/:pathMatch(.*)*' correspond à n'importe quel chemin de l'URL. C'est la façon dont on définit une route 404 dans Vue.js.
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
  
  export default routes