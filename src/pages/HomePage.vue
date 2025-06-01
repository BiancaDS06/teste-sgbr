<template>
  <q-page class="q-pa-md column items-center">
    <!-- Barra de busca -->
    <div class="row items-center q-gutter-x-sm">
      <q-input v-model="query" placeholder="Buscar GIF..." debounce="400" class="w-full" outlined dense clearable
        @keyup.enter="doSearch" />
      <q-btn label="Buscar" color="primary" @click="doSearch" />
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center q-mt-lg text-primary text-lg animate-pulse">
      Carregando...
    </div>

    <!-- Lista de GIFs -->
    <div v-if="!loading && gifs.length"
      class="row q-col-gutter-md justify-center q-mt-xl"
      style="max-width: 1200px; margin: 0 auto;">
      <div v-for="gif in gifs" :key="gif.id" class="col-12 col-sm-6 col-md-3">
        <GifCard :gif="gif" :initialFavorited="isFavorited(gif.id)"
          @update:favorite="(fav) => handleFavorite(gif, fav)" />
      </div>
    </div>

    <!-- Nenhum resultado -->
    <div v-else-if="!loading && !gifs.length" class="text-center text-gray-500 q-mt-xl">
      Nenhum GIF encontrado.
    </div>
  </q-page>
</template>


<script setup>
import { ref, watch } from 'vue'
import { useGiphy } from '../composables/useGiphy'
import GifCard from '../components/GifCard.vue'

const { getTrending, searchGifs, loading } = useGiphy()
const gifs = ref([])
const query = ref('')

// Carrega GIFs em alta ao abrir
const loadTrending = async () => {
  gifs.value = await getTrending()
}

// Faz a busca se houver termo
const doSearch = async () => {
  gifs.value = query.value ? await searchGifs(query.value) : await getTrending()
}

// Se o campo de busca for apagado, volta pro trending
watch(query, val => { if (!val) loadTrending() })

const isFavorited = (id) => {
  try {
    const stored = localStorage.getItem('favorites')
    if (!stored) return false
    const favorites = JSON.parse(stored)
    return favorites.some(gif => gif.id === id)
  } catch (error) {
    console.error('Erro ao verificar favorito:', error)
    return false
  }
}

const handleFavorite = (gif, favored) => {
  try {
    // Carrega os favoritos existentes
    const stored = localStorage.getItem('favorites') || '[]'
    let favorites = JSON.parse(stored)

    if (!Array.isArray(favorites)) {
      favorites = []
    }

    // Atualiza os favoritos
    if (favored) {
      // Adiciona apenas se não existir
      if (!favorites.some(item => item.id === gif.id)) {
        favorites.push(gif)
      }
    } else {
      // Remove se existir
      favorites = favorites.filter(item => item.id !== gif.id)
    }

    // Salva no localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites))
  } catch (error) {
    console.error('Erro ao atualizar favoritos:', error)
    // Se der erro, tenta criar um array vazio
    localStorage.setItem('favorites', JSON.stringify([]))
  }
}



loadTrending()
</script>
