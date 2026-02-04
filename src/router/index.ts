import { createRouter, createWebHistory } from 'vue-router'
import CharacterListView from '@/views/CharacterListView.vue'
import CharacterDetailView from '@/views/CharacterDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'character-list',
      component: CharacterListView
    },
    {
      path: '/character/:id',
      name: 'character-detail',
      component: CharacterDetailView,
      props: true
    }
  ]
})

export default router
