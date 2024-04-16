
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Score from '../Score.vue'
import * as gameService from '../../scripts/services/gameService'

vi.mock('../scripts/services/gameService', () => ({
    fetchAllScores: vi.fn()
}))

describe('Score.vue', () => {
    beforeEach(async () => {
        gameService.fetchAllScores.mockResolvedValue([
            { name: 'Joueur 1', score: 300 },
            { name: 'Joueur 2', score: 200 }
        ])
        const wrapper = mount(Score)
        await wrapper.vm.$nextTick()
    })

    it('doit afficher les scores dans lordre décroissant', () => {
        const wrapper = mount(Score)
        const items = wrapper.findAll('li.list-group-item')
        expect(items[0].text()).toContain('1 - Joueur 1 - 300CG')
        expect(items[1].text()).toContain('2 - Joueur 2 - 200CG')
    })

    it('doit gérer correctement une erreur lors de la récupération des scores', async () => {
        gameService.fetchAllScores.mockRejectedValue(new Error('Erreur réseau'))
        const wrapper = mount(Score)
        await wrapper.vm.$nextTick()
        expect(wrapper.text()).toContain('Impossible daccéder aux scores.')
    })
})
