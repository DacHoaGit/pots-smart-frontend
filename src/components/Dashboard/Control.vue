<template>
  <a-card title="Điều khiển hệ thống" style="width: 100"></a-card>
  <div class="row mb-2 mt-2">
    <a-space>
      <select class="d-none" name="" id="">
        <option :key="item.id" v-for="item in devices" :value="item.device">
          {{ item.name }}
        </option>
      </select>
      <a-select
        v-model:value="valueDevice"
        style="width: 200px"
        @change="handleChange"
      >
        <a-select-opt-group>
          <template #label>
            <span>
              <user-outlined />
              My Device
            </span>
          </template>
          <a-select-option
            :key="item.id"
            v-for="item in devices"
            :value="item.device"
          >
            {{ item.name }}</a-select-option
          >
        </a-select-opt-group>

        <a-select-opt-group label="Device Shared">
          <template #label>
            <span>
              <user-outlined />
              Device Shared
            </span>
          </template>
          <a-select-option
            :key="item.id"
            v-for="item in shares"
            :value="item.device.device"
          >
            {{ item.device.name }}</a-select-option
          >
        </a-select-opt-group>
      </a-select>
    </a-space>
  </div>
  <div class="row">
    <div class="col-sm-3 col-6">
      <a-card
        class="mt-2 rounded border border-danger"
        :hoverable="true"
        title="Điều khiển bơm"
        :bordered="true"
      >
        <div class="d-flex justify-content-center align-items-center">
          <div class="d-flex justify-content-center" style="font-size: 30px">
            <button
              @click="bom"
              class="btn-control"
              :class="statusbom ? 'btn-pump-on' : 'btn-pump-off'"
              type="button"
            >
              {{ statusbom ? "Bật bơm" : "Tắt bơm" }}
            </button>
          </div>
        </div>
      </a-card>
    </div>

    <div class="col-sm-3 col-6">
      <a-card
        class="mt-2 rounded border border-danger"
        :hoverable="true"
        title="Điều khiển đèn"
        :bordered="true"
      >
        <div class="d-flex justify-content-center align-items-center">
          <div class="d-flex justify-content-center" style="font-size: 30px">
            <button
              @click="den"
              class="btn-control"
              :class="statusden ? 'btn-led-on' : 'btn-led-off'"
              type="button"
            >
              {{ statusden ? "Bật đèn" : "Tắt đèn" }}
            </button>
          </div>
        </div>
      </a-card>
    </div>

    <div class="col-sm-3 col-6">
      <a-card
        class="mt-2 rounded border border-danger"
        :hoverable="true"
        title="Điều khiển tự động"
        :bordered="true"
      >
        <div class="d-flex justify-content-center align-items-center">
          <div class="d-flex justify-content-center" style="font-size: 30px">
            <button
              @click="auto"
              class="btn-control"
              :class="statusauto ? 'btn-auto-on' : 'btn-auto-off'"
              type="button"
            >
              {{ statusauto ? "Bật tự động" : "Tắt tự động" }}
            </button>
          </div>
        </div>
      </a-card>
    </div>
    <div class="col-sm-3 col-6"></div>
    <div class="col-12 d-sm-flex justify-content-between">
      <div class="col-sm-5 col-12">
        <a-divider
          orientation="center"
          style="border-color: #7cb305; color: #0c713d"
          >Cấu hình bơm tự động</a-divider
        >
        <div class="row mb-4">
          <div
            class="col-12 col-sm-3 d-sm-flex align-items-center justify-content-start"
          >
            <label>
              <span> Độ ẩm đất min: </span>
            </label>
          </div>
          <div class="col-12 col-sm-3">
            <a-input
              placeholder="Độ ẩm đất min"
              allow-clear
              v-model:value="suggestion.do_am_dat_bom_min"
            />
            <div class="w-100"></div>
          </div>
          <div
            class="col-12 col-sm-3 col-12 col-sm-3 d-sm-flex align-items-center justify-content-start"
          >
            <label>
              <span> Độ ẩm đất max: </span>
            </label>
          </div>
          <div class="col-12 col-sm-3">
            <a-input
              placeholder="Độ ẩm đất max"
              allow-clear
              v-model:value="suggestion.do_am_dat_bom_max"
            />
            <div class="w-100"></div>
          </div>
        </div>

        <div class="row mb-4">
          <div
            class="col-12 col-sm-3 d-sm-flex align-items-center justify-content-start"
          >
            <label>
              <span> Độ ẩm không khí min: </span>
            </label>
          </div>
          <div class="col-12 col-sm-3">
            <a-input
              placeholder="Độ ẩm không khí min"
              allow-clear
              v-model:value="suggestion.do_am_khong_khi_bom_min"
            />
            <div class="w-100"></div>
          </div>
          <div
            class="col-12 col-sm-3 col-12 col-sm-3 d-sm-flex align-items-center justify-content-start"
          >
            <label>
              <span> Độ ẩm không khí max: </span>
            </label>
          </div>
          <div class="col-12 col-sm-3">
            <a-input
              placeholder="Độ ẩm không khí max"
              allow-clear
              v-model:value="suggestion.do_am_khong_khi_bom_max"
            />
            <div class="w-100"></div>
          </div>
        </div>

        <div class="row mb-4">
          <div
            class="col-12 col-sm-3 d-sm-flex align-items-center justify-content-start"
          >
            <label>
              <span> Nhiệt độ min: </span>
            </label>
          </div>
          <div class="col-12 col-sm-3">
            <a-input
              placeholder="Nhiệt độ min"
              allow-clear
              v-model:value="suggestion.nhiet_do_bom_min"
            />
            <div class="w-100"></div>
          </div>
          <div
            class="col-12 col-sm-3 col-12 col-sm-3 d-sm-flex align-items-center justify-content-start"
          >
            <label>
              <span> Nhiệt độ max: </span>
            </label>
          </div>
          <div class="col-12 col-sm-3">
            <a-input
              placeholder="Nhiệt độ max"
              allow-clear
              v-model:value="suggestion.nhiet_do_bom_max"
            />
            <div class="w-100"></div>
          </div>
        </div>
      </div>
      <div class="col-sm-5 col-12">
        <a-divider
          orientation="center"
          style="border-color: #7cb305; color: #0c713d"
          >Cấu hình đèn tự động</a-divider
        >
        <div class="row mb-4">
          <div
            class="col-12 col-sm-3 d-sm-flex align-items-center justify-content-start"
          >
            <label>
              <span> Độ ẩm đất min: </span>
            </label>
          </div>
          <div class="col-12 col-sm-3">
            <a-input
              placeholder="Độ ẩm đất min"
              allow-clear
              v-model:value="suggestion.do_am_dat_den_min"
            />
            <div class="w-100"></div>
          </div>
          <div
            class="col-12 col-sm-3 col-12 col-sm-3 d-sm-flex align-items-center justify-content-start"
          >
            <label>
              <span> Độ ẩm đất max: </span>
            </label>
          </div>
          <div class="col-12 col-sm-3">
            <a-input
              placeholder="Độ ẩm đất max"
              allow-clear
              v-model:value="suggestion.do_am_dat_den_max"
            />
            <div class="w-100"></div>
          </div>
        </div>

        <div class="row mb-4">
          <div
            class="col-12 col-sm-3 d-sm-flex align-items-center justify-content-start"
          >
            <label>
              <span> Độ ẩm không khí min: </span>
            </label>
          </div>
          <div class="col-12 col-sm-3">
            <a-input
              placeholder="Độ ẩm không khí min"
              allow-clear
              v-model:value="suggestion.do_am_khong_khi_den_min"
            />
            <div class="w-100"></div>
          </div>
          <div
            class="col-12 col-sm-3 col-12 col-sm-3 d-sm-flex align-items-center justify-content-start"
          >
            <label>
              <span> Độ ẩm không khí max: </span>
            </label>
          </div>
          <div class="col-12 col-sm-3">
            <a-input
              placeholder="Độ ẩm không khí max"
              allow-clear
              v-model:value="suggestion.do_am_khong_khi_den_max"
            />
            <div class="w-100"></div>
          </div>
        </div>

        <div class="row mb-4">
          <div
            class="col-12 col-sm-3 d-sm-flex align-items-center justify-content-start"
          >
            <label>
              <span> Nhiệt độ min: </span>
            </label>
          </div>
          <div class="col-12 col-sm-3">
            <a-input
              placeholder="Nhiệt độ min"
              allow-clear
              v-model:value="suggestion.nhiet_do_den_min"
            />
            <div class="w-100"></div>
          </div>
          <div
            class="col-12 col-sm-3 col-12 col-sm-3 d-sm-flex align-items-center justify-content-start"
          >
            <label>
              <span> Nhiệt độ max: </span>
            </label>
          </div>
          <div class="col-12 col-sm-3">
            <a-input
              placeholder="Nhiệt độ max"
              allow-clear
              v-model:value="suggestion.nhiet_do_den_max"
            />
            <div class="w-100"></div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="onSuggestion == false"
      class="col-12 d-flex justify-content-end mt-4 mb-2"
    >
      <a-button
        class="w-xl-25"
        type="primary"
        html-type="submit"
        size="large"
        @click="suggestions"
      >
        <span>Chia sẻ</span>
      </a-button>
    </div>
    <a-divider
      v-if="onSuggestion == true"
      orientation="center"
      style="border-color: #7cb305; color: #0c713d"
      >Chia sẻ cấu hình</a-divider
    >
    <div v-if="onSuggestion" class="col-12 d-sm-flex justify-content-between">
      <div class="col-sm-5 col-12">
        <div class="row mb-4">
          <div
            class="col-12 col-sm-3 d-sm-flex align-items-center justify-content-end"
          >
            <label>
              <span> Tên cây trồng: </span>
            </label>
          </div>
          <div class="col-12 col-sm-9">
            <a-input
              placeholder="Tên cây trồng"
              allow-clear
              v-model:value="suggestion.name"
            />
          </div>
        </div>
        <div class="row mb-4">
          <div
            class="col-12 col-sm-3 d-sm-flex align-items-center justify-content-end"
          >
            <label>
              <span> Mô tả: </span>
            </label>
          </div>
          <div class="col-12 col-sm-9">
            <textarea
              style="width: 100%; padding: 0 10px; border-color: #0c713d"
              rows="4"
              placeholder="Mô tả..."
              allow-clear
              v-model="suggestion.description"
            ></textarea>
          </div>
        </div>
      </div>
      <div class="col-sm-5 col-12">
        <div class="row mb-4">
          <a-upload
            :file-list="fileList"
            v-model:file-list="suggestion.image"
            list-type="picture"
            :max-count="1"
            :before-upload="beforeUpload"
            @remove="handleRemove"
          >
            <a-button>
              <upload-outlined></upload-outlined>
              upload
            </a-button>
          </a-upload>
        </div>
      </div>
    </div>
    <div
      v-if="onSuggestion == true"
      class="col-12 d-flex justify-content-start mt-4 mb-2"
    >
      <a-button class="w-xl-25" type="primary" size="large" @click="create">
        <span>Create</span>
      </a-button>

      <a-button
        class="w-xl-25"
        html-type="submit"
        size="large"
        style="background-color: #fff; margin-left: 10px"
        @click="CancelSuggestions"
      >
        <span>Cancel</span>
      </a-button>
    </div>
  </div>
