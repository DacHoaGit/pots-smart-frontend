<template>
  <a-card title="Chia sẻ cấu hình" style="width: 100">
    <div class="row">
      <div class="col-12">
        <a-table
          :columns="columns"
          :data-source="data"
          
          class="components-table-demo-nested"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'image'">
              <img v-if="record.image" style="width: 50px" :src="record.image" alt="" />
            </template>
            <template v-if="column.key === 'operation'">
              <a-button  style="margin-right: 8px;border-color: aqua;" @click="useSuggestion(record)">Sử dụng</a-button>
              <a-button  style="margin-right;: 8px;border-color: red" @click="deleteSuggestion(record.key)">Xóa</a-button>
            </template>
          </template>
          <template #expandedRowRender="{ record }">
            <div class="row d-flex">
              <div class="col-6">
                <p style="color:green; font-size: 16px;" class=" text-center">Bơm</p>
                <p v-if="(record.nhiet_do_bom_min && record.nhiet_do_bom_max)">Nhiệt độ: {{record.nhiet_do_bom_min}} đến {{record.nhiet_do_bom_max}}</p>
                <p v-else>Nhiệt độ: Không sử dụng</p>

                <p v-if="(record.nhiet_do_bom_min && record.nhiet_do_bom_max)">Độ ẩm đất: {{record.do_am_dat_bom_min}} đến {{record.do_am_dat_bom_max}}</p>
                <p v-else>Độ ẩm đất: Không sử dụng</p>

                <p v-if="(record.nhiet_do_bom_min && record.nhiet_do_bom_max)">Độ ẩm không khí: {{record.do_am_khong_khi_bom_min}} đến {{record.do_am_khong_khi_bom_max}}</p>
                <p v-else>Độ ẩm không khí: Không sử dụng</p>
              </div>
              <div class="col-6">
                <p style="color:red; font-size: 16px;" class=" text-center">Đèn</p>
                <p v-if="(record.nhiet_do_den_min && record.nhiet_do_den_max)">Nhiệt độ: {{record.nhiet_do_den_min}} đến {{record.nhiet_do_den_max}}</p>
                <p v-else>Nhiệt độ: Không sử dụng</p>

                <p v-if="(record.nhiet_do_den_min && record.nhiet_do_den_max)">Độ ẩm đất: {{record.do_am_dat_den_min}} đến {{record.do_am_dat_den_max}}</p>
                <p v-else>Độ ẩm đất: Không sử dụng</p>

                <p v-if="(record.nhiet_do_den_min && record.nhiet_do_den_max)">Độ ẩm không khí: {{record.do_am_khong_khi_den_min}} đến {{record.do_am_khong_khi_den_max}}</p>
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

import {db} from "../../configs/firebase";
import { ref as reffb, set} from "firebase/database";
import { useRouter } from "vue-router";
import { useUserStore } from "../../stores/user-store"
import Swal from '../../sweetalert2'
import { useMenu } from "../../stores/menu-store";
import { useSuggestionStore } from "../../stores/suggestion-store";
import { ref, onMounted } from "vue";
import axios from "axios";
import dayjs from "dayjs";
useMenu().onSelectedKeys(["shareconfig"]);
useMenu().onOpenKeys(["shareconfig"]);
const suggestionStore = useSuggestionStore();
const userStore = useUserStore();
const router = useRouter();

onMounted(async () => {
  await suggestionStore.fetchSuggestionsByUser();
});
const columns = [
  {
    title: "Tên cây trồng",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    key: "description",
  },
  
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
  },
  {
    title: "Action",
    dataIndex: "operation",
    key: "operation",
  },
  {
    title: "Date",
    dataIndex: "createdAt",
    key: "createdAt",
  },
];
const data = ref([]);

suggestionStore.suggestionsbyuser.forEach((suggestion) => {
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
});

const deleteSuggestion = async (id) =>{
  Swal.fire({
      title: 'Are you sure you want to delete this?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
  }).then(async (result) => {
      if (result.isConfirmed) {
          try {
              await axios.delete('api/suggestion/'+id);
              await suggestionStore.fetchSuggestionsByUser();
              Swal.fire(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
              )
              console.log(data);
              data.value = data.value.filter(item => item.key !== id);

          } catch (err) {
              console.log(err)
          }
      }
  })
}

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


const useSuggestion = async (useSuggestion) =>{
  Swal.fire({
      title: 'Are you sure you want to use this?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, use it!',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
  }).then(async (result) => {
      if (result.isConfirmed) {
          try {
            await set(reffb(db, userStore.token_pots+"/configs"), {
              nhiet_do_bom_min:useSuggestion.nhiet_do_bom_min,
              nhiet_do_bom_max:useSuggestion.nhiet_do_bom_max,
              do_am_khong_khi_bom_min:useSuggestion.do_am_khong_khi_bom_min,
              do_am_khong_khi_bom_max:useSuggestion.do_am_khong_khi_bom_max,
              do_am_dat_bom_min:useSuggestion.do_am_dat_bom_min,
              do_am_dat_bom_max:useSuggestion.do_am_dat_bom_max,
              nhiet_do_den_min:useSuggestion.nhiet_do_den_min,
              nhiet_do_den_max:useSuggestion.nhiet_do_den_max,
              do_am_khong_khi_den_min:useSuggestion.do_am_khong_khi_den_min,
              do_am_khong_khi_den_max:useSuggestion.do_am_khong_khi_den_max,
              do_am_dat_den_min:useSuggestion.do_am_dat_den_min,
              do_am_dat_den_max:useSuggestion.do_am_dat_den_max,
            });
            Toast.fire({
              icon: "success",
              title: "Sử dụng thành công !",
            });
            router.push({ path: "/control" });
          } catch (err) {
            console.log(err);
            Toast.fire({
              icon: "error",
              title: "Sử dụng thất bại !",
            });
          }
      }
  })
}

</script>
