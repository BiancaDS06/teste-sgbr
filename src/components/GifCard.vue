<template>
  <q-card
    class="full-width q-mb-md q-pa-none"
    style="height: 300px;">
    <div class="column no-wrap justify-center items-center">
      <q-img v-if="gif?.images?.fixed_width" :src="gif.images.fixed_width.url" :alt="gif.title"
        style="height: 240px;" />
      <div v-else class="text-red-500 bg-gray-100"
        style="height: 240px;">
        <span class="text-h6">GIF sem imagem 🙈</span>
      </div>
    </div>

    <q-card-section class="q-pa-sm">
      <div class="text-subtitle2 text-grey-8 text-center"
        style="max-height: 30px; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical;">
        {{ gif.title || 'Sem título' }}
      </div>
      <div class="flex justify-center q-mt-xs">
        <q-btn dense round flat @click="toggleFavorite" :icon="isFavorited ? 'favorite' : 'favorite_border'"
          :color="isFavorited ? 'red' : 'grey'" size="sm" />
      </div>
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
  transition: all 0.3s ease;
}

.gif-card:hover {
  transform: translateY(-5px);
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
