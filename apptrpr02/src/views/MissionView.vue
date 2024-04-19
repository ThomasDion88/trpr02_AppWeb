<script setup lang='ts'>
  import { ref } from 'vue'
  import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router'
  import ConfirmModal from '../components/ConfirmModal.vue'
  import Game from '../components/Game.vue'

  const route = useRoute()
  const router = useRouter()
  const triggerModal = ref(0)
  const isGameStarted = ref(false)
  const nextView = ref()
  
  function cancelConfirmed() {
      isGameStarted.value = false
      router.push({ name: nextView.value })
  }

  onBeforeRouteLeave((to, from, next) => {
    if (isGameStarted.value) {
      nextView.value = to.name
      triggerModal.value++
      next(false)
    } else {
      next()
    }
  })

  function handleGameOver(isPlayerDead: boolean) {
    if(isPlayerDead) {
      router.push({ name: 'Accueil' })
    }
  }

  function handleGameState(isGameActive: boolean) {
    if(isGameActive) {
      isGameStarted.value = true
    }else {
      isGameStarted.value = false
    }
  }

  function handleScorePost(isScoreDataPosted: boolean) {
    if(isScoreDataPosted) {
      router.push({ name: 'Score' })
    }
  }

</script>

<template>
  <div class="page-container" id="game">
    <Game :playerName="route.params.playerName" :selectedShipId="route.params.shipId" @gameOver="handleGameOver" @gameActive="handleGameState" @scorePosted="handleScorePost"/>
  </div>
  <div>
    <ConfirmModal @onModalConfirmed="cancelConfirmed" :trigger="triggerModal" title="Attention"
      body="Vos changements seront perdus. Voulez-vous vraiment quitter cette page ? " cancelButton="Non"
      confirmButton="Oui, quitter sans sauvergarder" />
  </div>
</template>
