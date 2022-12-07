import axios from 'axios'
import { defineStore } from 'pinia'

export const useSuggestionStore = defineStore('suggestion', {
  state: () => ({
    suggestions: null,
    suggestionsbyuser: null
  }),
  actions: {
    async fetchSuggestionsByUser() {
        let res = await axios.get('api/suggestionsbyuser')
        this.$state.suggestionsbyuser = res.data
    },
    async fetchSuggestions() {
        let res = await axios.get('api/suggestions')
        this.$state.suggestions = res.data
    },

    suggestionImage(image) {
      return import.meta.env.VITE_APP_API_URL + '/images/suggestions/' + image
    },

    clearSuggestion() {
        this.$state.suggestionsbyuser = null
        this.$state.suggestions = null
    }
  },
  persist: true
})