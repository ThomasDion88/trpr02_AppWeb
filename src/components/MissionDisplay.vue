<script setup lang="ts">
const props = defineProps<{
    currentMission: number,
    totalMissions: number
}>()
</script>

<template>
<div class="mission-container">
    <div class="theme-color">
        <h4 id="missionDisplay">Mission en cours {{ props.currentMission }} / {{ props.totalMissions }}</h4>
    </div>
    <p>Votre Objectif : survivre à 5 missions en obtenant le plus de crédits galactiques</p>
</div>
</template>