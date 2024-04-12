<script setup lang="ts">
import { ref } from 'vue'
import { fetchAllShips } from '../scripts/services/gameService'
import { useRouter } from 'vue-router'
import type { Ship } from '../scripts/services/gameService'

const playerName = ref('')
const selectedShipId = ref<number | ''>('')
const selectedShip = ref<Ship | null>(null)
const ships = ref<Ship[]>([])
const router = useRouter()



const shipData = async () => {
  const fetchedShips = await fetchAllShips()
  ships.value = fetchedShips
  selectedShip.value = fetchedShips[0]
  selectedShipId.value = fetchedShips[0].id
}
shipData()

const handleSubmit = async () => {
  await router.push({
    name: 'Mission',
    params: {
      playerName: playerName.value,
      shipId: selectedShipId.value
    }
  })
}
</script>

<template>
  <div>
    <div class="text-center title">
      <h2>Votre Objectif : survivre à 5 missions en obtenant le plus de crédits galactiques</h2>
    </div>

    <div class="page-container">
      <div id="page">
        <form action="" method="POST" @submit.prevent="handleSubmit">

          <div class="form-group">
            <label for="name">Votre nom:</label>
            <input type="text" v-model="playerName" id="name" class="form-control">
          </div>

          <div class="form-group">
            <label for="ship">Votre vaisseau:</label>
            <select v-model="selectedShip" id="ship" class="form-control">
              <option v-for="ship in ships" :value="ship.id">{{ ship.name }}</option>
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
