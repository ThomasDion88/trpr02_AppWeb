<!-- Ce composant est associé à la route "/about" (voir fichier src/router/index.ts). -->
<script setup lang="ts"> 
  import { ref } from 'vue'
  import { fetchAllShips } from '../scripts/services/gameService'
  import { postsService } from '../scripts/services/postsService'
  import { useRouter } from 'vue-router'
  import type { Ship } from '../scripts/services/gameService'

  const playerName = ref('')
  const selectedShipId = ref('')
  const selectedShip = ref<Ship | null>(null)
  const ships = ref<Ship[]>([])

  const router = useRouter()

  const shipData = async () => {
    const fetchedShips = await fetchAllShips()
    ships.value = fetchedShips
    selectedShip.value = fetchedShips[0]
  }
  shipData()

  const startGame = async () => {
    if (!playerName.value || !selectedShip.value) {
      alert('Veuillez entrer votre nom et sélectionner un vaisseau.')
      return
    }

    try {
      const newPost = await postsService.postPlayerData({
        playerName: playerName.value,
        selectedShipId: selectedShipId.value
      })
      
      await router.push({
        name: 'Mission',
        params: { postId: newPost.id }
      })
    } catch (error) {
      alert('Une erreur est survenue lors du démarrage du jeu. Veuillez réessayer.')
    }
  }

  
</script>

<template>
  <div>
    <div class="text-center" id="title">
      <h2>Votre Objectif : survivre à 5 missions en obtenant le plus de crédits galactiques</h2>
    </div>

    <div id="container">
      <div id="page">
        <form action="" method="POST" @submit.prevent="startGame">

          <div class="form-group">
            <label for="name">Votre nom:</label>
            <input type="text" v-model="playerName" id="name" class="form-control">
          </div>

          <div class="form-group">
            <label for="ship">Votre vaisseau:</label>
            <select v-model="selectedShip" id="ship" class="form-control">
              <option v-for="ship in ships" :value="ship">{{ ship.name }}</option>
            </select>
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-primary">Débuter la partie</button>
          </div>

        </form>
      </div>

    </div>

  </div>
</template>
