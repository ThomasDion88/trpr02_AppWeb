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
        <h4>{{ props.playerName }}</h4>
    </div>
    <p>{{ props.player.experience ? props.player.experience : 'Chargement...' }}</p>
    <p>{{ props.player ? props.player.credits : 0 }} GC</p>
    <div>{{ props.selectedShip ? props.selectedShip.name : 'Chargement...' }}</div>
        <div class="w3-light-grey">
            <div class="w3-container w3-round w3-blue w3-center" :style="{ height: '20px', width: props.player.health + '%' }">
                {{ props.player.health.toFixed(2) + '%' }}
            </div>
        </div>
    </div>
</template>