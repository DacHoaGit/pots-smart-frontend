<template>
  <a-card title="Quản lý thiết bị" style="width: 100">
    <a-tabs @tab-click="changeTab" v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="Danh sách thiết bị">
        <div class="col-12 mb-4">
          <a-button type="primary" @click="create()">Thêm thiết bị</a-button>
        </div>
        <div class="row mt-4 d-flex justify-content-between">
          <a-card
            class="card-device"
            v-for="item in devices"
            :key="item.id"
            hoverable
          >
            <template #cover>
              <img style="background-color:green" alt="example" src="../../assets/pots2.png" />
            </template>
            <template #actions>
              <edit-outlined
                style="color: blue"
                key="edit"
                @click="edit(item.id, item.name)"
              />
              <share-alt-outlined
                style="color: green"
                key="share"
                @click="share(item.id)"
              />
              <delete-outlined
                style="color: red"
                key="delete"
                @click="deleteDevice(item.id)"
              />
            </template>
            <div
              style="
                color: blue;
                font-weight: 600;
                font-size: 24px;
                text-transform: capitalize;
              "
              class="title-card"
            >
              {{ item.name }}
            </div>
            <div class="ant-card-meta">
              <label> </label>
              <div class="col-12 mt-2 d-flex justify-content-between">
                <span
                  style="font-weight: 600"
                  class="text-uppercase me-1 d-flex align-items-center text-danger"
                  >Token</span
                >

                <a-input
                  style="width: 80% !important"
                  class=""
                  readonly="readonly"
                  :value="item.device"
                />
                <a-tooltip @click="copyToken(item.device)" title="copy">
                  <a-button>
                    <template #icon><CopyOutlined /></template>
                  </a-button>
                </a-tooltip>
              </div>
            </div>
          </a-card>
          <a-card
          class="card-device"
            v-for="item in shares"
            :key="item.device.id"
            hoverable
          >
            <template #cover>
              <img style="background-color:aqua;" alt="example" src="../../assets/pots2.png" />
            </template>
            <template #actions>
              <delete-outlined
                style="color: red"
                key="delete"
                @click="deleteShare(item.id)"
              />
            </template>
            <div
              style="
                color: blue;
                font-weight: 600;
                font-size: 24px;
                text-transform: capitalize;
              "
              class="title-card"
            >
              {{ item.device.name }}
            </div>
          </a-card>
        </div>
        <div class="row mt-4"></div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Thiết bị đã chia sẻ" force-render>
        <a-card title="Danh sách đã chia sẻ" style="width: 100">
          <div class="row">
            <div class="col-12">
              <a-table
                :columns="columns1"
                :data-source="data1"
                :loading="loading"
                :scroll="{ x: 1200, y: 300 }"
              >
                <template #bodyCell="{ column, record }">
                  <template v-if="column.key === 'operation'">
                    <a-button
                      style="margin-right;: 8px;border-color: red"
                      @click="deleteShare(record.key)"
                      >Xóa</a-button
                    >
                  </template>
                  <template v-if="column.key === 'status'">
                    <span
                      :style="record.status ? 'color:green' : 'color:yellow'"
                    >
                      <a-tag :color="record.status ? 'green' : 'yellow'">
                        {{
                          record.status
                            ? "Đã xác nhận".toUpperCase()
                            : "Chưa xác nhận".toUpperCase()
                        }}
                      </a-tag>
                    </span>
                  </template>
                </template>
              </a-table>
            </div>
          </div>
        </a-card>
      </a-tab-pane>
      <a-tab-pane key="3" tab="Thiết bị được chia sẻ" force-render>
        <a-card title="Danh sách được chia sẻ" style="width: 100">
          <div class="row">
            <div class="col-12">
              <a-table
                :columns="columns2"
                :data-source="data2"
                :loading="loading"
                :scroll="{ x: 1200, y: 300 }"
              >
                <template #bodyCell="{ column, record }">
                  <template v-if="column.key === 'operation'">
                    <a-button
                      v-if="record.status == 0"
                      style="margin-right: 8px; border-color: aqua"
                      @click="isComfirm(record.key)"
                      >Xác nhận
                    </a-button>
                    <a-button
                      style="margin-right;: 8px;border-color: red"
                      @click="deleteShare(record.key)"
                      >Xóa
                    </a-button>
                  </template>
                </template>
              </a-table>
            </div>
          </div>
        </a-card>
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<script setup>
import Swal from "../../sweetalert2";
import {
  EditOutlined,
  CopyOutlined,
  DeleteOutlined,
  ShareAltOutlined,
} from "@ant-design/icons-vue";
import { useMenu } from "../../stores/menu-store";
import { useDeviceStore } from "../../stores/device-store";
import { useShareStore } from "../../stores/share-store";
import axios from "axios";
import { ref, onMounted } from "vue";
import dayjs from "dayjs";

const deviceStore = useDeviceStore();
const devices = ref({});
const shares = ref([]);
const shareStore = useShareStore();
const activeKey = ref("1");
const loading = ref(false);

const columns1 = ref([
  {
    title: "Tên thiết bị",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email Shared",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Thời gian",
    dataIndex: "created_at",
    key: "created_at",
  },
  {
    title: "Action",
    dataIndex: "operation",
    key: "operation",
  },
]);

