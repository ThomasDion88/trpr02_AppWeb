<script setup lang='ts'>
  import { ref, onMounted } from 'vue'
  import axios from 'axios';
  import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router'
  import { fetchShipById, fetchFiveRandomCharacters, convertExperienceLevel, handleHealthPercentage, fetchShipVitality } from '../scripts/services/gameService'
  import ConfirmModal from '../components/ConfirmModal.vue'
  import type { Character } from '../scripts/services/gameService'
  import { useToast } from 'vue-toast-notification'

  const route = useRoute()
  const router = useRouter()
  const playerName = route.params.playerName
  const selectedShipId = route.params.shipId
  const currentMission = ref(1)
  const totalMissions = ref(5)

  const selectedShip = ref<Ship | null>(null)
  const enemies = ref<Character[]>([])
  const currentEnemyIndex = ref(0)
  const currentEnemy = ref(null)
  const initialEnemyVitality = ref(100)
  const initialPlayerVitality = ref(100)

  const triggerModal = ref(0)
  const isGameActive = ref(false)
  const nextView = ref()

  const player = ref({
    experience: '',
    health: 100,
    credits: 0
  })

  const enemy = ref({
    experience: '',
    health: 100,
    credits: 0
  })

  const gameData = async () => {
    try {
      console.log(isGameActive.value)
      selectedShip.value = await fetchShipById(selectedShipId)

      player.value.experience = await convertExperienceLevel(4)
      initialPlayerVitality.value = await fetchShipVitality(selectedShipId)
      player.value.health = await handleHealthPercentage(initialPlayerVitality.value, initialPlayerVitality.value)
      player.value.credits = 0

      enemies.value = await fetchFiveRandomCharacters()

      totalMissions.value = enemies.value.length

    } catch (error) {
      useToast().error(
        `Échec de la récupération des données du jeu : ${(error as Error).message}.`,
        { duration: 6000 }
      )
    }
  }

  const updateEnemyData = async () => {
    if (currentEnemyIndex.value < enemies.value.length) {
      currentEnemy.value = enemies.value[currentEnemyIndex.value]
      initialEnemyVitality.value = currentEnemy.value.ship.vitality
        
      enemy.value.experience =  await convertExperienceLevel(currentEnemy.value.experience) 
      enemy.value.health = await handleHealthPercentage(currentEnemy.value.ship.vitality, initialEnemyVitality.value)
      enemy.value.credits = currentEnemy.value.credit
    }
  }

  // Formule Math.floor trouvée sur : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor afin d'arrondir la valeur vers la plus petite unité exemple : (5.5 = 5)
  const combat = async () => {

    isGameActive.value = true

    const experienceToHitChance = {
      1: 20,
      2: 35,
      3: 50,
      4: 70
    }

    const playerHitChance = experienceToHitChance[4]
    const enemyHitChance = currentEnemy.value ? experienceToHitChance[currentEnemy.value.experience] : 0

    const playerHits = Math.random() * 100 < playerHitChance
    const enemyHits = Math.random() * 100 < enemyHitChance

    if(playerHits) {
      const damageToEnemy = 3 + Math.random() * 3
      enemy.value.health = Math.max(enemy.value.health - damageToEnemy, 0)
    }

    if(enemyHits) {
      const damageToPlayer = 3 + Math.random() * 3
      player.value.health = Math.max(player.value.health - damageToPlayer, 0)
    }

    console.log(isGameActive.value)

    if (enemy.value.health <= 0 || player.value.health <= 0) {
      finishCombat()
    }
  }

  const finishCombat = async () => {
    if (enemy.value.health <= 0) {
      player.value.credits += enemy.value.credits
      useToast().success(
        `Ennemi vaincu! Vous avez gagné ${enemy.value.credits} crédits.`,
        { duration: 6000 },
      )
      nextMission()
    } else if (player.value.health <= 0) {
      alert("Vous avez été vaincu ! Partie terminé.")
      isGameActive.value = false
      router.push({
        name: 'Accueil',
      })
    }
  }

  const nextMission = async () => {
    if (currentMission.value < totalMissions.value) {
      currentMission.value++
      currentEnemyIndex.value++
      updateEnemyData()
    } else {
      alert("Félicitations! Vous avez terminé toutes les missions !")
      isGameActive.value = false
      postData()
    }
  }

  const repairAndNext = async () => {
    const healthMissing = 100 - player.value.health
    const totalRepairCost = 5 * healthMissing

    if(player.value.credits > 0) {
      if (player.value.credits >= totalRepairCost) {
        player.value.health = 100
        player.value.credits -= totalRepairCost
        useToast().info(
          `Vaisseau entièrement réparé. ${totalRepairCost.toFixed(2)} crédits ont été utilisés.`,
          { duration: 6000 }
        )
      } else {
        const maxHealthPossible = Math.floor(player.value.credits / 5)
        const healthToRestore = Math.min(healthMissing, maxHealthPossible)
        const repairCost = 5 * healthToRestore

        player.value.health += healthToRestore
        player.value.credits -= repairCost

        useToast().info(
          `Vaisseau partiellement réparé. ${repairCost.toFixed(2)} crédits ont été utilisés pour restaurer ${healthToRestore} % de santé.`,
          { duration: 6000 }
        )
      }
    } else {
      useToast().info(
        `Pas assez de crédits pour réparer le Vaisseau.`,
        { duration: 6000 }
      )
    }

    nextMission()
  }

  const postData = async () => {
    const postData = {
      name: playerName,
      score: player.value.credits
    }

    try {
      const response = await axios.post('http://127.0.0.1:3000/ranking', postData)
      router.push({ name: 'Score' });
    } catch (error) {
      useToast().error(
        `Échec de l'envoi des données du jeu : ${(error as Error).message}.`,
        { duration: 6000 }
      )
    }
  }

  function cancelConfirmed() {
      isGameActive.value = false
      router.push({ name: nextView.value })
  }

  onBeforeRouteLeave((to, from, next) => {
    if (isGameActive.value) {
      nextView.value = to.name
      triggerModal.value++
      next(false)
    } else {
      next()
    }
  })
  
  // Source : https://stackoverflow.com/questions/64117116/how-can-i-use-async-await-in-the-vue-3-0-setup-function-using-typescript
  onMounted(async () => {
    await gameData()
    updateEnemyData()
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
            <button class="btn btn-primary action" @click="combat">Combattre</button>
            <button class="btn btn-primary action" @click="nextMission">Terminer la mission</button>
            <button class="btn btn-primary action" @click="repairAndNext">Terminer la mission et réparer le vaisseau</button>
          </div>
        </div>

        <div class="mission-container">
          <div class="theme-color">
            <h4>Mission en cours {{ currentMission }} / {{ totalMissions }}</h4>
          </div>
          <p>Votre Objectif : survivre à 5 missions en obtenant le plus de crédits galactiques</p>
        </div>

      </div>

      <div class="mission-data">

        <div class="mission-container ">
          <div class="theme-color">
            <h4>{{ playerName }}</h4>
          </div>
          <p>{{ player.experience ? player.experience : 'Chargement...' }}</p>
          <p>{{ player ? player.credits : 0 }} GC</p>
          <div>{{ selectedShip ? selectedShip.name : 'Chargement...' }}</div>
          <div class="w3-light-grey">
            <div class="w3-container w3-round w3-blue w3-center" :style="{ height: '20px', width: player.health + '%' }">
              {{ player.health.toFixed(2) + '%' }}
            </div>
          </div>
        </div>

        <div class="mission-container ">
          <div class="theme-color">
            <h4>{{ currentEnemy?.name || 'Chargement...' }}</h4>
          </div>
          <p>{{ currentEnemy ? enemy.experience : 'Chargement...' }}</p>
          <p>{{ enemy.credits ? enemy.credits : 'Chargement...' }} GC</p>
          <div>{{ currentEnemy?.ship.name || 'Chargement...' }}</div>
          <div class="w3-light-grey">
            <div class="w3-container w3-round w3-blue w3-center"
              :style="{ height: '20px', width: (currentEnemy?.ship ? enemy.health : 0) + '%' }">
              {{ enemy.health.toFixed(2) + '%' }}
            </div>
          </div>
        </div>

      </div>

    </div>

  </div>
  <div>
    <ConfirmModal @onModalConfirmed="cancelConfirmed" :trigger="triggerModal" title="Attention"
      body="Vos changements seront perdus. Voulez-vous vraiment quitter cette page ? " cancelButton="Non"
      confirmButton="Oui, quitter sans sauvergarder" />
  </div>
</template>
