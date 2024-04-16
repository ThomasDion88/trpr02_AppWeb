<script setup lang="ts">
const emit = defineEmits<{
    (event: 'action', isCombatCalled: boolean, isNextMissionCalled: boolean, isRepairAndNextCalled: boolean): void
}>()
</script>

<template>
<div class="mission-container">
    <div class="theme-color">
        <h4>Actions</h4>
    </div>
    <div id="actions">
        <button class="btn btn-primary action" id="combatButton" @click="emit('action', true, false, false)">Combattre</button>
        <button class="btn btn-primary action" id="nextButton" @click="emit('action', false, true, false)">Terminer la mission</button>
        <button class="btn btn-primary action" id="repairAndNextButton" @click="emit('action', false, false, true)">Terminer la mission et réparer le vaisseau</button>
    </div>
</div>
</template>