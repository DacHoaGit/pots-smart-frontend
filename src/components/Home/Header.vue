<template>
  <div class="container-fluid p-0">
    <div
      class="row text-white"
      style="background-color: #0c713d; padding: 1rem"
    >
      <div
        @click="showDrawer('default')"
        class="col-4 d-flex d-sm-none align-items-center justify-content-s"
      >
        <span><MenuOutlined /></span>
      </div>
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
        class="col-4 col-sm-6 d-flex align-items-center justify-content-center justify-content-sm-start"
      >
        <img
          class="ms-3 me-3"
          height="34"
          width="34"
          src="https://aliyuncdn.antdv.com/logo.png"
          alt="logo"
        />
        <div class="d-none d-sm-flex">POTS SMART</div>
      </div>
      <div
        class="col-4 d-flex col-sm-6 d-sm-flex align-items-center justify-content-end">
          <img @click="showDrawerUser" src="../../assets/user.svg" alt="" width="40">
        <a-drawer
          title="Dashboard"
          placement="right"
          :closable="false"
          :visible="visible_user"
          :width="200"
          @close="onClose"
        >
          <MenuUser @closeDrawer="onClose" />
        </a-drawer>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../../stores/user-store";
import { MenuOutlined, UserOutlined } from "@ant-design/icons-vue";
import MenuUser from "../Dashboard/MenuUser.vue"
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
.ant-btn.ant-btn-background-ghost,
.ant-btn.ant-btn-background-ghost:hover,
.ant-btn.ant-btn-background-ghost:active,
.ant-btn.ant-btn-background-ghost:focus {
  margin-left: 16px;
}
.ant-drawer .ant-drawer-content{
  background-color: rgba(0,0,0,0.5);
}
</style>
