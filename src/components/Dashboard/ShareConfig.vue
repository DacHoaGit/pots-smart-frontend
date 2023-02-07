<template>
  <a-card title="Cấu hình của bạn" style="width: 100">
    <div class="row">
      <div class="col-12">
        <a-table
          :columns="columns"
          :data-source="data"
          :scroll="{ x: 1200, y: 300 }"
          class="components-table-demo-nested"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'image'">
              <img
                v-if="record.image"
                style="width: 50px"
                :src="record.image"
                alt=""
              />
            </template>
            <template v-if="column.key === 'operation'">
              <a-button
                style="margin-right: 8px; border-color: aqua"
                @click="useSuggestion(record)"
                >Sử dụng</a-button
              >
              <a-button
                style="margin-right;: 8px;border-color: red"
                @click="deleteSuggestion(record.key)"
                >Xóa</a-button
              >
            </template>
          </template>
          <template #expandedRowRender="{ record }">
            <div class="row d-flex">
              <div class="col-6">
                <p style="color: green; font-size: 16px" class="text-center">
                  Bơm
                </p>
                <p v-if="record.nhiet_do_bom_min && record.nhiet_do_bom_max">
                  Nhiệt độ: {{ record.nhiet_do_bom_min }} đến
                  {{ record.nhiet_do_bom_max }}
                </p>
                <p v-else>Nhiệt độ: Không sử dụng</p>

                <p v-if="record.nhiet_do_bom_min && record.nhiet_do_bom_max">
                  Độ ẩm đất: {{ record.do_am_dat_bom_min }} đến
                  {{ record.do_am_dat_bom_max }}
                </p>
                <p v-else>Độ ẩm đất: Không sử dụng</p>

                <p v-if="record.nhiet_do_bom_min && record.nhiet_do_bom_max">
                  Độ ẩm không khí: {{ record.do_am_khong_khi_bom_min }} đến
                  {{ record.do_am_khong_khi_bom_max }}
                </p>
                <p v-else>Độ ẩm không khí: Không sử dụng</p>
              </div>
              <div class="col-6">
                <p style="color: red; font-size: 16px" class="text-center">
                  Đèn
                </p>
                <p v-if="record.nhiet_do_den_min && record.nhiet_do_den_max">
                  Nhiệt độ: {{ record.nhiet_do_den_min }} đến
                  {{ record.nhiet_do_den_max }}
                </p>
                <p v-else>Nhiệt độ: Không sử dụng</p>

                <p v-if="record.nhiet_do_den_min && record.nhiet_do_den_max">
                  Độ ẩm đất: {{ record.do_am_dat_den_min }} đến
                  {{ record.do_am_dat_den_max }}
                </p>
                <p v-else>Độ ẩm đất: Không sử dụng</p>

                <p v-if="record.nhiet_do_den_min && record.nhiet_do_den_max">
                  Độ ẩm không khí: {{ record.do_am_khong_khi_den_min }} đến
                  {{ record.do_am_khong_khi_den_max }}
                </p>
                <p v-else>Độ ẩm không khí: Không sử dụng</p>
              </div>
            </div>
          </template>
        </a-table>
      </div>
    </div>
  </a-card>

  <a-card title="Cấu hình được chia sẻ" style="width: 100">
    <div class="row">
      <div class="col-12">
        <a-table
          :columns="columns"
          :data-source="dataShare"
          :scroll="{ x: 1200, y: 300 }"
          class="components-table-demo-nested"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'image'">
              <img
                v-if="record.image"
                style="width: 50px"
                :src="record.image"
                alt=""
              />
            </template>
            <template v-if="column.key === 'operation'">
              <a-button
                style="margin-right: 8px; border-color: aqua"
                @click="useSuggestion(record)"
                >Sử dụng</a-button
              >
            </template>
            <template v-if="column.key === 'rate'">
              <span>
                <a-rate v-model:value="value" :tooltips="desc" />
                <span class="ant-rate-text">{{ desc[value - 1] }}</span>
              </span>
            </template>
          </template>
          <template #expandedRowRender="{ record }">
            <div class="row d-flex">
              <div class="col-6">
                <p style="color: green; font-size: 16px" class="text-center">
                  Bơm
                </p>
                <p v-if="record.nhiet_do_bom_min && record.nhiet_do_bom_max">
                  Nhiệt độ: {{ record.nhiet_do_bom_min }} đến
                  {{ record.nhiet_do_bom_max }}
                </p>
                <p v-else>Nhiệt độ: Không sử dụng</p>

                <p v-if="record.nhiet_do_bom_min && record.nhiet_do_bom_max">
                  Độ ẩm đất: {{ record.do_am_dat_bom_min }} đến
                  {{ record.do_am_dat_bom_max }}
                </p>
                <p v-else>Độ ẩm đất: Không sử dụng</p>

                <p v-if="record.nhiet_do_bom_min && record.nhiet_do_bom_max">
                  Độ ẩm không khí: {{ record.do_am_khong_khi_bom_min }} đến
                  {{ record.do_am_khong_khi_bom_max }}
                </p>
                <p v-else>Độ ẩm không khí: Không sử dụng</p>
              </div>
              <div class="col-6">
                <p style="color: red; font-size: 16px" class="text-center">
                  Đèn
                </p>
                <p v-if="record.nhiet_do_den_min && record.nhiet_do_den_max">
                  Nhiệt độ: {{ record.nhiet_do_den_min }} đến
                  {{ record.nhiet_do_den_max }}
                </p>
                <p v-else>Nhiệt độ: Không sử dụng</p>

                <p v-if="record.nhiet_do_den_min && record.nhiet_do_den_max">
                  Độ ẩm đất: {{ record.do_am_dat_den_min }} đến
                  {{ record.do_am_dat_den_max }}
                </p>
                <p v-else>Độ ẩm đất: Không sử dụng</p>

                <p v-if="record.nhiet_do_den_min && record.nhiet_do_den_max">
                  Độ ẩm không khí: {{ record.do_am_khong_khi_den_min }} đến
                  {{ record.do_am_khong_khi_den_max }}
                </p>
                <p v-else>Độ ẩm không khí: Không sử dụng</p>
              </div>
            </div>
          </template>
        </a-table>
      </div>
    </div>
  </a-card>
