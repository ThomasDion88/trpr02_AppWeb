import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MissionDisplay from '../MissionDisplay.vue'

describe('MissionDisplay.vue', () => {
  it('doit afficher les informations de mission correctement', () => {
    const wrapper = mount(MissionDisplay, {
      props: {
        currentMission: 3,
        totalMissions: 5
      }
    })

    const missionInfo = wrapper.find('#missionDisplay').text()
    expect(missionInfo).toContain('Mission en cours 3 / 5')
  })
})