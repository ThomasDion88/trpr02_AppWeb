<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter, onBeforeRouteLeave  } from 'vue-router'
import { postsService } from '../services/postsService'
import ConfirmModal from '../components/ConfirmModal.vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import type Post from '../scripts/post'

const props = defineProps({
  id: String
})

const post = ref([] as unknown as Post)
const lastSavedPost = ref([] as unknown as Post)
const isLoading = ref(false)
const triggerModal = ref(0)

const router = useRouter()

onMounted(async () => {
  isLoading.value = true
  try {
    const data = await postsService.getPost(props.id!)
    post.value = data
    lastSavedPost.value = { ...data }
  } catch (error) {
    console.error('Erreur avec le service: ', (error as any).message)
  } finally {
    isLoading.value = false
  }
})

const postHasBeenModified = computed(() => {
  return JSON.stringify(post.value) !== JSON.stringify(lastSavedPost.value)
})

watch(postHasBeenModified, (newValue) => {
  if (newValue) {
    // Logique supplémentaire si nécessaire lorsque le post est modifié
  }
})

async function savePost() {
  if (!post.value) return
  try {
    await postsService.updatePost(post.value)
    lastSavedPost.value = { ...post.value }
    router.push({ name: 'Posts' })
  } catch (error) {
    console.error('Impossible de mettre à jour la publication. Erreur', (error as any).response.status)
  }
}

function cancelPost() {
  router.push({ name: 'Posts' })
}

function cancelConfirmed() {
  post.value = { ...lastSavedPost.value }
  router.push({ name: 'Posts' })
}

// Les gardes de navigation sont utilisés pour ajouter un comportement à la navigation. Dans l'exemple ci-dessous, on utilise la méthode beforeRouteLeave comme garde de navigation pour vérifier si le post a été modifié avant de quitter la page. Si oui, on affiche la fenêtre modale de confirmation pour s'assurer que l'utilisateur veut vraiment quitter la page.
// Les gardes de navigation peuvent être utilisés de multiples façons. Pour en connaître davantage voir https://router.vuejs.org/guide/advanced/navigation-guards.html#navigation-guards
onBeforeRouteLeave((to, from, next) => {
  if (postHasBeenModified.value) {
    // Incrémente triggerModal pour afficher le ConfirmModal
    triggerModal.value++
    // Empêche la navigation
    next(false)
  } else {
    // Autorise la navigation
    next()
  }
})
</script>

<template>
  <div>
    <h1>Éditer</h1>
    <!-- @submit.prevent : L'événement submit est émis par le formulaire sur le clic d'un bouton de type submit (voir les boutons plus bas). C'est un événement natif du navigateur et non pas un événement de Vue. Le "prevent" est utilisé pour empêcher le comportement par défaut du navigateur. Ici, on veut appeler la méthode savePost au lieu de soumettre le formulaire. -->
    <form class="row g-3" @submit.prevent="savePost">
      <label for="title-input">Titre </label>
      <!-- la validation de ce formulaire est géré par le navigateur avec l'attribut required et le type de l'input. -->
      <input
        type="text"
        id="title-input"
        class="form-control"
        v-model="post.title"
        required
      />

      <label for="content-textarea">Contenu </label>
      <textarea
        type="text"
        id="content-textarea"
        class="form-control"
        v-model="post.content"
        required
      />

      <label for="author-input">Auteur </label>
      <input
        type="text"
        id="author-input"
        class="form-control"
        v-model="post.author"
        required
      />

      <div>
        <!--  type="submit" : Le type submit permet de définir le bouton qui va soumettre le formulaire. Sur le clic du bouton, l'événement submit est émis et il est intercepté par le @submit.prevent dans la balise form. Noter aussi le lien de l'attribut disabled avec la valeur de la propriété calculée postHasBeenModified. Si le post n'a pas été modifié, le bouton est désactivé. -->
        <button
          type="submit"
          class="btn btn-primary m-1"
          :disabled="!postHasBeenModified"
        >
          Sauvegarder
        </button>

        <!-- @click.prevent : Même principe que pour le @submit.prevent ci-dessus. On veut empêcher le comportement par défaut du navigateur qui est de recharger la page. -->

        <!-- type="button" : Le type button permet de définir manuellement le comportement du bouton (par defaut, un bouton est de type est submit). Donc, ici en ajoutant type="button", on indique que le bouton ne doit pas soumettre le formulaire. C'est Vue.js qui gère le comportement du bouton en appelant la méthode cancelPost. On aurait aussi pu utiliser @click.prevent à la place. -->
        <button
          type="button"
          class="btn btn-secondary m-1 ml-2"
          @click="cancelPost"
        >
          Quitter
        </button>
      </div>
    </form>
  </div>
  <div>
    <!-- Voir le composant ConfirmModal. -->
    <ConfirmModal
      @onModalConfirmed="cancelConfirmed"
      :trigger="triggerModal"
      title="Attention"
      body="Vos changements seront perdus. Voulez-vous vraiment quitter cette page ? "
      cancelButton="Non"
      confirmButton="Oui, quitter sans sauvergarder"
    />
    <Loading :active="isLoading" />
  </div>
</template>

<style scoped></style>