<template>
  <q-page class="q-pa-md">
    <!-- Lista de GIFs favoritos -->
    <div v-if="!store.loading && store.favorites.length"
      class="row q-col-gutter-md justify-center q-mt-xl"
      style="max-width: 1200px; margin: 0 auto;">
      <div v-for="gif in store.favorites" :key="gif.id" class="col-12 col-sm-6 col-md-3">
        <GifCard :gif="gif" :initialFavorited="true"
          @update:favorite="(fav) => handleFavorite(gif, fav)" />
      </div>
    </div>

    <!-- Nenhum favorito -->
    <div v-else-if="!store.loading && !store.favorites.length" class="text-center text-gray-500 q-mt-xl">
      <q-icon name="favorite_border" size="lg" color="grey-6" class="q-mb-sm" />
      <p>Nenhum GIF favorito ainda</p>
    </div>

    <!-- Loading -->
    <div v-if="store.loading" class="text-center q-mt-lg text-primary text-lg animate-pulse">
      Carregando...
    </div>
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue'
import { useGiphyStore } from '../stores/giphyStore'
import GifCard from '../components/GifCard.vue'

const store = useGiphyStore()

// Carrega os favoritos quando o componente é montado
onMounted(() => {
  store.loadFavorites()
})

const handleFavorite = (gif) => {
  store.toggleFavorite(gif)
}
</script>