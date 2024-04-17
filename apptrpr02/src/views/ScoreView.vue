<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Score as ScoreType } from '../scripts/services/gameService'
import { useToast } from 'vue-toast-notification'
import { fetchAllScores } from '../scripts/services/gameService'
import Score from '../components/Score.vue'

const scores = ref<ScoreType[]>([])

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
}
</script>

<template>
  <Suspense>
    <Score :scores="scores"/>
  </Suspense>
</template>
