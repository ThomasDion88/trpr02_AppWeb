<script setup lang="ts">
import type { Ship } from '../scripts/services/gameService'

const props = defineProps<{
    playerName: string,
    player:{
        experience: '',
        health: 100,
        credits: 0
    }
    selectedShip: Ship | null,
}>()

</script>

<template>
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
</template>