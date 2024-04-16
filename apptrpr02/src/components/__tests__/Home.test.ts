import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Home from '../Home.vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '../../router/routes'

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

describe('Home', () => {
  it('Sur envoi du formulaire, doit pouvoir naviguer sur la page de mission.', async () => {
    router.push('/') // S'assurer de commencer avec une route connue
    await router.isReady() // Attendre que le routeur soit prêt

    const wrapper = mount(Home, {
      global: {
        plugins: [router]
      }
    })

    const routerSpy = vi.spyOn(router, 'push')

    // Trouver le lien par son texte et simuler un clic
    const sendButton = wrapper.find('#sendButton') // Adapter le sélecteur selon ton besoin
    await sendButton.trigger('click')

    expect(routerSpy).toHaveBeenCalledWith('/')
  })


  /*it("Sur envoi du formulaire, lorsque nom manquant, une erreur s'affiche.", async () => {
    const wrapper = mount(Home);

    const nameInput = wrapper.find('#name');
    await nameInput.setValue('');

    const form = wrapper.find('form');
    await form.trigger('submit.prevent');

    const toast = wrapper.findComponent({ name: 'VueToastification' }); // Assuming toast is a Vue component
    expect(toast.exists()).to.be.true;

    // Assert the toast message content
    expect(toast.text()).to.equal('Veuillez entrer un nom de joueur');
  });*/
})
