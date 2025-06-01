const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '', name: 'home', component: () => import('pages/HomePage.vue') },
      { path: 'favoritos', name: 'favoritos', component: () => import('pages/FavoritosPage.vue') },
      { path: 'categorias', name: 'categorias', component: () => import('pages/CategoriasPage.vue') },
      { path: 'sobre', name: 'sobre', component: () => import('pages/SobrePage.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
