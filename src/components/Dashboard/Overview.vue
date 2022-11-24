<template>
  <a-card title="Tổng quan" style="width: 100">
    <div class="row">
      <div class="col-sm-3 col-6">
        <a-card
          class="mt-2 rounded border border-danger"
          :hoverable="true"
          title=" đất"
          :bordered="true"
        >
          <div class="d-flex justify-content-center align-items-center">
            <div class="d-flex justify-content-center" style="font-size: 30px">
              <span class="nhietdo ">100</span>&deg;C
            </div>
          </div>
          <div>Bình thường</div>
        </a-card>
      </div>

      <div class="col-sm-3 col-6">
        <a-card
          class="mt-2 rounded border border-danger"
          :hoverable="true"
          title="1"
          :bordered="true"
        >
          <div class="d-flex justify-content-center align-items-center">
            <div class="d-flex justify-content-center" style="font-size: 30px">
              <span class="nhietdo">1</span>&deg;C
            </div>
          </div>
          <div>Bình thường</div>
        </a-card>
      </div>

      <div class="col-sm-3 col-6">
        <a-card
          class="mt-2 rounded border border-danger"
          :hoverable="true"
          title="Độ ẩm đất"
          :bordered="true"
        >
          <div class="d-flex justify-content-center align-items-center">
            <div class="d-flex justify-content-center" style="font-size: 30px">
              <span class="nhietdo">100</span>&deg;C
            </div>
          </div>
          <div>Bình thường</div>

        </a-card>
      </div>

      <div class="col-sm-3 col-6">
        <a-card
          class="mt-2 rounded border border-danger"
          :hoverable="true"
          title="Độ ẩm đất"
          :bordered="true"
        >
          <div class="d-flex justify-content-center align-items-center">
            <div class="d-flex justify-content-center" style="font-size: 30px">
              <span class="nhietdo">100</span>&deg;C
            </div>
          </div>
          <div>Bình thường</div>

        </a-card>
      </div>
    </div>
  </a-card>
</template>

<script setup>
import { useMenu } from "../../stores/menu-store";
useMenu().onSelectedKeys(["dashboard"]);
useMenu().onOpenKeys(["dashboard"]);
</script>
