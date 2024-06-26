import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Home from '../Home.vue'

describe('Home', () => {
  it('Sur envoi du formulaire, les informations du formulaire sont correctement emit', async () => {
    const wrapper = mount(Home)
    
    wrapper.vm.playerName = 'Thomas'
    wrapper.vm.selectedShipId = 1

    const form = wrapper.find('form')
    await form.trigger('submit.prevent')

    const formSubmittedEvents = wrapper.emitted('formSubmitted')
    expect(formSubmittedEvents).toHaveLength(1)
    expect(formSubmittedEvents![0]).toEqual([true, 'Thomas', 1])
  })

  it('change entrée de nameInput lorsque l\'utilisateur entre son nom', async () => {
    const wrapper = mount(Home)

    const nameInput = wrapper.find('#name')
    await nameInput.setValue('Thomas')
    expect(wrapper.vm.playerName).toBe('Thomas')
  })
})
