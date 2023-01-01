<template>
  <a-card title="Quản lý hẹn giờ" style="width: 100">
    <a-form>
      <div
        class="col-12 mb-4 d-sm-flex justify-content-between align-items-center"
      >
        <a-time-range-picker
          value-format="HH:mm:ss"
          v-model:value="time"
          class="mt-4"
          size="large"
        />
        <div class="mt-4 check-bom">
          <a-switch style="margin-right: 12px" v-model:checked="bom" />
          <span>Bật tưới cây</span>
        </div>
        <div class="mt-4 check-den">
          <a-switch style="margin-right: 12px" v-model:checked="den" />
          <span>Bật đèn</span>
        </div>
        <div class="mt-4 check-auto">
          <a-switch style="margin-right: 12px" v-model:checked="auto" />
          <span>Bật tự động</span>
        </div>
      </div>
      <div class="col-12 mb-4">
        <a-date-picker
          value-format="YYYY-MM-DD"
          v-model:value="date"
          :disabled-date="disabledDate"
          style="border-color: aqua"
          size="large"
        />
      </div>
      <div class="col-12 mb-4">
        <a-button
          class="mt-2"
          :style="weekday.monday ? 'background-color:aqua' : ''"
          style="margin-right: 8px; border-color: aqua"
          @click="
            weekday.monday = !weekday.monday;
            date = '';
          "
          >Thứ 2</a-button
        >
        <a-button
          class="mt-2"
          :style="weekday.tuesday ? 'background-color:aqua' : ''"
          style="margin-right: 8px; border-color: aqua"
          @click="weekday.tuesday = !weekday.tuesday"
          >Thứ 3</a-button
        >
        <a-button
          class="mt-2"
          :style="weekday.wednesday ? 'background-color:aqua' : ''"
          style="margin-right: 8px; border-color: aqua"
          @click="weekday.wednesday = !weekday.wednesday"
          >Thứ 4</a-button
        >
        <a-button
          class="mt-2"
          :style="weekday.thursday ? 'background-color:aqua' : ''"
          style="margin-right: 8px; border-color: aqua"
          @click="weekday.thursday = !weekday.thursday"
          >Thứ 5</a-button
        >
        <a-button
          class="mt-2"
          :style="weekday.friday ? 'background-color:aqua' : ''"
          style="margin-right: 8px; border-color: aqua"
          @click="weekday.friday = !weekday.friday"
          >Thứ 6</a-button
        >
        <a-button
          class="mt-2"
          :style="weekday.saturday ? 'background-color:aqua' : ''"
          style="margin-right: 8px; border-color: aqua"
          @click="weekday.saturday = !weekday.saturday"
          >Thứ 7</a-button
        >
        <a-button
          class="mt-2"
          :style="weekday.sunday ? 'background-color:aqua' : ''"
          style="margin-right: 8px; border-color: aqua"
          @click="weekday.sunday = !weekday.sunday"
          >Chủ nhật</a-button
        >
        <a-button
          class="mt-2"
          style="margin-right: 8px; border-color: green"
          @click="allDays"
          >All</a-button
        >
        <a-button
          class="mt-2"
          style="margin-right: 8px; border-color: red"
          @click="allClear"
          >Clear</a-button
        >
      </div>
      <div class="col-12 mb-4">
        <a-button html-type="submit" type="primary" @click="create()"
          >Thêm</a-button
        >
      </div>
    </a-form>
  </a-card>
  <a-card title="Danh sách hẹn giờ" style="width: 100">
    <div class="row">
      <div class="col-12">
        <a-table
          :columns="columns"
          :data-source="data"
          :loading="loading"
          :scroll="{ x: 1200, y: 300 }"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'operation'">
              <a-switch
                style="margin-right: 12px"
                @click="changeStatus(record.key)"
                :checked="record.status == 1 ? true : false"
              />
              <a-button
                style="margin-right;: 8px;border-color: red"
                @click="deleteTimer(record.key)"
                >Xóa</a-button
              >
            </template>
            <template v-if="column.key === 'day_of_weeks'">
              <span v-if="record.day_of_weeks"
                >Thứ:
                {{ record.day_of_weeks.includes("2") ? "2 " : "" }}
                {{ record.day_of_weeks.includes("3") ? "3 " : "" }}
                {{ record.day_of_weeks.includes("4") ? "4 " : "" }}
                {{ record.day_of_weeks.includes("5") ? "5 " : "" }}
                {{ record.day_of_weeks.includes("6") ? "6 " : "" }}
                {{ record.day_of_weeks.includes("7") ? "7 " : "" }}
                {{ record.day_of_weeks.includes("1") ? "CN" : "" }}
              </span>
            </template>
          </template>
        </a-table>
      </div>
    </div>
  </a-card>
</template>

<script setup>
import { useMenu } from "../../stores/menu-store";
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import Swal from "../../sweetalert2";
import { useTimerStore } from "../../stores/timer-store";
import { async } from "@firebase/util";
import dayjs from "dayjs";