</template>

<script setup>
import { CopyOutlined, WarningOutlined } from "@ant-design/icons-vue";

import { db } from "../../configs/firebase";
import { ref as reffb, update } from "firebase/database";
import { useRouter } from "vue-router";
import { useUserStore } from "../../stores/user-store";
import Swal from "../../sweetalert2";
import { useMenu } from "../../stores/menu-store";
import { useSuggestionStore } from "../../stores/suggestion-store";
import { useDeviceStore } from "../../stores/device-store";
import { useShareStore } from "../../stores/share-store";

import { ref, onMounted } from "vue";
import axios from "axios";
import dayjs from "dayjs";

useMenu().onSelectedKeys(["shareconfig"]);
useMenu().onOpenKeys(["shareconfig"]);

const suggestionStore = useSuggestionStore();
const deviceStore = useDeviceStore();
const shareStore = useShareStore();
const devices = ref({});
const shares = ref({});

const userStore = useUserStore();
const router = useRouter();
const value = ref(3);
const desc = ref(["terrible", "bad", "normal", "good", "wonderful"]);
const data = ref([]);
const dataShare = ref([]);

onMounted(async () => {
  Swal.showLoading();
  await suggestionStore.fetchSuggestions();
  await suggestionStore.fetchAllSuggestions();
  suggestionStore.suggestions.forEach((suggestion) => {
    if (suggestion.user_id == userStore.id) {
      data.value.push({
        key: suggestion.id,
        name: suggestion.name,
        description: suggestion.description,
        createdAt: dayjs(suggestion.updated_at).format("DD/MM/YYYY - HH:MM"),
        nhiet_do_bom_min: suggestion.nhiet_do_bom_min,
        nhiet_do_bom_max: suggestion.nhiet_do_bom_max,
        do_am_khong_khi_bom_min: suggestion.do_am_khong_khi_bom_min,
        do_am_khong_khi_bom_max: suggestion.do_am_khong_khi_bom_max,
        do_am_dat_bom_min: suggestion.do_am_dat_bom_min,
        do_am_dat_bom_max: suggestion.do_am_dat_bom_max,
        nhiet_do_den_min: suggestion.nhiet_do_den_min,
        nhiet_do_den_max: suggestion.nhiet_do_den_max,
        do_am_khong_khi_den_min: suggestion.do_am_khong_khi_den_min,
        do_am_khong_khi_den_max: suggestion.do_am_khong_khi_den_max,
        do_am_dat_den_min: suggestion.do_am_dat_den_min,
        do_am_dat_den_max: suggestion.do_am_dat_den_max,
        image: suggestionStore.suggestionImage(suggestion.image),
      });
    }
  });
  suggestionStore.all_suggestions.forEach((suggestion) => {
    dataShare.value.push({
      key: suggestion.id,
      name: suggestion.name,
      description: suggestion.description,
      createdAt: dayjs(suggestion.updated_at).format("DD/MM/YYYY - HH:MM"),
      nhiet_do_bom_min: suggestion.nhiet_do_bom_min,
      nhiet_do_bom_max: suggestion.nhiet_do_bom_max,
      do_am_khong_khi_bom_min: suggestion.do_am_khong_khi_bom_min,
      do_am_khong_khi_bom_max: suggestion.do_am_khong_khi_bom_max,
      do_am_dat_bom_min: suggestion.do_am_dat_bom_min,
      do_am_dat_bom_max: suggestion.do_am_dat_bom_max,
      nhiet_do_den_min: suggestion.nhiet_do_den_min,
      nhiet_do_den_max: suggestion.nhiet_do_den_max,
      do_am_khong_khi_den_min: suggestion.do_am_khong_khi_den_min,
      do_am_khong_khi_den_max: suggestion.do_am_khong_khi_den_max,
      do_am_dat_den_min: suggestion.do_am_dat_den_min,
      do_am_dat_den_max: suggestion.do_am_dat_den_max,
      image: suggestionStore.suggestionImage(suggestion.image),
    });
  });
  Swal.close();
});

