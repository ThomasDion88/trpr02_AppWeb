import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ActionButtons from '../ActionButtons.vue'

describe('ActionButtons.vue', () => {

  it('doit émettre l\'événement "action" avec les bons paramètres lors du clic sur le bouton Combattre', async () => {
    const wrapper = mount(ActionButtons)
    await wrapper.find('#combatButton').trigger('click')
    expect(wrapper.emitted('action')[0]).toEqual([true, false, false])
  })

  it('doit émettre l\'événement "action" avec les bons paramètres lors du clic sur le bouton Terminer la mission', async () => {
    const wrapper = mount(ActionButtons)
    await wrapper.find('#nextButton').trigger('click')
    expect(wrapper.emitted('action')[0]).toEqual([false, true, false])
  })

  it('doit émettre l\'événement "action" avec les bons paramètres lors du clic sur le bouton Terminer la mission et réparer le vaisseau', async () => {
    const wrapper = mount(ActionButtons)
    await wrapper.find('#repairAndNextButton').trigger('click')
    expect(wrapper.emitted('action')[0]).toEqual([false, false, true])
  })
})
