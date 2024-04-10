<!-- Ce composant est associé à la route "/about" (voir fichier src/router/index.ts). -->


<template>
  <div>
    <h2>Votre Objectif : survivre à 5 missions en obtenant le plus de crédits galactiques</h2>

    <div id="container">
      <div id="page">
        <form action="" method="POST">

          <div class="form-group">
            <label for="name">Votre nom:</label>
            <input type="text" name="nom" id="name" class="form-control">
          </div>

          <div class="form-group">
            <label for="ship">Votre vaisseau:</label>
            <select name="ship" id="ship" class="form-control">
              <option value="test1">test1</option>
              <option value="test2">test2</option>
            </select>
          </div>

          <div>
            <button type="submit" class="btn btn-primary">Débuter la partie</button>
          </div>

        </form>
      </div>

    </div>

  </div>
</template>
