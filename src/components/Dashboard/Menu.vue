<template>
  <a-menu

    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    @click="$emit('closeDrawer')"
  >
    <a-menu-item key="device">
      <router-link :to="{ name: 'device' }"
        ><span
          ><ToolOutlined class="me-3" :style="{ color: '#08c' }" />Thiết
          bị</span
        >
      </router-link>
    </a-menu-item>

    <a-menu-item key="dashboard">
      <router-link :to="{ name: 'Overview' }"
        ><span
          ><InsertRowBelowOutlined
            class="me-3"
            :style="{ color: '#08c' }"
          />Tổng quan</span
        ></router-link
      >
    </a-menu-item>
    <a-menu-item key="identified">
      <router-link :to="{ name: 'identified' }"
        ><span
          ><EyeTwoTone class="me-3" :style="{ color: '#08c' }" />Nhận diện
          bệnh cây trồng</span
        ></router-link
      >
    </a-menu-item>

    <a-menu-item key="control">
      <router-link :to="{ name: 'control' }"
        ><span
          ><ControlOutlined class="me-3" :style="{ color: '#08c' }" />Điều
          khiển</span
        ></router-link
      >
    </a-menu-item>

    <a-menu-item key="shareconfig">
      <router-link :to="{ name: 'shareconfig' }"
        ><span
          ><ShareAltOutlined class="me-3" :style="{ color: '#08c' }" />Chia sẻ
          cấu hình</span
        ></router-link
      >
    </a-menu-item>

    <a-menu-item key="timer">
      <router-link :to="{ name: 'timer' }"
        ><span
          ><FieldTimeOutlined class="me-3" :style="{ color: '#08c' }" />Hẹn
          giờ</span
        ></router-link
      >
    </a-menu-item>

    <a-menu-item v-if="userStore.role == 1" key="video">
      <router-link :to="{ name: 'video' }"
        ><span
          ><VideoCameraAddOutlined class="me-3" :style="{ color: '#08c' }" />Video</span
        ></router-link
      >
    </a-menu-item>

    <a-menu-item key="logout">
      <span @click="logout()"
        ><LogoutOutlined class="me-3" :style="{ color: '#08c' }" />Đăng xuất</span
      >
    </a-menu-item>
  </a-menu>
</template>

<script>
import { CiOutlined, InsertRowBelowOutlined, ToolOutlined,EyeTwoTone,ShareAltOutlined,FieldTimeOutlined,VideoCameraAddOutlined,LogoutOutlined } from "@ant-design/icons-vue";
import { TeamOutlined } from "@ant-design/icons-vue";
import { ControlOutlined } from "@ant-design/icons-vue";
import { UserOutlined } from "@ant-design/icons-vue";
import { useUserStore } from "../../stores/user-store";
import Swal from "../../sweetalert2";
import router from "../../routes";
import { defineComponent } from "vue";
import { useMenu } from "../../stores/menu-store.js";
import { storeToRefs } from "pinia";
import axios from "axios";
export default defineComponent({
  components: {
    InsertRowBelowOutlined,
    TeamOutlined,
    UserOutlined,
    ControlOutlined,
    ToolOutlined,
    EyeTwoTone,
    ShareAltOutlined,
    FieldTimeOutlined,
    VideoCameraAddOutlined,
    LogoutOutlined
  },

  methods: {
    onCloseDrawer: function () {
      this.$parent.onClose();
    },
  },
  setup() {
    const store = useMenu();
    store.onSelectedKeys(["device"]);
    store.onOpenKeys(["device"]);
    const userStore = useUserStore();
    console.log(userStore);
    const logout = () => {
      Swal.showLoading();
      axios.get("/api/logout").then((response) => {
        userStore.clearUser();
        Toast.fire({
          icon: "success",
          title: "Đăng xuất thành công",
        });
        router.push({ path: "/login" });
      });
    };
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

    return {
      ...storeToRefs(store),
      logout,
      userStore,
    };
  },
});
</script>
