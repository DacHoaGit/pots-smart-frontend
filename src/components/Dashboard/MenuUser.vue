<template>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    @click="$emit('closeDrawer')">
    <a-menu-item v-if="!userStore.id" key="register">
        <router-link :to="{ name: 'register' }">
            <span><InsertRowBelowOutlined class="me-3" :style="{ color: '#08c' }" />Đăng kí</span>
        </router-link>
    </a-menu-item>
    <a-menu-item v-if="!userStore.id" key="Login">
    <router-link :to="{ name: 'login' }">
        <span><TeamOutlined class="me-3" :style="{ color: '#08c' }" />Đăng nhập</span>
    </router-link>
    </a-menu-item>
    <a-menu-item @click="logout" v-if="userStore.id" key="logout">
      <span><TeamOutlined class="me-3" :style="{ color: '#08c' }" />Đăng xuất</span>
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
import { notification } from "ant-design-vue";
import axios from "axios";

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
    const openNotificationWithIcon = (type) => {
        notification[type]({
            message: "Đăng xuất thành công",
            duration: 2.5,
            description: "",
        });
    };
    const logout = () => {
        axios
        .post("/api/logout", { user_id: userStore.id })
        .then((response) => {
        if (response) {
            if (!response.data.error) {
            openNotificationWithIcon("success");
            userStore.clearUser();
            router.push({ path: "/" });
            onClose();
            } else message.error("Đăng nhập thất bại");
        }
        })
        .catch((error) => {
        console.log(error);
        });
    };
    return {
        logout,
      ...storeToRefs(store),
      userStore
    };
  },
});
</script>
