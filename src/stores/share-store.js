import axios from "axios";
import { defineStore } from "pinia";

export const useShareStore = defineStore("share", {
  state: () => ({
    shares: null,
    shared_list: null,
    shared_comfirm_list: null,
  }),
  actions: {
    async fetchSharesByUser() {
      let res = await axios.get("api/shares");
      this.$state.shares = res.data;
    },
    async fetchSharedComfirmList() {
      let res = await axios.get("api/shared-comfirm-list");
      this.$state.shared_comfirm_list = res.data;
    },
    async fetchSharedList() {
      let res = await axios.get("api/shared-list");
      this.$state.shared_list = res.data;
    },
    clearShare() {
      this.$state.shares = null;
    },
  },
  persist: true,
});
