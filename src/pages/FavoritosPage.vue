<template>
  <q-page class="q-pa-md">
    <!-- Lista de GIFs favoritos -->
    <div v-if="!loading && favoritos.length"
      class="row q-col-gutter-md justify-center q-mt-xl"
      style="max-width: 1200px; margin: 0 auto;">
      <div v-for="gif in favoritos" :key="gif.id" class="col-12 col-sm-6 col-md-3">
        <GifCard :gif="gif" :initialFavorited="true"
          @update:favorite="(fav) => handleFavorite(gif, fav)" />
      </div>
    </div>

    <!-- Nenhum favorito -->
    <div v-else-if="!loading && !favoritos.length" class="text-center text-gray-500 q-mt-xl">
      <q-icon name="favorite_border" size="lg" color="grey-6" class="q-mb-sm" />
      <p>Nenhum GIF favorito ainda</p>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center q-mt-lg text-primary text-lg animate-pulse">
      Carregando...
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { LocalStorage } from 'quasar'
import GifCard from '../components/GifCard.vue'

const loading = ref(true)
const favoritos = ref([])

// Carrega os favoritos do localStorage
const loadFavorites = () => {
  try {
    const stored = LocalStorage.getItem('favorites')
    if (!stored) {
      favoritos.value = []
      loading.value = false
      return
    }

    const favorites = JSON.parse(stored)
    if (!Array.isArray(favorites)) {
      throw new Error('Dados inválidos no localStorage')
    }

    favoritos.value = favorites
    loading.value = false
  } catch (error) {
    console.error('Erro ao carregar favoritos:', error)
    favoritos.value = []
    loading.value = false
  }
}

// Atualiza o status de favorito
const handleFavorite = (gif, favored) => {
  try {
    // Atualiza a lista de favoritos
    if (!favored) {
      favoritos.value = favoritos.value.filter(item => item.id !== gif.id)
    }

    // Salva no localStorage
    LocalStorage.set('favorites', JSON.stringify(favoritos.value))
  } catch (error) {
    console.error('Erro ao atualizar favoritos:', error)
  }
}

// Carrega os favoritos quando o componente é montado
onMounted(loadFavorites)
</script>
