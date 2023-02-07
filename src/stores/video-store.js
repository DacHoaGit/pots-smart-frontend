import axios from 'axios'
import { defineStore } from 'pinia'

export const useVideoStore = defineStore('video', {
  state: () => ({
    videos: null,
  }),
  actions: {
    async fetchVideos() {
        let res = await axios.get('api/videos')
        this.$state.videos = res.data
    },
    clearVideo() {
        this.$state.videos = null
    }
  },
  persist: true
})