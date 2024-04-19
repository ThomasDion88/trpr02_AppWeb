import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import EnemyStats from '../EnemyStats.vue'

describe('EnemyStats.vue', () => {
  it('doit afficher les informations de l\'ennemi correctement a 100 de vie', () => {
    const wrapper = mount(EnemyStats, {
      props: {
        currentEnemy: {
          name: 'Luke Skywalker',
          ship: { name: 'Solar Sailer', vitality: 100 },
        },
        enemy: {
          experience: 'Maître',
          health: 100,
          credits: 495,
        }
      }
    })

    expect(wrapper.text()).toContain('Luke Skywalker')
    expect(wrapper.text()).toContain('Maître')
    expect(wrapper.text()).toContain('495 GC')
    expect(wrapper.text()).toContain('Solar Sailer')
    expect(wrapper.find('.w3-container').attributes('style')).toContain('height: 20px; width: 100%')
  })

  it('doit afficher les informations de l\'ennemi correctement a 77 de vie', () => {
    const wrapper = mount(EnemyStats, {
      props: {
        currentEnemy: {
          name: 'Thomas Dion',
          ship: { name: 'Solar Sailer', vitality: 77 },
        },
        enemy: {
          experience: 'Maître',
          health: 77,
          credits: 95,
        }
      }
    })

    expect(wrapper.text()).toContain('Thomas Dion')
    expect(wrapper.text()).toContain('Maître')
    expect(wrapper.text()).toContain('95 GC')
    expect(wrapper.text()).toContain('Solar Sailer')
    expect(wrapper.find('.w3-container').attributes('style')).toContain('height: 20px; width: 77%')
  })

  it('doit afficher les informations de l\'ennemi correctement a 0 de vie', () => {
    const wrapper = mount(EnemyStats, {
      props: {
        currentEnemy: {
          name: 'Matis Bergeron',
          ship: { name: 'Solar Sailer', vitality: 0 },
        },
        enemy: {
          experience: 'Maître',
          health: 0,
          credits: 95,
        }
      }
    })

    expect(wrapper.text()).toContain('Matis Bergeron')
    expect(wrapper.text()).toContain('Maître')
    expect(wrapper.text()).toContain('95 GC')
    expect(wrapper.text()).toContain('Solar Sailer')
    expect(wrapper.find('.w3-container').attributes('style')).toContain('height: 20px; width: 0%')
  })
})

