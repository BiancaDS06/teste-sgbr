<template>
  <q-card
    class="w-full h-[280px] flex flex-col justify-between rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-200"
    flat>
    <q-img v-if="gif?.images?.fixed_width" :src="gif.images.fixed_width.url" :alt="gif.title"
      class="w-full h-[220px] object-cover" />
    <div v-else class="w-full h-[220px] flex items-center justify-center text-red-500 bg-gray-100">
      GIF sem imagem 🙈
    </div>

    <q-card-section class="flex items-center justify-between px-2" style="width: 100%;">
      <div class="text-xs truncate"
        style="max-height: 40px; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;"
        title="gif.title">
        {{ gif.title || 'Sem título' }}
      </div>

      <q-btn dense flat round @click="toggleFavorite" :icon="isFavorited ? 'favorite' : 'favorite_border'"
        :color="isFavorited ? 'red' : 'grey-6'" class="transition duration-200" aria-label="Favoritar" />
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  gif: { type: Object, required: true },
  initialFavorited: Boolean
})

const emit = defineEmits(['update:favorite'])

const isFavorited = ref(props.initialFavorited || false)

watch(
  () => props.initialFavorited,
  val => { isFavorited.value = val }
)

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
