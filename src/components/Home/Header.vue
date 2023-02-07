<template>
  <div
    style="padding: 0; position: fixed; top: 0; z-index: 2"
    class="container-fluid"
  >
    <div class="row text-white" style="background-color: teal; padding: 1rem">
      <div
        v-if="userStore.token && $route.name !== 'home' "
        @click="showDrawer('default')"
        class="col-3 d-flex d-sm-none align-items-center justify-content-s"
      >
        <span><label
          
            class="hamburger"
            >&#9776;</label
          ></span>
      </div>
      <div v-else class="col-3 col-sm-3 d-sm-none"></div>
      <a-drawer
        title="Dashboard"
        :placement="placement"
        :closable="false"
        :visible="visible"
        :width="width"
        @close="onClose"
      >
        <MenuSidebar @closeDrawer="onClose" />
      </a-drawer>
      <div
        class="col-6 col-sm-6 d-flex align-items-center justify-content-center justify-content-sm-start"
      >
        <router-link :to="{ name: 'home' }">
          <img
            class="ms-3 me-3"
            style="width: 200px"
            src="../../assets/logo.svg"
            alt="logo"
          />
        </router-link>
      </div>
      <div
        class="col-3 d-flex col-sm-6 d-sm-flex align-items-center justify-content-end"
      >
        <div class="nav-links">
          <input type="checkbox" id="checkbox_toggle" />
          <label
            v-if="$route.name === 'home'"
            @click="changeStatusMenu()"
            for="checkbox_toggle"
            class="hamburger"
            >&#9776;</label
          >
          <div
            @click="changeStatusMenu()"
            :class="visible_menu ? 'd-block' : 'd-none'"
            class="menu d-sm-flex"
          >
            <li v-if="$route.name === 'home'">
              <a href="#question" class="nav-item" active-color="DarkKhaki"
                >Giới thiệu</a
              >
            </li>
            
            <li v-if="$route.name === 'home'">
              <a href="#feature" class="nav-item" active-color="DarkKhaki"
                >Chức năng</a
              >
            </li>
            <li v-if="$route.name === 'home'">
              <a href="#video" class="nav-item" active-color="DarkKhaki"
                >Video</a
              >
            </li>
            <li  v-if="userStore.id && $route.name === 'home'">
              <router-link :to="{ name: 'device' }">
                <a class="nav-item" active-color="LimeGreen">Quản Lý</a>
              </router-link>
            </li>
            <li v-if="!userStore.id">
              <router-link :to="{ name: 'register' }">
                <a class="nav-item" active-color="LimeGreen">Đăng Kí</a>
              </router-link>
            </li>
            <li v-if="!userStore.id">
              <router-link :to="{ name: 'login' }">
                <a class="nav-item" active-color="LimeGreen">Đăng Nhập</a>
              </router-link>
            </li>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../../stores/user-store";
import { MenuOutlined, UserOutlined } from "@ant-design/icons-vue";
import MenuUser from "../Dashboard/MenuUser.vue";
import { notification } from "ant-design-vue";
import MenuSidebar from "../Dashboard/Menu.vue";
import { useRouter } from "vue-router";

import axios from "axios";

const userStore = useUserStore();
const router = useRouter();
const visible = ref(false);
const visible_user = ref(false);
const placement = ref("left");
const size = ref("default");

const visible_menu = ref(false);
const changeStatusMenu = () => {
  visible_menu.value = !visible_menu.value;
};

const showDrawer = () => {
  size.value = size;
  visible.value = true;
};
const showDrawerUser = () => {
  size.value = size;
  visible_user.value = true;
};
const width = ref((2 * screen.width) / 3);
const onClose = () => {
  visible.value = false;
  visible_user.value = false;
};
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
</script>

<style scoped>
input[type="checkbox"] {
  display: none;
}
.hamburger {
  display: none;
  font-size: 24px;
  user-select: none;
}
.nav-links li {
  list-style: none;
  display: inline-block;
}
.nav-item {
  /* font-size: 30px; */
  color: #fff;
  font-size: 18px;
  padding: 0 24px 0 24px;
}

@media (max-width: 768px) {
  .menu {
    display: none;
    position: absolute;
    background-color: teal;
    opacity: 0.8;
    right: 0;
    left: 0;
    text-align: center;
    padding: 16px 0;
    border-radius: 20px;
  }
  .nav-links li {
    list-style: none;
    display: block;
    margin-top: 12px;
  }
  .nav-links li {
    list-style: none;
    display: block;
    margin-top: 12px;
  }
  .menu li:hover {
    display: inline-block;
    background-color: #4c9e9e;
    transition: 0.3s ease;
  }

  input[type="checkbox"]:checked ~ .menu {
    display: block;
    transition: all 10s ease;
  }

  .hamburger {
    display: block;
  }
}

.nav-item:hover {
  cursor: pointer;
  background-color: #4c9e9e;
  border-radius: 5px;
  padding: 5px 14px;
  transition: 0.3s ease;
}
.ant-btn.ant-btn-background-ghost,
.ant-btn.ant-btn-background-ghost:hover,
.ant-btn.ant-btn-background-ghost:active,
.ant-btn.ant-btn-background-ghost:focus {
  margin-left: 16px;
}
.ant-drawer .ant-drawer-content {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
