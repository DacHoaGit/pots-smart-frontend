<template>
  <a-card title="Nhận diện bệnh cây trồng" style="width: 100">
    <div class="row mb-3">
      <div class="col-12 col-sm-4 mb-3">
       

        <div class="row">
          <div class="col-12 d-flex justify-content-center mb-3">
            <a-avatar shape="square" :size="256">
              <template #icon>
                <img v-if="imageUrl" :src="imageUrl" alt="Avatar" />
                <div v-else>
                  <loading-outlined v-if="loading"></loading-outlined>
                  <plus-outlined v-else></plus-outlined>
                  <div class="ant-upload-text">Upload</div>
                </div>
                -->
              </template>
            </a-avatar>
          </div>

          <div class="col-12 d-flex justify-content-center">
            <a-upload
              v-model:file-list="fileList"
              class="avatar-uploader"
              :show-upload-list="false"
              action="http://localhost:3000/predict"
              :before-upload="beforeUpload"
              @change="handleChange"
            >
              <a-button type="primary">
                <i class="fa-solid fa-plus me-2"></i>
                <span>Chọn ảnh</span>
              </a-button>
            </a-upload>
          </div>
        </div>
      </div>
      <div v-if="data.class" class="col-12 col-sm-8">
        <p style="text-align: center" class="row mb-4">
          <span
            style="
              font-size: 24px;
              font-weight: 700;
              text-transform: uppercase;
              color: #0c7140;
            "
            >{{ data.class.name }}</span
          >
        </p>
        <p>
          <strong>Tỉ lệ chính xác: </strong>
          <span style="color: red">
            {{ Math.round(data.confidence * 10000) / 100 }}%
          </span>
        </p>
        <p>
          <strong>Dấu hiệu: </strong>
          <span>
            {{ data.class.sign }}
          </span>
        </p>
        <p>
          <strong>Nguyên nhân: </strong>
          <span>
            {{ data.class.cause }}
          </span>
        </p>
        <p>
          <strong>Cách phòng ngừa: </strong>
          <span>
            {{ data.class.prevention }}
          </span>
        </p>
      </div>
    </div>
  </a-card>
</template>

<script setup>
import { useMenu } from "../../stores/menu-store";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import Swal from "../../sweetalert2";
import "vue-advanced-cropper/dist/style.css";
import { ref } from "vue";
useMenu().onSelectedKeys(["identified"]);
useMenu().onOpenKeys(["identified"]);
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}


const fileList = ref([]);
const data = ref({});
const loading = ref(false);
const imageUrl = ref("");
const handleChange = (info) => {
  console.log(info.file);

  if (info.file.status === "uploading") {
    loading.value = true;
    return;
  }
  if (info.file.status === "done") {
    // Get this url from response in real world.

    data.value = info.file.response;
    getBase64(info.file.originFileObj, (base64Url) => {
      imageUrl.value = base64Url;
      loading.value = false;
    });
  }
  if (info.file.status === "error") {
    loading.value = false;
    message.error("upload error");
  }
};

const beforeUpload = async (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    console.log("You can only upload JPG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }

  const image = new Image();
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  image.src = URL.createObjectURL(file);
  await image.decode();

  canvas.width = 256;
  canvas.height = 256;
  ctx.drawImage(image, 0, 0, 256, 256);
  canvas.toBlob(async (blob) => {
    file = blob;
  });
  return isJpgOrPng && isLt2M;
};
</script>

<style scoped>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
