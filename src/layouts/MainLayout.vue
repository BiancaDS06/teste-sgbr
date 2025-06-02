<template>
  <q-layout view="lHh Lpr lFf">
    <!-- TOPBAR -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar class="w-full items-center justify-between">
        <div>
          <q-btn flat dense round icon="menu" aria-label="Menu" class="q-mr-sm" @click="toggleDrawer" />
          <a href="https://sgnaweb.com.br" target="_blank" rel="noopener noreferrer">
            <q-img src="img/logo.png" width="50px" class="px-2" />
          </a>
        </div>
        <div class="row items-center q-gutter-x-sm">
          <div class="text-sm text-gray-500">Desenvolvido por Bianca Dias</div>
          <q-avatar size="40px">
            <img src="img/bianca-dias.png" alt="Bianca Dias" />
          </q-avatar>
        </div>
      </q-toolbar>
    </q-header>

    <!-- NAVBAR LATERAL -->
    <q-drawer v-model="drawer" side="left" bordered :width="$q.screen.lt.md ? '100%' : 260" :style="{ backgroundColor: '#001337'}" z-max>
      <q-list class="q-mt-xl">
        <q-item class="text-white" active-class="q-item--active-custom" clickable :to="{ name: 'home' }" exact v-ripple @click="handleMenuClick">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>Home</q-item-section>
        </q-item>

        <q-item class="text-white" active-class="q-item--active-custom" clickable :to="{ name: 'favoritos' }" exact v-ripple @click="handleMenuClick">
          <q-item-section avatar>
            <q-icon name="favorite" />
          </q-item-section>
          <q-item-section>Favoritos</q-item-section>
        </q-item>

        <q-item class="text-white" active-class="q-item--active-custom" clickable :to="{ name: 'categorias' }" exact v-ripple @click="handleMenuClick">
          <q-item-section avatar>
            <q-icon name="category" />
          </q-item-section>
          <q-item-section>Categorias</q-item-section>
        </q-item>

        <q-item class="text-white" active-class="q-item--active-custom" clickable :to="{ name: 'sobre' }" exact v-ripple @click="handleMenuClick">
          <q-item-section avatar>
            <q-icon name="info" />
          </q-item-section>
          <q-item-section>Sobre</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- CONTEÚDO DAS PÁGINAS -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>


<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const drawer = ref($q.screen.gt.sm)  // true em telas grandes, false em pequenas

function toggleDrawer() {
  drawer.value = !drawer.value
}

function handleMenuClick() {
  if (!$q.screen.gt.sm) {
    drawer.value = false
  }
}

</script>


