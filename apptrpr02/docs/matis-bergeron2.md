# Revue de code - Semaine 2

## Le GameService:

Le code du GameService (gère l'échange des données entre le backend et le frontend) est
clair et bien structuré.

**Exemple de code clair et concis**

```js{4}
export type Ship = {
    id: number,
    name: string,
};

```

Il est également facile de s'y retrouver. Les fonctions sont bien nommées, courtes et bien découpées au travers du fichier.

**Par exemple:**

```js{4}
export async function convertExperienceLevel(level: number): Promise<string> {
    return experienceLevels[level] || 'Inconnu';
};

```

## Attention
::: tip
Certaines fonctions auraient toutefois pu mériter un commentaire pour de la précision.
:::
```js{4}

```
::: warning
Les test n'ont pas encore été complétés.
:::

##
Auteur: Thomas Dion
