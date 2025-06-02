<template>
  <q-page class="q-pa-md column items-center">
    <div class="row items-center q-gutter-x-sm">
      <q-input v-model="query" placeholder="Buscar GIF..." debounce="400" class="w-full" outlined dense clearable
        @keyup.enter="doSearch" />
      <q-btn label="Buscar" color="primary" @click="doSearch" />
    </div>

    <p v-if="store.loading" class="text-center q-mt-lg text-primary text-lg animate-pulse">
      Carregando...
    </p>

    <div v-if="!store.loading && store.gifs.length" class="row q-col-gutter-md justify-center q-mt-xl"
      style="max-width: 1200px; margin: 0 auto;">
      <div v-for="gif in store.gifs" :key="gif.id" class="col-12 col-sm-6 col-md-3">
        <GifCard :gif="gif" :initialFavorited="store.isFavorited(gif.id)"
          @update:favorite="(fav) => handleFavorite(gif, fav)" />
      </div>
    </div>

    <p v-else-if="!store.loading && !store.gifs.length" class="text-center text-gray-500 q-mt-xl">
      Nenhum GIF encontrado.
    </p>
  </q-page>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useGiphyStore } from '../stores/giphyStore'
import GifCard from '../components/GifCard.vue'

const store = useGiphyStore()
const query = ref('')

// Faz a busca se houver termo
const doSearch = async () => {
  await store.searchGifs(query.value)
}

// Se o campo de busca for apagado, volta pro trending
watch(query, val => { if (!val) store.getTrending() })

// Carrega os favoritos quando o componente é montado
onMounted(() => {
  store.loadFavorites()
  store.getTrending()
})

const handleFavorite = (gif) => {
  store.toggleFavorite(gif)
}
</script>