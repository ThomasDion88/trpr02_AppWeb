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

describe('Home.vue', () => {
    it('Sur envoi du formulaire, doit pouvoir naviguer sur la page de mission.', async () => {
        router.push('/')
        await router.isReady()

        const wrapper = mount(Home, {
            global: {
                plugins: [router]
            }
        })

        const routerSpy = vi.spyOn(router, 'push')

        const sendButton = wrapper.find('#sendButton')
        await sendButton.trigger('click')

        expect(routerSpy).toHaveBeenCalledWith('/')
    })


    it("Sur envoi du formulaire, lorsque nom manquant, une erreur s'affiche.", async () => {
        const wrapper = mount(Home);

        const nameInput = wrapper.find('#name');
        await nameInput.setValue('');

        const form = wrapper.find('form');
        await form.trigger('submit.prevent');

        const toast = wrapper.findComponent({ name: 'VueToastification' }); 
        expect(toast.exists()).to.be.true;

        expect(toast.text()).to.equal('Veuillez entrer un nom de joueur');
    });
})

/*
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Home from '../Home.vue'
import { fetchAllShips } from '../../scripts/services/gameService'

vi.mock('../scripts/services/gameService', () => ({
  fetchAllShips: vi.fn()
}))

describe('Home.vue', () => {
  it('doit soumettre le formulaire avec les bonnes données', async () => {
    fetchAllShips.mockResolvedValue([{ id: 1, name: 'Vaisseau A' }])
    const wrapper = mount(Home)
    await wrapper.setData({
      playerName: 'Test Player',
      selectedShipId: '1'
    })
    wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.emitted('formSubmitted')[0]).toEqual([true, 'Test Player', 1])
  })

  it('doit peupler la liste déroulante avec les vaisseaux récupérés', async () => {
    fetchAllShips.mockResolvedValue([{ id: 1, name: 'Vaisseau A' }, { id: 2, name: 'Vaisseau B' }])
    const wrapper = mount(Home)
    await wrapper.vm.$nextTick()
    const options = wrapper.findAll('select#ship option')
    expect(options.length).toBe(2)
    expect(options[0].text()).toBe('Vaisseau A')
    expect(options[1].text()).toBe('Vaisseau B')
  })
})*/

