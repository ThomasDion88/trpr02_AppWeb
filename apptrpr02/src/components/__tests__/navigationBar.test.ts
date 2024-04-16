import { describe, afterEach, expect, vi, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '../../router/routes'
import NavigationBar from '../NavigationBar.vue'

// Configuration du router identique à ton exemple original
const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

// Vue Test Utils permet de monter le composant avec le contexte du routeur
describe('NavigationBar.vue', () => {

  it('Doit pouvoir naviguer sur la page de accueil.', async () => {
    router.push('/') // S'assurer de commencer avec une route connue
    await router.isReady() // Attendre que le routeur soit prêt

    const wrapper = mount(NavigationBar, {
      global: {
        plugins: [router]
      }
    })

    const routerSpy = vi.spyOn(router, 'push')

    // Trouver le lien par son texte et simuler un clic
    const linkHomeEl = wrapper.find('#accueil') // Adapter le sélecteur selon ton besoin
    await linkHomeEl.trigger('click')

    expect(routerSpy).toHaveBeenCalledWith('/')
  })

  it('Doit pouvoir naviguer sur la page des scores.', async () => {
    router.push('/') // Reset la route au début de chaque test
    await router.isReady()

    const wrapper = mount(NavigationBar, {
      global: {
        plugins: [router]
      }
    })

    const routerSpy = vi.spyOn(router, 'push')

    const linkScoreEl = wrapper.find('#score') // Adapter le sélecteur selon ton besoin
    await linkScoreEl.trigger('click')

    expect(routerSpy).toHaveBeenCalledWith({ name: 'Score' })
  })
})
