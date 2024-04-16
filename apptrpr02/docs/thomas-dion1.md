# Revu de code - Semaine 1

## Formulaire

La structure du formulaire est bien définie avec des balises HTML et des attributs Vue.js, ce qui facilite la manipulation des données. 

**Code du formulaire :**

```js{4}
<form action="" method="POST" @submit.prevent="handleSubmit">

    <div class="form-group">
        <label for="name">Votre nom:</label>
        <input type="text" v-model="playerName" id="name" class="form-control">
    </div>

    <div class="form-group">
        <label for="ship">Votre vaisseau:</label>
        <select v-model="selectedShipId" id="ship" class="form-control">
            <option v-for="ship in ships" :value="ship.id">{{ ship.name }}</option>
        </select>
    </div>

    <div class="text-center">
        <button type="submit" class="btn btn-primary">Débuter la partie</button>
    </div>

</form>
```

## Gestion d'erreur

 Le bloc try-catch est utilisé pour gérer les erreurs potentielles lors de la récupération des scores. C'est important pour éviter que l'application plante en cas d'erreur et permettre à d'avoir un message personnalisé selon le type d'erreur.

**Voici un exemple de gestion d'erreur :**

```js{4}
const scores = ref<Score[]>([])
const scoreData = async () => {
  try {
    const fetchedScores = await fetchAllScores()
    scores.value = fetchedScores
  } catch (error) {
    scores.value = null
  }
}
scoreData()
```

## Prochaines étapes

::: details
Complété le tri des scores
 
Ajout du "Pop-up" de confirmation lors d'un changement de page alors que la partie est en cours
 
Retirer un ennemi du "pool" d'ennemi lorsque vaincu
:::

::: warning
Les test n'ont pas encore été complétés.
:::

##
Auteur: Matis Bergeron