</template>

<script setup>
import { useMenu } from "../../stores/menu-store";
import { UploadOutlined, UserOutlined } from "@ant-design/icons-vue";
import axios from "axios";

import { db, dbt } from "../../configs/firebase";
import { ref as reffb, set, onValue, off, update } from "firebase/database";
import { useUserStore } from "../../stores/user-store";
import { useSuggestionStore } from "../../stores/suggestion-store";
import { useShareStore } from "../../stores/share-store";
import { useDeviceStore } from "../../stores/device-store";

import Swal from "../../sweetalert2";
import { ref, reactive, onMounted } from "vue";

const suggestionStore = useSuggestionStore();
const deviceStore = useDeviceStore();
const shareStore = useShareStore();

const shares = ref({});
const devices = ref({});
const valueDevice = ref({});
const valueDeviceOld = ref("");

const statusbom = ref(false);
const statusden = ref(false);
const statusauto = ref(false);

onMounted(async () => {
  Swal.showLoading();
  await deviceStore.fetchDevicesByUser();
  await shareStore.fetchSharedComfirmList();
  devices.value = deviceStore.devices;
  shares.value = shareStore.shared_comfirm_list;
  if (Object.keys(devices.value).length != 0) {
    valueDevice.value = Object.values(devices.value)[0].device;
    getStatus(valueDevice.value);
  } else if (Object.keys(shares.value).length != 0) {
    valueDevice.value = Object.values(shares.value)[0].device.device;
    getStatus(valueDevice.value);
  }
  Swal.close();
});

