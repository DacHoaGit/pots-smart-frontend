<template>
    <a-card title="Token Pots" style="width: 100">
        <div class="row mb-4">
            <div class="col-12 col-sm-3 text-start text-sm-end">
            <label>
                <span class="text-uppercase me-1">Token của bạn</span>
            </label>
            </div>
            <div  class="col-12 col-sm-6">
                <a-input class="w-75" readonly="readonly" :value="userStore.token_pots"/>
                <a-tooltip @click="copyToken" title="copy">
                    <a-button>
                        <template #icon><CopyOutlined /></template>
                    </a-button>
                </a-tooltip>
            </div>
        </div>
        <div class="row mt-4">
            <div>
                <WarningOutlined  style="color: red;font-size: 24px;"/>
                <span style="margin-left:12px;font-size: 16px; font-weight: bold; color: red;">Lưu ý</span>
            </div>
        </div>
        <div class="row mt-4">
            <span>Cần nhập chính xác token này khi trong trang cấu hình wifi và token</span>
        </div>
    </a-card>
</template>

<script setup>
import { CopyOutlined, WarningOutlined } from "@ant-design/icons-vue";
import { useMenu } from "../../stores/menu-store";
import { useUserStore } from "../../stores/user-store"
import { ref } from "vue"
useMenu().onSelectedKeys(["token_pots"]);
useMenu().onOpenKeys(["token_pots"]);
    const userStore = useUserStore();
    const copyToken = () => {
        navigator.clipboard.writeText(userStore.token_pots);
    }
</script>