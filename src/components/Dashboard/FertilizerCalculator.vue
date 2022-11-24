<template>
    <a-card title="Tính toán phân bón" style="width: 100"></a-card>
</template>

<script setup>
import { useMenu } from "../../stores/menu-store";
useMenu().onSelectedKeys(["FertilizerCalculator"]);
useMenu().onOpenKeys(["FertilizerCalculator"]);
</script>