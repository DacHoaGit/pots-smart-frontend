<template>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    @click="$emit('closeDrawer')"
  >
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
    <a-menu-item key="FertilizerCalculator">
      <router-link :to="{ name: 'FertilizerCalculator' }"
        ><span
          ><TeamOutlined class="me-3" :style="{ color: '#08c' }" />Tính toán
          phân bón</span
        ></router-link
      >
    </a-menu-item>

    <a-menu-item key="control">
      <router-link :to="{ name: 'control' }"
        ><span
          ><ControlOutlined class="me-3" :style="{ color: '#08c' }" />Điều khiển</span
        ></router-link
      >
    </a-menu-item>

    <a-menu-item key="shareconfig">
      <router-link :to="{ name: 'shareconfig' }"
        ><span
          ><ControlOutlined class="me-3" :style="{ color: '#08c' }" />Chia sẻ cấu hình</span
        ></router-link
      >
    </a-menu-item>

    <a-menu-item key="timer">
      <router-link :to="{ name: 'timer' }"
        ><span
          ><ControlOutlined class="me-3" :style="{ color: '#08c' }" />Hẹn giờ</span
        ></router-link
      >
    </a-menu-item>

    <a-menu-item key="token_pots">
      <router-link :to="{ name: 'token_pots' }"
        ><span
          ><ToolOutlined class="me-3" :style="{ color: '#08c' }" />Token</span
        >
        </router-link
      >
    </a-menu-item>

  </a-menu>
</template>

<script>
import { InsertRowBelowOutlined, ToolOutlined } from "@ant-design/icons-vue";
import { TeamOutlined } from "@ant-design/icons-vue";
import { ControlOutlined } from "@ant-design/icons-vue";
import { UserOutlined } from "@ant-design/icons-vue";
import { defineComponent } from "vue";
import { useMenu } from "../../stores/menu-store.js";
import { storeToRefs } from "pinia";
export default defineComponent({
  components: {
    InsertRowBelowOutlined,
    TeamOutlined,
    UserOutlined,
    ControlOutlined,
    ToolOutlined
  },

  methods: {
    onCloseDrawer: function () {
      this.$parent.onClose();
    },
  },
  setup() {
    const store = useMenu();
    store.onSelectedKeys(["dashboard"]);
    store.onOpenKeys(["dashboard"]);
    return {
      ...storeToRefs(store),
    };
  },
});
</script>
