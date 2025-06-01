import { defineStore } from 'pinia'
import axios from 'axios'
import { LocalStorage } from 'quasar'

const API_KEY = import.meta.env.VITE_GIPHY_API_KEY
const BASE_URL = 'https://api.giphy.com/v1'

export const useGiphyStore = defineStore('giphy', {
  state: () => ({
    gifs: [],
    favorites: [],
    loading: false,
    error: null,
  }),

  getters: {
    isFavorited: (state) => (id) => {
      return state.favorites.some(gif => gif.id === id)
    },
  },

  actions: {
    async getTrending() {
      this.loading = true
      try {
        const response = await axios.get(`${BASE_URL}/gifs/trending`, {
          params: {
            api_key: API_KEY,
            limit: 12
          }
        })
        this.gifs = response.data.data
        return this.gifs
      } catch (error) {
        this.error = error.message
        console.error('Erro ao buscar trending:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async searchGifs(query) {
      this.loading = true
      try {
        const response = await axios.get(`${BASE_URL}/gifs/search`, {
          params: {
            api_key: API_KEY,
            q: query,
            limit: 25
          }
        })
        this.gifs = response.data.data
        return this.gifs
      } catch (error) {
        this.error = error.message
        console.error('Erro na busca:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async getCategories() {
      this.loading = true
      try {
        const response = await axios.get(`${BASE_URL}/gifs/categories`, {
          params: {
            api_key: API_KEY
          }
        })
        return response.data.data
      } catch (error) {
        this.error = error.message
        console.error('Erro ao buscar categorias:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    toggleFavorite(gif) {
      try {
        // Carrega os favoritos existentes
        const stored = LocalStorage.getItem('favorites')
        let favorites = []

        // Se tiver algum valor, tenta parsear
        if (stored) {
          try {
            const parsed = JSON.parse(stored)
            if (Array.isArray(parsed)) {
              favorites = parsed
            }
          } catch (error) {
            console.error('Erro ao parsear favoritos:', error)
          }
        }

        // Atualiza os favoritos
        if (this.isFavorited(gif.id)) {
          // Remove apenas o item clicado
          favorites = favorites.filter(item => item.id !== gif.id)
        } else {
          // Adiciona apenas se não existir
          if (!favorites.some(item => item.id === gif.id)) {
            favorites.push(gif)
          }
        }

        // Salva no localStorage
        LocalStorage.set('favorites', JSON.stringify(favorites))
        this.favorites = favorites

      } catch (error) {
        console.error('Erro ao atualizar favoritos:', error)
        // Se der erro, mantém os favoritos atuais
        this.loadFavorites()
      }
    },

    loadFavorites() {
      try {
        const stored = LocalStorage.getItem('favorites')
        let favorites = []

        // Se tiver algum valor, tenta parsear
        if (stored) {
          try {
            const parsed = JSON.parse(stored)
            if (Array.isArray(parsed)) {
              favorites = parsed
            }
          } catch (error) {
            console.error('Erro ao parsear favoritos:', error)
          }
        }

        this.favorites = favorites
      } catch (error) {
        console.error('Erro ao carregar favoritos:', error)
        this.favorites = []
      }
    }
  }
})
