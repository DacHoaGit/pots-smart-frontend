<template>
  <a-card title="Quản lý video" style="width: 100">
    <a-form>
      <div class="col-12 col-sm-6 mb-4">
        <a-form-item label="Title" name="title">
          <a-input
            placeholder="Title"
            allow-clear
            v-model:value="video.title"
          />
        </a-form-item>
        <a-form-item label="Link" name="link">
          <a-input placeholder="Link" allow-clear v-model:value="video.link" />
        </a-form-item>
      </div>
      <div class="col-12 mb-4">
        <a-button html-type="submit" type="primary" @click="create()"
          >Thêm</a-button
        >
      </div>
    </a-form>
  </a-card>
  <a-card title="Danh sách video" style="width: 100">
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
              <div class="d-flex align-items-center">
                <a-button
                  style="margin-right: 8px; border-color: blue"
                  @click="edit(record.key, record.title, record.link)"
                  >Edit</a-button
                >

                <a-button
                  style="margin-right: 8px; border-color: red"
                  @click="deleteVideo(record.key)"
                  >Xóa</a-button
                >
              </div>
            </template>
          </template>
        </a-table>
      </div>
    </div>
  </a-card>
</template>

<script setup>
import { useMenu } from "../../stores/menu-store";
import { useVideoStore } from "../../stores/video-store";
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import Swal from "../../sweetalert2";

import dayjs from "dayjs";

const videoStore = useVideoStore();
const columns = ref([]);
const data = ref([]);
const loading = ref(false);

const video = reactive({
  title: "",
  link: "",
});
onMounted(async () => {
  getVideo();
});

const getVideo = async () => {
  data.value = [];
  await videoStore.fetchVideos();
  videoStore.videos.forEach((video) => {
    data.value.push({
      key: video.id,
      title: video.title,
      link: video.link,
      created_at: video.created_at,
    });
  });
};

const edit = async (id, tile, link) => {
  const { value: name } = await Swal.fire({
    title: "Edit Video",
    html:
      `<div><label> Title <input id="swal-input1" value="` +
      tile +
      `" class="swal2-input"></label> </div>
      <div> <label> Link  <input id="swal-input2" value="` +
      link +
      `" class="swal2-input"> </label> </div>`,
    focusConfirm: false,
    preConfirm: () => {
      Swal.showLoading();
      const formData = new FormData();
      formData.append("title", document.getElementById("swal-input1").value);
      formData.append("link", document.getElementById("swal-input2").value);
      axios
      .post("/api/video/" + id, formData)
      .then(async (response) => {
        if (response) {
          //   Swal.close();
          Toast.fire({
            icon: "success",
            title: "edit thành công",
          });
          getVideo();
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
      
    },
  });
};

const deleteVideo = async (id) => {
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
        await axios.delete("api/video/" + id);
        getVideo();
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      } catch (err) {
        console.log(err);
      }
    }
  });
};

columns.value = [
  {
    title: "title",
    dataIndex: "title",
    key: "title",
  },

  {
    title: "link",
    dataIndex: "link",
    key: "link",
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

const create = async () => {
  Swal.showLoading();
  await axios
    .post("/api/video", video)
    .then(async (response) => {
      if (response) {
        if (!response.data.error) {
          getVideo();
          Swal.close();
          Toast.fire({
            icon: "success",
            title: "Thêm thành công",
          });
        } else {
          Toast.fire({
            icon: "error",
            title: "Tạo thất bại",
          });
        }
      }
    })
    .catch((error) => {
      Swal.close();
    });
};
</script>
