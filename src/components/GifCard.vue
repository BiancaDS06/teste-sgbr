<template>
  <div class="gif-card">
    <img
      v-if="gif?.images?.fixed_width"
      :src="gif.images.fixed_width.url"
      :alt="gif.title"
    />

    <div v-else class="text-red">GIF sem imagem 🙈</div>

    <button @click="toggleFavorite">
      {{ isFavorited ? 'Desfavoritar' : 'Favoritar' }}
    </button>
  </div>
</template>


<script setup>
import { ref } from 'vue'

const props = defineProps({
  gif: Object,
  initialFavorited: Boolean
})

const emit = defineEmits(['update:favorite'])

const isFavorited = ref(props.initialFavorited || false)

function toggleFavorite() {
  isFavorited.value = !isFavorited.value
  emit('update:favorite', isFavorited.value)
}
</script>



<style scoped>
.gif-card {
  border: 1px solid #ccc;
  padding: 8px;
  margin: 8px;
  width: 200px;
  text-align: center;
}
.gif-card img {
  width: 100%;
  height: auto;
  border-radius: 4px;
}
.gif-card button {
  margin-top: 6px;
  padding: 6px 12px;
  cursor: pointer;
}
</style>