const columns = [
  {
    title: "Tên cây trồng",
    width: 100,
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    width: 100,
    key: "description",
  },

  {
    title: "Image",
    dataIndex: "image",
    width: 50,
    key: "image",
  },
  {
    title: "Date",
    dataIndex: "createdAt",
    width: 80,
    key: "createdAt",
  },
  {
    title: "Đánh giá",
    dataIndex: "rate",
    width: 80,
    key: "rate",
  },
  {
    title: "Action",
    dataIndex: "operation",
    width: 100,
    key: "operation",
  },
];

const deleteSuggestion = async (id) => {
  Swal.fire({
    title: "Are you sure you want to delete this?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axios.delete("api/suggestion/" + id);
        Swal.showLoading();
        await suggestionStore.fetchSuggestions();
        await suggestionStore.fetchAllSuggestions();
        suggestionStore.suggestions.forEach((suggestion) => {
          if (suggestion.user_id == userStore.id) {
            data.value.push({
              key: suggestion.id,
              name: suggestion.name,
              description: suggestion.description,
              createdAt: dayjs(suggestion.updated_at).format(
                "DD/MM/YYYY - HH:MM"
              ),
              nhiet_do_bom_min: suggestion.nhiet_do_bom_min,
              nhiet_do_bom_max: suggestion.nhiet_do_bom_max,
              do_am_khong_khi_bom_min: suggestion.do_am_khong_khi_bom_min,
              do_am_khong_khi_bom_max: suggestion.do_am_khong_khi_bom_max,
              do_am_dat_bom_min: suggestion.do_am_dat_bom_min,
              do_am_dat_bom_max: suggestion.do_am_dat_bom_max,
              nhiet_do_den_min: suggestion.nhiet_do_den_min,
              nhiet_do_den_max: suggestion.nhiet_do_den_max,
              do_am_khong_khi_den_min: suggestion.do_am_khong_khi_den_min,
              do_am_khong_khi_den_max: suggestion.do_am_khong_khi_den_max,
              do_am_dat_den_min: suggestion.do_am_dat_den_min,
              do_am_dat_den_max: suggestion.do_am_dat_den_max,
              image: suggestionStore.suggestionImage(suggestion.image),
            });
          }
        });
        suggestionStore.all_suggestions.forEach((suggestion) => {
          dataShare.value.push({
            key: suggestion.id,
            name: suggestion.name,
            description: suggestion.description,
            createdAt: dayjs(suggestion.updated_at).format(
              "DD/MM/YYYY - HH:MM"
            ),
            nhiet_do_bom_min: suggestion.nhiet_do_bom_min,
            nhiet_do_bom_max: suggestion.nhiet_do_bom_max,
            do_am_khong_khi_bom_min: suggestion.do_am_khong_khi_bom_min,
            do_am_khong_khi_bom_max: suggestion.do_am_khong_khi_bom_max,
            do_am_dat_bom_min: suggestion.do_am_dat_bom_min,
            do_am_dat_bom_max: suggestion.do_am_dat_bom_max,
            nhiet_do_den_min: suggestion.nhiet_do_den_min,
            nhiet_do_den_max: suggestion.nhiet_do_den_max,
            do_am_khong_khi_den_min: suggestion.do_am_khong_khi_den_min,
            do_am_khong_khi_den_max: suggestion.do_am_khong_khi_den_max,
            do_am_dat_den_min: suggestion.do_am_dat_den_min,
            do_am_dat_den_max: suggestion.do_am_dat_den_max,
            image: suggestionStore.suggestionImage(suggestion.image),
          });
        });
        Swal.close();
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      } catch (err) {
        console.log(err);
      }
    }
  });
};

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const text = ref("");

