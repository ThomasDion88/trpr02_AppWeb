import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import ScoreView from '../Score.vue';

describe('ScoreView Component', () => {
    let wrapper: any

    beforeEach(() => {
        wrapper = mount(ScoreView)
    })

    afterEach(() => {
        wrapper.unmount()
    })

  it('affiche les scores correctement', async () => {
    // Sources : https://vuejs.org/api/general.html + ChatGPT. Pour s'assurer que les tests sont synchronisés avec le cycle de mise à jour de Vue
    await wrapper.vm.$nextTick()
    // Sources : https://developer.mozilla.org/en-US/docs/Web/API/setTimeout + ChatGPT. Cette ligne ajoute un delais permettant a notre composant de bien se charger.
    await new Promise(r => setTimeout(r, 2000))

    expect(wrapper.find('#score-container').exists()).toBe(true)

    const scoreItems = wrapper.findAll('#ranking')
    expect(scoreItems.length).toBeGreaterThan(0)

    expect(scoreItems[0].text()).toContain('1 -')
    expect(scoreItems[0].text()).toContain('CG')
  })
})

