# Markdown Extension Examples

This page demonstrates some of the built-in markdown extensions provided by VitePress.

## Le GameService:

Le code du GameService (gère l'échange des données entre le backend et le frontend) est
clair et bien structuré.

**Exemple de code clair et concis**

```js{4}
export type Ship = {
    id: number,
    name: string,
};

export type Score = {
    id: number,
    name: string,
    score: number,
};

export type Character = {
    id: number,
    name: string,
    credit: number,
    experience: number,
    ship: {
        id: number,
        name: string,
        vitality: number
      },
};
```

Il est également facile de s'y retrouver. Les fonctions sont bien nommées, courtes et bien découpées au travers du fichier.

**Par exemple:**

```js{4}
export async function convertExperienceLevel(level: number): Promise<string> {
    return experienceLevels[level] || 'Inconnu';
};

export async function handleHealthPercentage(currentHealth: number, initialHealth: number): Promise<number> {
    return ((currentHealth * 100) / initialHealth)
};

export async function fetchAllShips(): Promise<Ship[]> {
    let response = await fetch("http://127.0.0.1:3000/ships");
    let ships = await response.json();
    return ships;
};
```

## Attention
::: tip
Certaines fonctions auraient toutefois pu mériter un commentaire pour de la précision.
:::
```js{4}
export async function fetchFiveRandomCharacters(): Promise<Character[]> {
    let response = await fetch("http://127.0.0.1:3000/characters");
    let characters = await response.json();
    
    for (let i = characters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [characters[i], characters[j]] = [characters[j], characters[i]];
    }

    return characters.slice(0, 5);
};
```
::: Warning
Les test n'ont pas encore été complétés.
:::

##
Auteur: Thomas Dion
