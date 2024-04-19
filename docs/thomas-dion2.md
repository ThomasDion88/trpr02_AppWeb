# Revue de code - Semaine 2

## Structure et Organisation

La structure du script est très bien divisé en fonctions, qui ont chacune leur responsabilité spécifique, ce qui respect le SRP (Single Responsability Principle) et rend le code plus compréhensible.

**Code montrant ce principe :**

```js{4}
const scoreData = async () => {
  try {
    const fetchedScores = await fetchAllScores()
    scores.value = fetchedScores
    sortScores()
  } catch (error) {
    useToast().error(
      `Erreur avec le service: ${(error as Error).message}. Est-ce que vous avez démarré le backend localement ?`,
      { duration: 6000 }
    )
    scores.value = []
  }
}

const sortScores = async () => {
  scores.value = scores.value.sort((a, b) => b.score - a.score)

  scores.value.forEach((score, rank) => {
    scoreMap.set(rank + 1, score)
  })
}
```

## Utilisation des Fonctionnalités de Vue.js

La fonction qui se trouve dans le `onMounted` est exécuté automatiquement après que le composant soit entièrement monté dans le DOM, ce qui est le moment idéal pour exécuter des opérations initiales telles que le chargement de données. Ceci est plus efficace et clair que d'appeler manuellement la fonction dans le code comme ce qui avait été fait avant.

**Voici le code représentant ces fonctionnalités :**

```js{4}
//Avant :
const scoreData = async () => {
  try {
    const fetchedScores = await fetchAllScores()
    scores.value = fetchedScores
  } catch (error) {
    scores.value = null
  }
}
scoreData()

// Après
import { onMounted, ref } from 'vue'

onMounted(() => {
  scoreData()
})

```

## Structure de Test Bien Organisée

Utilisation de beforeEach et afterEach pour monter et démonter le composant, assurant que chaque test démarre correctement.

```js{4}
beforeEach(() => {
    wrapper = mount(ScoreView);
});

afterEach(() => {
    wrapper.unmount();
});
```

## Tests de Home complets

Toutes les possibilités dans ce composant sont testé. La seule chose qui n'est pas testé est le Toast, qui n'est pas un composant que nous avons codé.

```js{4}
it('Sur envoi du formulaire, les informations du formulaire sont correctement emit')
it('change entrée de nameInput lorsque l\'utilisateur entre son nom')
```

## Vérification Complète des Événements Émis

Chaque test vérifie non seulement que l'événement est émis, mais aussi que les données émises sont correctes, ce qui assure que les interactions de l'utilisateur sont correctement gérées.

```js{4}
expect(formSubmittedEvents[0]).toEqual([true, 'Thomas', 1]);
```

Auteur: Matis Bergeron
