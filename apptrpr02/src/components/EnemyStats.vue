<script setup lang="ts">
import type { Character } from '../scripts/services/gameService'
const props = defineProps<{
    currentEnemy: Character | null,
    enemy:{
        experience: '',
        health: 100,
        credits: 0
    }
}>()
</script>

<template>
<div class="mission-container ">
    <div class="theme-color">
        <h4>{{ currentEnemy?.name || 'Chargement...' }}</h4>
    </div>
    <p>{{ currentEnemy ? enemy.experience : 'Chargement...' }}</p>
    <p>{{ enemy.credits ? enemy.credits : 'Chargement...' }} GC</p>
    <div>{{ currentEnemy?.ship.name || 'Chargement...' }}</div>
        <div class="w3-light-grey">
            <div class="w3-container w3-round w3-blue w3-center" :style="{ height: '20px', width: (currentEnemy?.ship ? enemy.health : 0) + '%' }">
                {{ enemy.health.toFixed(2) + '%' }}
            </div>
        </div>
</div>
</template>