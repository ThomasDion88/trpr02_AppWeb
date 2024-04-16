<script setup lang="ts">
import { ref, onMounted} from 'vue'
import { fetchAllShips } from '../scripts/services/gameService'
import type { Ship } from '../scripts/services/gameService'
import { useToast } from 'vue-toast-notification'

const playerName = ref('')
const selectedShipId = ref<number | ''>('')
const selectedShip = ref<Ship | null>(null)
const ships = ref<Ship[]>([])

const emit = defineEmits<{
    (event: 'formSubmitted', isFormSubmitted: boolean, playerName: string, shipId: number | ''): void
}>()

onMounted( () => {
  shipData()
})

const shipData = async () => {
  try {
    const fetchedShips = await fetchAllShips()
    ships.value = fetchedShips
    selectedShip.value = fetchedShips[0]
    selectedShipId.value = fetchedShips[0].id
  } catch(error) {
    useToast().error(
      `Erreur avec le service: ${(error as Error).message}. Est-ce que vous avez démarré le backend localement ?`,
      { duration: 6000 }
    )
  }
}

const handleSubmit = async () => {
    emit('formSubmitted', true, playerName.value, selectedShipId.value)
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
            <select v-model="selectedShipId" id="ship" class="form-control">
              <option v-for="ship in ships" :value="ship.id">{{ ship.name }}</option>
            </select>
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-primary" id="sendButton">Débuter la partie</button>
          </div>

        </form>
      </div>

    </div>

  </div>
</template>
