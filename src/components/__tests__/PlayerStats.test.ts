import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PlayerStats from '../PlayerStats.vue'

describe('PlayerStats.vue', () => {
  it('doit afficher les informations du joueur correctement a 100 de vie', () => {
    const wrapper = mount(PlayerStats, {
      props: {
        playerName: 'Matis',
        player: {
          experience: 'Expérimenté',
          health: 100,
          credits: 150
        },
        selectedShip: {
          name: 'Oiseau'
        }
      }
    })

    expect(wrapper.text()).toContain('Matis')
    expect(wrapper.text()).toContain('Expérimenté')
    expect(wrapper.text()).toContain('150 GC')
    expect(wrapper.text()).toContain('Oiseau')
    expect(wrapper.find('.w3-container').attributes('style')).toContain('height: 20px; width: 100%')
  })
  it('doit afficher les informations du joueur correctement a 77 de vie', () => {
    const wrapper = mount(PlayerStats, {
      props: {
        playerName: 'Thomas',
        player: {
          experience: 'Expérimenté',
          health: 77,
          credits: 90
        },
        selectedShip: {
          name: 'Oiseau'
        }
      }
    })

    expect(wrapper.text()).toContain('Thomas')
    expect(wrapper.text()).toContain('Expérimenté')
    expect(wrapper.text()).toContain('90 GC')
    expect(wrapper.text()).toContain('Oiseau')
    expect(wrapper.find('.w3-container').attributes('style')).toContain('height: 20px; width: 77%')
  })
  it('doit afficher les informations du joueur correctement a 0 de vie', () => {
    const wrapper = mount(PlayerStats, {
      props: {
        playerName: 'Vador',
        player: {
          experience: 'Expérimenté',
          health: 0,
          credits: 200
        },
        selectedShip: {
          name: 'Oiseau'
        }
      }
    })

    expect(wrapper.text()).toContain('Vador')
    expect(wrapper.text()).toContain('Expérimenté')
    expect(wrapper.text()).toContain('200 GC')
    expect(wrapper.text()).toContain('Oiseau')
    expect(wrapper.find('.w3-container').attributes('style')).toContain('height: 20px; width: 0%')
  })
})
