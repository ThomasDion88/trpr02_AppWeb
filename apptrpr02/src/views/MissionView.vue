<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchShipById, fetchFiveRandomCharacters, convertExperienceLevel, handleHealthPercentage } from '../scripts/services/gameService'
import type { Character } from '../scripts/services/gameService'

const selectedShip = ref(null)
const route = useRoute()

const playerName = route.params.playerName
const selectedShipId = route.params.shipId

const enemies = ref([]);
const currentEnemyIndex = ref(0)
const currentEnemy = ref(null)
const initialVitality = ref(100)

const player = ref<{
  experience: string,
  health: number
}>({
  experience: '',
  health: 100
});

const enemy = ref<{
  experience: string,
  health: number
}>({
  experience: '',
  health: 0
});

const playerData = async () => {
  player.value.experience = await convertExperienceLevel(4)
}

const shipData = async () => {
  try {
    selectedShip.value = await fetchShipById(selectedShipId)
  } catch (error) {
    console.error('Failed to fetch ship data:', error)
    selectedShip.value = null
  }
}

const enemiesData = async () => {
  try {
    const fetchedEnemies = await fetchFiveRandomCharacters();
    enemies.value = fetchedEnemies;
    currentEnemy.value = enemies.value[currentEnemyIndex.value]
    initialVitality.value = currentEnemy.value.ship.vitality

    enemy.value.experience = await convertExperienceLevel(currentEnemy.value.experience)
    enemy.value.health = await handleHealthPercentage(currentEnemy.value.ship.vitality, initialVitality.value)
  } catch (error) {
    console.error('Failed to load enemies:', error);
    enemies.value = [];
  }
}

const nextEnemy = async () => {
  if (currentEnemyIndex.value < enemies.value.length - 1) {
    currentEnemyIndex.value++;
  } else {
    console.log("No more enemies available.");
  }
}

onMounted(() => {
  shipData()
  enemiesData()
  playerData()
})

</script>

<template>
  <div class="page-container">

    <div id="mission-board">

      <div class="mission-data">

        <div class="mission-container">
          <div class="theme-color">
            <h4>Actions</h4>
          </div>
          <div id="actions">
            <button class="btn btn-primary action">Combattre</button>
            <button class="btn btn-primary action">Terminer la mission</button>
            <button class="btn btn-primary action">Terminer la mission et réparer le vaisseau</button>
          </div>
        </div>

        <div class="mission-container">
          <div class="theme-color">
            <h4>Mission en cours</h4>
          </div>
        </div>

      </div>

      <div class="mission-data">

        <div class="mission-container ">
          <div class="theme-color">
            <h4>{{ playerName }}</h4>
          </div>
          <p>{{ player.experience ? player.experience : 'Chargement...' }}</p>
          <div>{{ selectedShip ? selectedShip.name : 'Chargement...' }}</div>
          <div class="w3-light-grey">
            <div class="w3-container w3-round w3-blue w3-center"
              :style="{ height: '20px', width: player.health ? player.health + '%' : '0%' }">{{ player.health + '%' }}
            </div>
          </div>
        </div>

        <div class="mission-container ">
          <div class="theme-color">
            <h4>{{ currentEnemy?.name || 'Chargement...' }}</h4>
          </div>
          <p>{{ currentEnemy ? enemy.experience : 'Chargement...' }}</p>
          <div>{{ currentEnemy?.ship.name || 'Chargement...' }}</div>
          <div class="w3-light-grey">
            <div class="w3-container w3-round w3-blue w3-center"
              :style="{ height: '20px', width: (currentEnemy?.ship ? enemy.health : 0) + '%' }">
              {{ currentEnemy?.ship ? enemy.health + '%' : '0%' }}
            </div>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>
