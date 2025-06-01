<template>
  <q-page class="q-pa-md">
    <h2 class="text-h5">GIFs Favoritos</h2>

    <div v-if="favoritos.length === 0">
      Nenhum GIF favoritado ainda.
    </div>

    <div class="row q-col-gutter-md">
      <GifCard
        v-for="gif in favoritos"
        :key="gif.id"
        :gif="gif"
        :initialFavorited="true"
        @update:favorite="() => removerFavorito(gif.id)"
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { LocalStorage } from 'quasar'
import GifCard from '../components/GifCard.vue'

// lista reativa de GIFs favoritos
const favoritos = ref([])

// carregar os favoritos salvos no navegador
onMounted(() => {
  favoritos.value = LocalStorage.getItem('favorites') || []
})

// função para remover GIF dos favoritos
function removerFavorito(id) {
  favoritos.value = favoritos.value.filter(gif => gif.id !== id)
  LocalStorage.set('favorites', favoritos.value)
}
</script>