const handleChange = (value) => {
  // valueDevice.value = value;
  console.log(value);
  getStatus(value);
};

const fileList = ref([]);
const onSuggestion = ref(false);

useMenu().onSelectedKeys(["control"]);
useMenu().onOpenKeys(["control"]);
const userStore = useUserStore();

const handleRemove = (file) => {
  const index = suggestion.image.indexOf(file);
  const newFileList = suggestion.image.slice();
  newFileList.splice(index, 1);
  suggestion.image = newFileList;
};
const beforeUpload = (file) => {
  fileList.value = [...fileList.value, file];
  return false;
};

const suggestion = reactive({
  name: "",
  description: "",

  nhiet_do_bom_min: "",
  nhiet_do_bom_max: "",
  do_am_khong_khi_bom_min: "",
  do_am_khong_khi_bom_max: "",
  do_am_dat_bom_min: "",
  do_am_dat_bom_max: "",

  nhiet_do_den_min: "",
  nhiet_do_den_max: "",
  do_am_khong_khi_den_min: "",
  do_am_khong_khi_den_max: "",
  do_am_dat_den_min: "",
  do_am_dat_den_max: "",
  image: [],
});

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

const getStatus = (device) => {
  //remove listener old
  const bom_old_ref = reffb(db, valueDeviceOld.value + "/sensor/status_bom");
  off(bom_old_ref);
  const den_old_ref = reffb(db, valueDeviceOld.value + "/sensor/status_den");
  off(den_old_ref);
  const auto_old_ref = reffb(db, valueDeviceOld.value + "/sensor/status_auto");
  off(auto_old_ref);

  off(reffb(db, valueDeviceOld.value + "/sensor/nhiet_do_bom_min"));
  off(reffb(db, valueDeviceOld.value + "/sensor/nhiet_do_bom_max"));
  off(reffb(db, valueDeviceOld.value + "/sensor/do_am_khong_khi_bom_min"));
  off(reffb(db, valueDeviceOld.value + "/sensor/do_am_khong_khi_bom_max"));
  off(reffb(db, valueDeviceOld.value + "/sensor/do_am_dat_bom_min"));
  off(reffb(db, valueDeviceOld.value + "/sensor/do_am_dat_bom_max"));
  off(reffb(db, valueDeviceOld.value + "/sensor/nhiet_do_den_min"));
  off(reffb(db, valueDeviceOld.value + "/sensor/nhiet_do_den_max"));
  off(reffb(db, valueDeviceOld.value + "/sensor/do_am_khong_khi_den_min"));
  off(reffb(db, valueDeviceOld.value + "/sensor/do_am_khong_khi_den_max"));
  off(reffb(db, valueDeviceOld.value + "/sensor/do_am_dat_den_min"));
  off(reffb(db, valueDeviceOld.value + "/sensor/do_am_dat_den_max"));

  const bomref = reffb(db, device + "/sensor/status_bom");
  onValue(bomref, (snapshot) => {
    statusbom.value = snapshot.val();
    Swal.close();
  });
  const denref = reffb(db, device + "/sensor/status_den");
  onValue(denref, (snapshot) => {
    statusden.value = snapshot.val();
    Swal.close();
  });
  const autoref = reffb(db, device + "/sensor/status_auto");
  onValue(autoref, (snapshot) => {
    statusauto.value = snapshot.val();
    Swal.close();
  });

  onValue(reffb(db, device + "/sensor/nhiet_do_bom_min"), (snapshot) => {
    suggestion.nhiet_do_bom_min = snapshot.val();
    Swal.close();
  });
  onValue(reffb(db, device + "/sensor/nhiet_do_bom_max"), (snapshot) => {
    suggestion.nhiet_do_bom_max = snapshot.val();
    Swal.close();
  });
  onValue(reffb(db, device + "/sensor/do_am_khong_khi_bom_min"), (snapshot) => {
    suggestion.do_am_khong_khi_bom_min = snapshot.val();
    Swal.close();
  });
  onValue(reffb(db, device + "/sensor/do_am_khong_khi_bom_max"), (snapshot) => {
    suggestion.do_am_khong_khi_bom_max = snapshot.val();
    Swal.close();
  });
  onValue(reffb(db, device + "/sensor/do_am_dat_bom_min"), (snapshot) => {
    suggestion.do_am_dat_bom_min = snapshot.val();
    Swal.close();
  });
  onValue(reffb(db, device + "/sensor/do_am_dat_bom_max"), (snapshot) => {
    suggestion.do_am_dat_bom_max = snapshot.val();
    Swal.close();
  });
  onValue(reffb(db, device + "/sensor/nhiet_do_den_min"), (snapshot) => {
    suggestion.nhiet_do_den_min = snapshot.val();
    Swal.close();
  });
  onValue(reffb(db, device + "/sensor/nhiet_do_den_max"), (snapshot) => {
    suggestion.nhiet_do_den_max = snapshot.val();
    Swal.close();
  });
  onValue(reffb(db, device + "/sensor/do_am_khong_khi_den_min"), (snapshot) => {
    suggestion.do_am_khong_khi_den_min = snapshot.val();
    Swal.close();
  });
  onValue(reffb(db, device + "/sensor/do_am_khong_khi_den_max"), (snapshot) => {
    suggestion.do_am_khong_khi_den_max = snapshot.val();
    Swal.close();
  });
  onValue(reffb(db, device + "/sensor/do_am_dat_den_min"), (snapshot) => {
    suggestion.do_am_dat_den_min = snapshot.val();
    Swal.close();
  });
  onValue(reffb(db, device + "/sensor/do_am_dat_den_max"), (snapshot) => {
    suggestion.do_am_dat_den_max = snapshot.val();
    Swal.close();
  });

  valueDeviceOld.value = device;
};

