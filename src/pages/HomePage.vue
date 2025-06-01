<template>
  <q-page class="q-pa-md column">
    <!-- Barra de busca -->
    <div class="flex items-center gap-2">
      <q-input v-model="query" placeholder="Buscar GIF..." debounce="400" class="w-full"/>
      <q-btn label="Buscar" @click="doSearch"/>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center q-mt-lg">Carregando...</div>

    <!-- Lista de GIFs -->
    <div class="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-4 q-mt-md">
      <GifCard
        v-for="gif in gifs"
        :key="gif.id"
        :gif="gif"
        :initialFavorited="isFavorited(gif.id)"
        @update:favorite="(fav) => handleFavorite(gif, fav)"
      />
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

