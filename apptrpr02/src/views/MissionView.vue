<script setup>
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { fetchShipById } from '../scripts/services/gameService'

  const selectedShip = ref<Ship | null>(null)
  const route = useRoute()

  const playerName = route.params.playerName
  const selectedShipId = route.params.shipId

  console.log(playerName)
  console.log(selectedShipId)

  const shipData = async () => {
    selectedShip = await fetchShipById(selectedShipId)
  }
  shipData()

</script>

<template>
  <div class="page-container">

    <div id="mission-board">

      <div class="mission-data">

        <div class="container-theme row">
          <div class="theme-color">
            <h4>Actions</h4>
          </div>
          <div id="actions">
            <button class="btn btn-primary ">Combattre</button>
            <button class="btn btn-primary ">Terminer la mission</button>
            <button class="btn btn-primary ">Terminer la mission et réparer le vaisseau</button>
          </div>

        </div>

        <div class="container-theme">
          <div class="theme-color">
            <h4>Mission en cours</h4>
          </div>
        </div>

      </div>



      <div class="mission-data">

        <div class="container-theme row">
          <div class="theme-color">
            <h4>{{ playerName }}</h4>
          </div>
          <p>Rank joueur ici</p>
          <div>{{ selectedShip.name }}</div>
          <div class="w3-light-grey">
            <div class="w3-container w3-round w3-blue w3-center " style="height:20px;width:80%">80%</div>
          </div>
        </div>

        <div class="container-theme row">
          <div class="theme-color">
            <h4>Nom de l'ennemi ici</h4>
          </div>
          <p>Rank de ennemi ici</p>
          <div>Vaisseau de ennemi ici</div>
          <div class="w3-light-grey">
            <div class="w3-container w3-round w3-blue w3-center " style="height:20px;width:46%">46%</div>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>