const render = () => {
  devices.value.forEach((item) => {
    text.value +=
      `<div class="form-check mb-2" style="width: 50%">
                <input class="form-check-input" type="checkbox" value="` +
      item.device +
      `" id="` +
      item.device +
      `">
                <label class="form-check-label" for="` +
      item.device +
      `">
                    ` +
      item.name +
      `
                </label>
            </div>`;
  });
  shares.value.forEach((item) => {
    text.value +=
      `<div class="form-check mb-2" style="width: 50%">
                <input class="form-check-input" type="checkbox" value="` +
      item.device.device +
      `" id="` +
      item.device.device +
      `">
                <label class="form-check-label" for="` +
      item.device.device +
      `">
                    ` +
      item.device.name +
      `
                </label>
            </div>`;
  });
};

const useSuggestion = async (useSuggestion) => {
  await deviceStore.fetchDevicesByUser();
  await shareStore.fetchSharedComfirmList();
  shares.value = shareStore.shared_comfirm_list;
  devices.value = deviceStore.devices;

  text.value = "";
  render();
  const { value: accept } = await Swal.fire({
    title: "Lựa chọn thiết bị sử dụng",
    html:
      `<div id="checkbox-container" style="
                display:flex;
                justify-content: space-around;
                flex-wrap: wrap;
            ">
            ` +
      text.value +
      `
      
          </div>
    `,
    focusConfirm: false,
    showCancelButton: true,
    preConfirm: () => {
      const checkboxes = document
        .getElementById("checkbox-container")
        .querySelectorAll("input[type='checkbox']");
      checkboxes.forEach(async (checkbox) => {
        if (checkbox.checked) {
          await update(reffb(db, checkbox.value + "/sensor"), {
            nhiet_do_bom_min: useSuggestion.nhiet_do_bom_min,
            nhiet_do_bom_max: useSuggestion.nhiet_do_bom_max,
            do_am_khong_khi_bom_min: useSuggestion.do_am_khong_khi_bom_min,
            do_am_khong_khi_bom_max: useSuggestion.do_am_khong_khi_bom_max,
            do_am_dat_bom_min: useSuggestion.do_am_dat_bom_min,
            do_am_dat_bom_max: useSuggestion.do_am_dat_bom_max,
            nhiet_do_den_min: useSuggestion.nhiet_do_den_min,
            nhiet_do_den_max: useSuggestion.nhiet_do_den_max,
            do_am_khong_khi_den_min: useSuggestion.do_am_khong_khi_den_min,
            do_am_khong_khi_den_max: useSuggestion.do_am_khong_khi_den_max,
            do_am_dat_den_min: useSuggestion.do_am_dat_den_min,
            do_am_dat_den_max: useSuggestion.do_am_dat_den_max,
          });
          router.push({ path: "/control" });
          Toast.fire({
            icon: "success",
            title: "Sử dụng thành công !",
          });
        }
      });
    },
  });
};
</script>

<style scoped></style>
