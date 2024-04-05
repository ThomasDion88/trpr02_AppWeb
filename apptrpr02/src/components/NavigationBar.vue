<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <RouterLink class="nav-link" id="publications" to="/">Mes publications</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" id="apropos" :to="{ name: 'About' }">À propos</RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>