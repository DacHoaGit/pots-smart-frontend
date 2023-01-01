import axios from 'axios'
import { defineStore } from 'pinia'

export const useTimerStore = defineStore('timer', {
  state: () => ({
    timers: null,
  }),
  actions: {
    async fetchTimersByUser() {
        let res = await axios.get('api/timers')
        this.$state.timers = res.data
    },
    clearTimer() {
        this.$state.timers = null
    }
  },
  persist: true
})