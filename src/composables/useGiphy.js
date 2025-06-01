import { ref } from 'vue'
import { useQuasar } from 'quasar'

const API_KEY = import.meta.env.VITE_GIPHY_API_KEY
const BASE_URL = 'https://api.giphy.com/v1'

export function useGiphy() {
  const $q = useQuasar()
  const loading = ref(false)

  const getTrending = async () => {
    loading.value = true
    try {
      const res = await fetch(`${BASE_URL}/gifs/trending?api_key=${API_KEY}&limit=10`)
      const data = await res.json()
      return data.data
    } catch (err) {
      console.error('Erro ao buscar trending:', err)
      $q.notify({ type: 'negative', message: 'Erro ao carregar trending GIFs' })
      return []
    } finally {
      loading.value = false
    }
  }

  const searchGifs = async (query) => {
    loading.value = true
    try {
      const res = await fetch(`${BASE_URL}/gifs/search?api_key=${API_KEY}&q=${query}&limit=25`)
      const data = await res.json()
      return data.data
    } catch (err) {
      console.error('Erro na busca:', err)
      $q.notify({ type: 'negative', message: 'Erro ao buscar GIFs' })
      return []
    } finally {
      loading.value = false
    }
  }

  const getCategories = async () => {
    loading.value = true
    try {
      const res = await fetch(`${BASE_URL}/gifs/categories?api_key=${API_KEY}`)
      const data = await res.json()
      return data.data
    } catch (err) {
      console.error('Erro ao buscar categorias:', err)
      $q.notify({ type: 'negative', message: 'Erro ao carregar categorias' })
      return []
    } finally {
      loading.value = false
    }
  }

  const getByCategory = async (category) => {
    loading.value = true
    try {
      const res = await fetch(`${BASE_URL}/gifs/search?api_key=${API_KEY}&q=${category}&limit=25`)
      const data = await res.json()
      return data.data
    } catch (err) {
      console.error('Erro ao buscar por categoria:', err)
      $q.notify({ type: 'negative', message: 'Erro ao buscar categoria' })
      return []
    } finally {
      loading.value = false
    }
  }

  return {
    getTrending,
    searchGifs,
    getCategories,
    getByCategory,
    loading,
  }
}
