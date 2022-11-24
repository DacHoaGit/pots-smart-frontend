import axios from 'axios'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    id: null,
    token: null,
    name: null,
    email: null,
  }),
  actions: {
    setUserDetails(res) {
        this.$state.id = res.data.user.id
        this.$state.token = res.data.token
        this.$state.name = res.data.user.name
        this.$state.email = res.data.user.email
    },
    async fetchUser() {
        let res = await axios.get('api/user/' + this.$state.id)

        this.$state.id = res.data.user.id
        this.$state.name = res.data.user.name
        this.$state.email = res.data.user.email
    },
    clearUser() {
        this.$state.id = null
        this.$state.token = null
        this.$state.name = null
        this.$state.email = null
    }
  },
  persist: true
})