const columns2 = ref([
  {
    title: "Tên thiết bị",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email Share",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Thời gian",
    dataIndex: "created_at",
    key: "created_at",
  },
  {
    title: "Action",
    dataIndex: "operation",
    key: "operation",
  },
]);

const data1 = ref([]);
const data2 = ref([]);

onMounted(async () => {
  changeTab();
});

useMenu().onSelectedKeys(["device"]);
useMenu().onOpenKeys(["device"]);

const copyToken = (text) => {
  navigator.clipboard.writeText(text);
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

const create = async () => {
  const { value: name } = await Swal.fire({
    title: "Thêm thiết bị",
    input: "text",
    inputLabel: "Your name device",
    showCancelButton: true,
    inputPlaceholder: "Enter your name device",
  });

  if (name) {
    Swal.showLoading();
    const formData = new FormData();
    formData.append("name", name);

    axios
      .post("/api/device", formData)
      .then(async (response) => {
        if (response) {
          //   Swal.close();
          Toast.fire({
            icon: "success",
            title: "Thêm thành công",
          });
          await deviceStore.fetchDevicesByUser();
          devices.value = deviceStore.devices;
          //   await timerStore.fetchTimersByUser();
          // router.push("/login");
        }
      })
      .catch((error) => {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "Thêm thất bại",
        });
        // errors.value = error.response.data.errors;
        console.log(error.response.data.errors);
      });
  }
};

const edit = async (id, text) => {
  const { value: name } = await Swal.fire({
    title: "Thêm thiết bị",
    input: "text",
    inputLabel: "Your name device",
    showCancelButton: true,
    inputValue: text,
    inputPlaceholder: "Enter your name device",
  });

  if (name != text && name) {
    Swal.showLoading();
    const formData = new FormData();
    formData.append("name", name);

    axios
      .post("/api/device/" + id, formData)
      .then(async (response) => {
        if (response) {
          //   Swal.close();
          Toast.fire({
            icon: "success",
            title: "edit thành công",
          });
          await deviceStore.fetchDevicesByUser();
          devices.value = deviceStore.devices;
          //   await timerStore.fetchTimersByUser();
          // router.push("/login");
        }
      })
      .catch((error) => {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "Thêm thất bại",
        });
        // errors.value = error.response.data.errors;
        console.log(error.response.data.errors);
      });
  }
};

const isComfirm = (id) => {
  loading.value = true;
  axios
    .put("/api/share/" + id)
    .then(async (response) => {
      if (response.data.status) {
        changeTab();
        loading.value = false;
        Toast.fire({
          icon: "success",
          title: "Xác nhận thành công",
        });
      }
    })
    .catch((error) => {
      loading.value = false;
      console.log(error);
    });
};

const changeTab = async () => {
  Swal.showLoading();
  await deviceStore.fetchDevicesByUser();
  await shareStore.fetchSharesByUser();
  await shareStore.fetchSharedList();
  data1.value = [];
  data2.value = [];
  shares.value = [];
  shareStore.shares.forEach((share) => {
    data1.value.push({
      key: share.id,
      name: share.device.name,
      email: share.user.email,
      status: share.status,
      created_at: dayjs(share.created_at).format("DD/MM/YYYY - HH:MM"),
    });
  });
  shareStore.shared_list.forEach((share) => {
    data2.value.push({
      key: share.id,
      name: share.device.name,
      email: share.user.email,
      status: share.status,
      created_at: dayjs(share.created_at).format("DD/MM/YYYY - HH:MM"),
    });
    if(share.status){
      shares.value.push(share);
    }
  });
  devices.value = deviceStore.devices;
  Swal.close();

};

const share = async (id) => {
  const { value: name } = await Swal.fire({
    title: "Nhập email người dùng bạn muốn share",
    input: "email",
    inputLabel: "Your email ",
    showCancelButton: true,
    inputPlaceholder: "Enter your email",
  });

  if (name) {
    Swal.showLoading();
    const formData = new FormData();
    formData.append("id", id);
    formData.append("email", name);

    axios
      .post("/api/share", formData)
      .then(async (response) => {
        if (!response.data.error) {
          //   Swal.close();
          Toast.fire({
            icon: "success",
            title: "Share thành công",
          });
          await deviceStore.fetchDevicesByUser();
          devices.value = deviceStore.devices;
          //   await timerStore.fetchTimersByUser();
          // router.push("/login");
        } else {
          Toast.fire({
            icon: "error",
            title: response.data.error,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "Share thất bại",
        });
        // errors.value = error.response.data.errors;
        console.log(error.response.data.errors);
      });
  }
};

const deleteDevice = async (id) => {
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
        await axios.delete("api/device/" + id);
        await deviceStore.fetchDevicesByUser();
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        devices.value = deviceStore.devices;
      } catch (err) {
        console.log(err);
      }
    }
  });
};

const deleteShare = async (id) => {
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
        await axios.delete("api/share/" + id);
        changeTab();
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      } catch (err) {
        console.log(err);
      }
    }
  });
};
</script>

<style scoped>
.card-device {
  width: 250px;
}
@media (max-width: 800px) {
  .card-device {
    width: 100%;
  }

}
</style>
