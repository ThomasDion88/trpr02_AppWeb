<script setup lang="ts">
import { ref } from 'vue'
import { fetchAllScores } from '../scripts/services/gameService'
import type { Score } from '../scripts/services/gameService'
import { useToast } from 'vue-toast-notification'

const scores = ref<Score[]>([])
const scoreData = async () => {
  try {
    const fetchedScores = await fetchAllScores()
    scores.value = fetchedScores
  } catch (error) {
    useToast().error(
      `Erreur avec le service: ${(error as Error).message}. Est-ce que vous avez démarré le backend localement ?`,
      { duration: 6000 }
    )
    scores.value = null
  }
}
scoreData()
sortScores()

function sortScores() {
  scores.value = scores.value.sort((a, b) => {
    return a.score - b.score
  })
}

</script>

<template>
  <div>
    <div class="title text-center">
      <h2>Scores</h2>
    </div>

    <div id="score-container">
      <h4 class="text-center">Pointage</h4>
      <ul class="list-group">
        <li v-if="scores === null" class="list-group-item">Impossible d'accéder aux scores.</li>
        <li v-else v-for="score in scores" class="list-group-item">
          {{ score.id }} - {{ score.name }} - {{ score.score }}CG
        </li>
      </ul>
    </div>

  </div>
</template>
