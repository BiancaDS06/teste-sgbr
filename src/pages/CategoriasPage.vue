<script setup>
import { ref, onMounted } from 'vue'
import { useGiphyStore } from '../stores/giphyStore'
import GifCard from '../components/GifCard.vue'

const store = useGiphyStore()
const selectedCategory = ref(null)

onMounted(async () => {
  await store.loadCategories()
})

const selectCategory = async (category) => {
  selectedCategory.value = category
  await store.getGifsByCategoryName(category.name)
}

const handleFavorite = (gif) => {
  store.toggleFavorite(gif)
}
</script>

<template>
  <q-page class="q-pa-md">
    <div v-if="store.loading" class="text-center q-mt-lg text-primary text-lg animate-pulse">
      Carregando...
    </div>

    <div v-else-if="!selectedCategory">
      <h1 class="text-h5 q-mb-md">Categorias</h1>
      <div class="row q-col-gutter-md">
        <div v-for="category in store.categories" :key="category.name_encoded" class="col-12 col-sm-6 col-md-4">
          <q-card class="q-mb-md cursor-pointer" @click="selectCategory(category)">
            <q-img :src="category.gif.images.original.webp" style="height: 200px;" />
            <q-card-section>
              <p class="text-h6">{{ category.name }}</p>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <div v-else>
      <h1 class="text-h5 q-mb-md">{{ selectedCategory.name }}</h1>
      <div class="row q-col-gutter-md justify-center q-mt-xl" style="max-width: 1200px; margin: 0 auto;">
        <div v-for="gif in store.gifs" :key="gif.id" class="col-12 col-sm-6 col-md-3">
          <GifCard :gif="gif" :initialFavorited="store.isFavorited(gif.id)"
            @update:favorite="fav => handleFavorite(gif, fav)" />
        </div>
      </div>

      <div class="q-mt-md text-center">
        <q-btn label="Voltar para Categorias" color="primary" @click="selectedCategory = null" />
      </div>

      <p v-if="!store.loading && !store.gifs.length" class="text-center text-gray-500 q-mt-xl">
        Nenhum GIF encontrado nesta categoria.
      </p>
    </div>
  </q-page>
</template>