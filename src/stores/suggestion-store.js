import axios from "axios";
import { defineStore } from "pinia";

export const useSuggestionStore = defineStore("suggestion", {
  state: () => ({
    suggestions: null,
    all_suggestions: null,
  }),
  actions: {
    async fetchSuggestions() {
      let res = await axios.get("api/suggestions");
      this.$state.suggestions = res.data;
    },
    async fetchAllSuggestions() {
      let res = await axios.get("api/list-suggestions");
      this.$state.all_suggestions = res.data;
    },
    suggestionImage(image) {
      return import.meta.env.VITE_APP_API_URL + "/images/suggestions/" + image;
    },
    clearSuggestion() {
      this.$state.suggestions = null;
    },
  },
  persist: true,
});
