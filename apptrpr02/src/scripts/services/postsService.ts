import axios from 'axios'
import type Post from '../post'
// import { API } from '@/shared/config'

// Note sur le gestion des erreurs:
// - IMPORTANT Dans ce projet, la gestion des erreurs (try/catch) est gérée par le code qui utilise ce service.
// - Dans un contexte d'entreprise, il serait utile de loguer les erreurs qui surviennent dans ce service et ensuite de les relancer en précisant le contexte de l'erreur.

const API_URL = 'http://127.0.0.1:3000'

async function postPlayerData(playerData: { playerName: string, selectedShipId: string }) {
  const response = await axios.post(`${API_URL}/mission`, playerData);
  return response.data.id;
}

async function getPosts() {
  const { data } = await axios.get(`${API_URL}/posts`)
  return data
}

async function updatePost(post: Post) {
  await axios.put(`${API_URL}/posts/${post.id}`, post)
}

export const postsService = {
  getPosts,
  updatePost,
  postPlayerData
}