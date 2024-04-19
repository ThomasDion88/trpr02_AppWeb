# Revue de code - Semaine 2

## Découpage du code

Le code fut formatté et découpé au travers de nouveaux composants qui représentent tous une partie de la mission, par exemple. 
On voit donc apparaître, en tout, les composants:

* Home
* Score
* Game, qui contient:
    * ActionButton
    * MissionDisplay
    * PlayerStats
    * EnemyStats

***Le code est donc correctement découpé et l'utilisation des composants est importante pour les tests.***

## Game.vue et le fonctionnement du jeu

Le fonctionnement du jeu est situé dans le composant Game. On y retrouve, en autres;

* Les constantes, definitions de props et emits
* Les appels au GameService pour aller chercher, par exemple, les 5 ennemis d'une partie
* Les fonctions de combats et de logique de jeu

::: tip
Certaines fonctions auraient pu mériter un peu de commentaires afin de clarifier leur code.
Certaines d'entre elles sont plutôt longues. Ce sont toutefois des cas rares.
:::

*Par exemple, la fonction repairAndNext :*
```js{4}
  const repairAndNext = async () => {
    const healthMissing = 100 - player.value.health
    const totalRepairCost = 5 * healthMissing

    if(player.value.credits > 0) {
      if (player.value.credits >= totalRepairCost) {
        player.value.health = 100
        player.value.credits -= totalRepairCost
        useToast().info(
          `Vaisseau entièrement réparé. ${totalRepairCost.toFixed(2)} crédits ont été utilisés.`,
          { duration: 6000 }
        )
      } else {
        const maxHealthPossible = Math.floor(player.value.credits / 5)
        const healthToRestore = Math.min(healthMissing, maxHealthPossible)
        const repairCost = 5 * healthToRestore

        player.value.health += healthToRestore
        player.value.credits -= repairCost

        useToast().info(
          `Vaisseau partiellement réparé. ${repairCost.toFixed(2)} crédits ont été utilisés pour restaurer ${healthToRestore} % de santé.`,
          { duration: 6000 }
        )
      }
    } else {
      useToast().info(
        `Pas assez de crédits pour réparer le Vaisseau.`,
        { duration: 6000 }
      )
    }

    nextMission()
  }
```

::: info
Il est important de noter que la gestion d'erreur est faite et fonctionne bien.
:::

***L'affichage de messages et d'alertes lors d'actions ou d'évènements dans le jeu est bien faite et informe le joueur en tout temps.***

##

# Les tests:

La réalisation des tests fut réalisée avec l'objectif de tester tous les comportements de l'application.

## Les tests de mission

Les tests de la mission, ou du jeu en tant que tel, sont bien réapartis au travers des 4 fichiers qui testent chacun un composant.

**L'affichage du numéro de mission (MissionDisplay.test.ts):**

```js{4}
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
```

Ils sont également clairs et ils testent directement le comportement du jeu

*Comme, par exemple, les stats du joueur et de l'ennemi en cours;*

**PlayerStats.test.ts** 
```js{4}
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
```
**EnemyStats.test.ts**
```js{4}
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
```
##
### Les tests sont solides, respectent les standards de programmation et vérifient les comportements attendus.

*Un autre exemple de test de comportement ici, lorsque que l'on teste si les boutons d'actions "émittent" les évènements:*

```js{4}
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
```

## Attention
::: tip
Le test des scores n'utilise pas de props afin de tester si la liste s'affiche, il aurait fallu aller 'fetch dans la view'
et passer la liste des scores à notre component pour qu'on puisse établir les props dans nos tests, mais après plusieurs tentives,
cela ne fonctionnait pas. Ainsi, ici, on teste la structure de la liste des scores au lieu des données en tant que tel.
:::
```js{4}
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

    const scoreList = wrapper.findAll('#ranking')
    expect(scoreList.length).toBeGreaterThan(0)

    expect(scoreList[0].text()).toContain('1 -')
    expect(scoreList[0].text()).toContain('CG')
  })
})
```

##
Auteur: Thomas Dion