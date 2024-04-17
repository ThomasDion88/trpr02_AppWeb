<script setup lang="ts">
import { onMounted } from 'vue'
import type { Score } from '../scripts/services/gameService'

const props = defineProps<{
    scores: Score[]
}>()

onMounted(() => {
  giveRankToScore()
})

// Source : https://howtodoinjava.com/typescript/maps/
let scoreMap = new Map<number, Score>([])

const giveRankToScore = async () => {
  props.scores.forEach((score, rank) => {
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
        <li v-if="props.scores === null" class="list-group-item">Impossible d'accéder aux scores.</li>
        <li v-else v-for="[rank, score] in scoreMap" :key="rank" class="list-group-item">
          {{ rank }} - {{ score.name }} - {{ score.score }}CG
        </li>
      </ul>
    </div>

  </div>
</template>
