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
        <h4>{{ props.currentEnemy?.name || 'Chargement...' }}</h4>
    </div>
    <p>{{ props.currentEnemy ? props.enemy.experience : 'Chargement...' }}</p>
    <p>{{ props.enemy.credits ? props.enemy.credits : 'Chargement...' }} GC</p>
    <div>{{ props.currentEnemy?.ship.name || 'Chargement...' }}</div>
        <div class="w3-light-grey">
            <div class="w3-container w3-round w3-blue w3-center" :style="{ height: '20px', width: (props.currentEnemy?.ship ? props.enemy.health : 0) + '%' }">
                {{ props.enemy.health.toFixed(2) + '%' }}
            </div>
        </div>
</div>
</template>