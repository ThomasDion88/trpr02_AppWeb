<script setup lang="ts">
import { ref } from 'vue'
import { fetchAllScores } from '../scripts/services/gameService'
import type { Score } from '../scripts/services/gameService'

const scores = ref<Score[]>([])
const scoreData = async () => {
  const fetchedScores = await fetchAllScores()
  scores.value = fetchedScores
}
scoreData()

</script>

<template>
  <div>
    <div class="title text-center">
      <h2>Scores</h2>
    </div>

    <div id="score-container">
      <h4 class="text-center">Pointage</h4>
      <div></div>
      <ul class="list-group">
        <li v-for="score in scores" class="list-group-item">
          {{ score.id }} - {{ score.name }} - {{ score.score }}CG
        </li>
      </ul>
    </div>

  </div>
</template>