const bom = async () => {
  const temp = statusbom.value;
  Swal.showLoading();
  await update(reffb(db, valueDevice.value + "/sensor"), {
    bom: !statusbom.value ? 1 : 2,
    den: statusden.value ? 1 : 2,
    auto: statusauto.value ? 1 : 2,
  });
  if (statusbom.value == !temp) Swal.close();
};

const den = async () => {
  const temp = statusbom.value;
  Swal.showLoading();
  await update(reffb(db, valueDevice.value + "/sensor"), {
    den: !statusden.value ? 1 : 2,
    bom: statusbom.value ? 1 : 2,
    auto: statusauto.value ? 1 : 2,
  });
  if (statusbom.value == !temp) Swal.close();
};

const auto = async () => {
  Swal.showLoading();
  await update(reffb(db, valueDevice.value + "/status"), {
    auto: !statusauto.value ? 1 : 2,
    bom: statusbom.value ? 1 : 2,
    den: statusden.value ? 1 : 2,
  });
  await update(reffb(db, valueDevice.value + "/sensor"), {
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
  });
};

const suggestions = async () => {
  onSuggestion.value = !onSuggestion.value;
};
const CancelSuggestions = () => {
  onSuggestion.value = !onSuggestion.value;
};

const create = async () => {
  const formData = new FormData();
  formData.append("name", suggestion.name),
    formData.append("description", suggestion.description),
    formData.append("nhiet_do_bom_min", suggestion.nhiet_do_bom_min),
    formData.append("nhiet_do_bom_max", suggestion.nhiet_do_bom_max),
    formData.append(
      "do_am_khong_khi_bom_min",
      suggestion.do_am_khong_khi_bom_min
    ),
    formData.append(
      "do_am_khong_khi_bom_max",
      suggestion.do_am_khong_khi_bom_max
    ),
    formData.append("do_am_dat_bom_min", suggestion.do_am_dat_bom_min),
    formData.append("do_am_dat_bom_max", suggestion.do_am_dat_bom_max),
    formData.append("nhiet_do_den_min", suggestion.nhiet_do_den_min),
    formData.append("nhiet_do_den_max", suggestion.nhiet_do_den_max),
    formData.append(
      "do_am_khong_khi_den_min",
      suggestion.do_am_khong_khi_den_min
    ),
    formData.append(
      "do_am_khong_khi_den_max",
      suggestion.do_am_khong_khi_den_max
    ),
    formData.append("do_am_dat_den_min", suggestion.do_am_dat_den_min),
    formData.append("do_am_dat_den_max", suggestion.do_am_dat_den_max),
    fileList.value.forEach((file) => {
      formData.append("image", file);
    });

  // errors.value = [];
  Swal.showLoading();
  axios
    .post("/api/suggestion", formData)
    .then((response) => {
      if (response) {
        Swal.close();
        Toast.fire({
          icon: "success",
          title: "Thêm thành công",
        });
        suggestionStore.fetchSuggestions();
        // router.push("/login");
      }
    })
    .catch((error) => {
      Swal.close();
      Toast.fire({
        icon: "error",
        title: "Thêm thất bại",
      });
      // errors.value = error.response.data.errors;
      console.log(error);
    })
    .finally(() => {
      onSuggestion.value = false;
    });
};
</script>

<style scoped>
.btn-control {
  width: 150px;
  height: 150px;
  padding: 10px 16px;
  border-radius: 35px;
  font-size: 24px;
  line-height: 1.33;
  cursor: pointer;
  background-color: #ffffff;
}
.btn-pump-off {
  border-color: rgba(0, 34, 255, 0.885);
  color: rgba(0, 34, 255, 0.885);
}
.btn-pump-on {
  background-color: rgba(0, 34, 255, 0.885);
  color: #fff;
}
.btn-led-off {
  border-color: rgba(255, 0, 149, 0.885);
  color: rgba(255, 0, 149, 0.885);
}
.btn-led-on {
  background-color: rgba(255, 0, 149, 0.885);
  color: #fff;
}
.btn-auto-off {
  border-color: green;
  color: green;
}
.btn-auto-on {
  background-color: green;
  color: #fff;
}
.ant-input-affix-wrapper {
  font-size: 24px;
}

@media only screen and (max-width: 600px) {
  .btn-control {
    width: 100px;
    height: 100px;
    font-size: 12px;
  }
}
</style>
