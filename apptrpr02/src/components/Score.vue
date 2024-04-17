<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Score as ScoreType } from '../scripts/services/gameService'
import { useToast } from 'vue-toast-notification'
import { fetchAllScores } from '../scripts/services/gameService'
import Score from '../components/Score.vue'

const scores = ref<ScoreType[]>([])

// Source : https://howtodoinjava.com/typescript/maps/
let scoreMap = new Map<number, Score>([])

onMounted(() => {
  scoreData()
})

const scoreData = async () => {
  try {
    const fetchedScores = await fetchAllScores()
    scores.value = fetchedScores
    sortScores()
  } catch (error) {
    useToast().error(
      `Erreur avec le service: ${(error as Error).message}. Est-ce que vous avez démarré le backend localement ?`,
      { duration: 6000 }
    )
    scores.value = []
  }
}

const sortScores = async () => {
  scores.value = scores.value.sort((a, b) => b.score - a.score)

  scores.value.forEach((score, rank) => {
    scoreMap.set(rank + 1, score)
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
        <li v-if="scores === null" class="list-group-item" id="ranking">Impossible d'accéder aux scores.</li>
        <li v-else v-for="[rank, score] in scoreMap" :key="rank" class="list-group-item" id="ranking">
          {{ rank }} - {{ score.name }} - {{ score.score }}CG
        </li>
      </ul>
    </div>

  </div>
</template>