const timerStore = useTimerStore();
onMounted(async () => {
  await timerStore.fetchTimersByUser();
});

useMenu().onSelectedKeys(["timer"]);
useMenu().onOpenKeys(["timer"]);

const time = ref([]);
const loading = ref(false);
const date = ref("");
const weekday = reactive({
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
  sunday: false,
});

const bom = ref(false);
const den = ref(false);
const auto = ref(false);

const columns = ref([]);
const data = ref([]);

const allDays = () => {
  weekday.monday = true;
  weekday.tuesday = true;
  weekday.wednesday = true;
  weekday.thursday = true;
  weekday.friday = true;
  weekday.saturday = true;
  weekday.sunday = true;
};
const allClear = () => {
  weekday.monday = false;
  weekday.tuesday = false;
  weekday.wednesday = false;
  weekday.thursday = false;
  weekday.friday = false;
  weekday.saturday = false;
  weekday.sunday = false;
};
const disabledDate = (current) => {
  return current < dayjs();
};

const changeStatus = async (key) => {
  loading.value = true;
  axios
    .put("/api/timer/" + key)
    .then(async (response) => {
      if (response.data.status) {
        data.value = [];
        await timerStore.fetchTimersByUser();
        timerStore.timers.forEach((timer) => {
          data.value.push({
            key: timer.id,
            status: timer.status,
            den: timer.den ? "Bật" : "Tắt",
            bom: timer.bom ? "Bật" : "Tắt",
            auto: timer.auto ? "Bật" : "Tắt",
            time_start: timer.time_start,
            time_end: timer.time_end,
            date: timer.date,
            day_of_weeks: timer.day_of_weeks,
            created_at: timer.created_at,
          });
        });
        loading.value = false;
      }
    })
    .catch((error) => {
      loading.value = false;
      console.log(error);
    });
};

const deleteTimer = async (id) => {
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
        await axios.delete("api/timer/" + id);
        await timerStore.fetchTimersByUser();
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        data.value = data.value.filter((item) => item.key !== id);
      } catch (err) {
        console.log(err);
      }
    }
  });
};

columns.value = [
  {
    title: "Đèn",
    dataIndex: "den",
    key: "den",
  },
  {
    title: "Bơm",
    dataIndex: "bom",
    key: "bom",
  },
  {
    title: "Auto",
    dataIndex: "auto",
    key: "auto",
  },
  {
    title: "Time start",
    dataIndex: "time_start",
    key: "time_start",
  },
  {
    title: "Time end",
    dataIndex: "time_end",
    key: "time_end",
  },
  {
    title: "Hẹn giờ ngày",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Hẹn giờ tuần",
    dataIndex: "day_of_weeks",
    key: "day_of_weeks",
  },
  {
    title: "Action",
    dataIndex: "operation",
    key: "operation",
  },
];

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

timerStore.timers.forEach((timer) => {
  data.value.push({
    key: timer.id,
    status: timer.status,
    den: timer.den ? "Bật" : "Tắt",
    bom: timer.bom ? "Bật" : "Tắt",
    auto: timer.auto ? "Bật" : "Tắt",
    time_start: timer.time_start,
    time_end: timer.time_end,
    date: timer.date,
    day_of_weeks: timer.day_of_weeks,
    created_at: timer.created_at,
  });
});

const create = async () => {
  const formData = new FormData();
  formData.append("den", den.value),
    formData.append("bom", bom.value),
    formData.append("auto", auto.value),
    formData.append("time_start", time.value[0]),
    formData.append("time_end", time.value[1]),
    formData.append("date", date.value),
    formData.append("monday", weekday.monday),
    formData.append("tuesday", weekday.tuesday),
    formData.append("wednesday", weekday.wednesday),
    formData.append("thursday", weekday.thursday),
    formData.append("friday", weekday.friday),
    formData.append("saturday", weekday.saturday),
    formData.append("sunday", weekday.sunday),
    // errors.value = [];
    Swal.showLoading();
  axios
    .post("/api/timer", formData)
    .then(async (response) => {
      if (response) {
        Swal.close();
        Toast.fire({
          icon: "success",
          title: "Thêm thành công",
        });
        loading.value = true;
        data.value = [];
        await timerStore.fetchTimersByUser();
        timerStore.timers.forEach((timer) => {
          data.value.push({
            key: timer.id,
            status: timer.status,
            den: timer.den ? "Bật" : "Tắt",
            bom: timer.bom ? "Bật" : "Tắt",
            auto: timer.auto ? "Bật" : "Tắt",
            time_start: timer.time_start,
            time_end: timer.time_end,
            date: timer.date,
            day_of_weeks: timer.day_of_weeks,
            created_at: timer.created_at,
          });
        });
        loading.value = false;
        // router.push("/login");
      }
    })
    .catch((error) => {
      Swal.close();
      console.log(error);
      Toast.fire({
        icon: "error",
        title: "Thêm thất bại",
      });
      // errors.value = error.response.data.errors;
      console.log(error.response.data.errors);
    });
  // .finally(()=>{
  //   onSuggestion.value = false;
  // });
};
</script>
