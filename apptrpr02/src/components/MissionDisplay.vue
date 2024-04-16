<script setup lang="ts">
const props = defineProps<{
    currentMission: number,
    totalMissions: number
}>()
</script>

<template>
<div class="mission-container">
    <div class="theme-color">
        <h4>Mission en cours {{ currentMission }} / {{ totalMissions }}</h4>
    </div>
    <p>Votre Objectif : survivre à 5 missions en obtenant le plus de crédits galactiques</p>
</div>
</template>