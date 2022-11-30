<template>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    @click="$emit('closeDrawer')"
  >
    <a-menu-item v-if="!userStore.id" key="register">
      <router-link :to="{ name: 'register' }">
        <span
          ><InsertRowBelowOutlined
            class="me-3"
            :style="{ color: '#08c' }"
          />Đăng kí</span
        >
      </router-link>
    </a-menu-item>
    <a-menu-item v-if="!userStore.id" key="Login">
      <router-link :to="{ name: 'login' }">
        <span
          ><TeamOutlined class="me-3" :style="{ color: '#08c' }" />Đăng
          nhập</span
        >
      </router-link>
    </a-menu-item>
    <a-menu-item @click="logout" v-if="userStore.id" key="logout">
      <span
        ><TeamOutlined class="me-3" :style="{ color: '#08c' }" />Đăng xuất</span
      >
    </a-menu-item>
  </a-menu>
</template>

<script>
import { InsertRowBelowOutlined } from "@ant-design/icons-vue";
import { TeamOutlined } from "@ant-design/icons-vue";
import { UserOutlined } from "@ant-design/icons-vue";
import { defineComponent } from "vue";
import { useMenu } from "../../stores/menu-store.js";
import { useUserStore } from "../../stores/user-store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "../../sweetalert2";


export default defineComponent({
  components: {
    InsertRowBelowOutlined,
    TeamOutlined,
    UserOutlined,
  },

  methods: {
    onCloseDrawer: function () {
      this.$parent.onClose();
    },
  },
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const store = useMenu();
    store.onSelectedKeys(["logout"]);
    store.onOpenKeys(["logout"]);
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    const logout = () => {
      axios
        .post("/api/logout", { user_id: userStore.id })
        .then((response) => {
          if (response) {
            if (!response.data.error) {
              Toast.fire({
                icon: "success",
                title: "Đăng xuất thành công",
              });
              userStore.clearUser();
              router.push({ path: "/login" });
            } else {
              Toast.fire({
                icon: "error",
                title: "Đăng xuất thành công",
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    return {
      logout,
      ...storeToRefs(store),
      userStore,
    };
  },
});
</script>
