<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import Home from '../components/Home.vue'

const router = useRouter()

const handleSubmit = async (isFormSubmitted: boolean, playerName: string, selectedShipId: number | '') => {
  if(isFormSubmitted) {
      try {
      await router.push({
        name: 'Mission',
        params: {
          playerName: playerName,
          shipId: selectedShipId
        }
      })
    }
    catch (error) {
      useToast().error(
        `Veuillez entrer un nom de joueur`,
        { duration: 6000 }
      )
    }
  }
  

}
</script>

<template>
  <Home @formSubmitted="handleSubmit"/>
</template>
