import axios from 'axios'
import { defineStore } from 'pinia'

export const useDeviceStore = defineStore('device', {
  state: () => ({
    devices: null,
  }),
  actions: {
    async fetchDevicesByUser() {
        let res = await axios.get('api/devices')
        this.$state.devices = res.data
    },
    clearDevice() {
        this.$state.devices = null
    }
  },
  persist: true
})