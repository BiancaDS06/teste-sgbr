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
      class="grid grid-cols-[repeat(auto-fill,minmax(100px,0.5fr))] gap-[6px] q-mt-xl justify-center max-w-screen-xl mx-auto">
      <GifCard v-for="gif in gifs" :key="gif.id" :gif="gif" :initialFavorited="isFavorited(gif.id)"
        @update:favorite="(fav) => handleFavorite(gif, fav)" />
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
  const stored = JSON.parse(localStorage.getItem('favorites') || '[]')
  return stored.some(gif => gif.id === id)
}

const handleFavorite = (gif, favored) => {
  // carrega a lista existente
  const stored = JSON.parse(localStorage.getItem('favorites') || '[]')

  let updated
  if (favored) {
    // 👉 só adiciona se ainda não existir
    if (!stored.find(item => item.id === gif.id)) {
      updated = [...stored, gif]          // ← salva o GIF inteiro
    } else {
      updated = stored
    }
  } else {
    updated = stored.filter(item => item.id !== gif.id)
  }

  localStorage.setItem('favorites', JSON.stringify(updated))
}



loadTrending()
</script>
