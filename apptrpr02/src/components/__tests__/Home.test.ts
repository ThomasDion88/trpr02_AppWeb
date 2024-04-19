import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Home from '../Home.vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '../../router/routes'
import { useToast } from 'vue-toast-notification'

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

describe('Home', () => {
  it('Sur envoi du formulaire, doit pouvoir naviguer sur la page de mission.', async () => {
    router.push('/')
    await router.isReady()

    const wrapper = mount(Home, {
      global: {
        plugins: [router]
      }
    })

    const routerSpy = vi.spyOn(router, 'push')

    const nameField = wrapper.find('#name');
    await nameField.setValue('test');
    const sendButton = wrapper.find('#sendButton')
    await sendButton.trigger('click')

    expect(routerSpy).toHaveBeenCalledWith('/')
  })


  it("Sur envoi du formulaire, lorsque nom manquant, une erreur s'affiche.", async () => {
    const wrapper = mount(Home);
    const nameInput = wrapper.find('#name');
    await nameInput.setValue('');

    /*const sendButton = wrapper.find('#sendButton')
    await sendButton.trigger('click')

    await wrapper.vm.$nextTick();

    const toast = wrapper.find('[role="alert"]');

    //"v-toast__item v-toast__item--error v-toast__item--bottom-right"

    expect(toast.exists()).toBe(true);

    expect(toast.text()).to.equal('Veuillez entrer un nom de joueur');*/

    /*const useToastSpy = vi.spyOn(Home, 'useToast');

    const form = wrapper.find('form');
    await form.trigger('submit.prevent');

    expect(useToastSpy).toHaveBeenCalled();

    vi.clearAllMocks();*/

    /*const form = wrapper.find('form');
    await form.trigger('submit.prevent');
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Erreur avec le service');*/

    await wrapper.find('#sendButton').trigger('click')
    const toast = wrapper.find('.vue-toast-notification')
    expect(toast.exists()).toBe(true)
  });
})
