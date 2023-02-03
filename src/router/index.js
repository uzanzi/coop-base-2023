import { createRouter, createWebHistory } from 'vue-router'
import AccueilView from '../views/AccueilView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'accueil',
      component: AccueilView
    },
    {
      path: '/connexion',
      name: 'connexion',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ConnexionView.vue')
    },
    {
      path: '/inscription',
      name: 'inscription',
      component: () => import('../views/InscriptionView.vue')
    },
    {
      path: '/membres',
      name: 'membres',
      component: () => import('../views/MembreView.vue')
    },
    {
      path: '/conversations',
      name: 'conversations',
      component: () => import('../views/ConversationsView.vue')
    },
    {
      path: '/conversation/:id',
      name: 'conversation',
      component: () => import('../views/ConversationView.vue')
    },
    {
      path: '/profil/:id',
      name: 'profil',
      component: () => import('../views/ProfilView.vue')
    }
  ]
})

export default router