<template>
  <div class="container-fluid p-0 d-flex justify-content-center">
    <a-card title="Tạo tài khoản">

      <div style="" class="card">
        <div class="card-icon">
          <img src="../../assets/user.png" alt="" />
        </div>
        <div class="card-body">
          <h5 class="card-title">Đăng kí tài khoản</h5>
          <div class="card-text">
            <form class="w-100" @submit.prevent="createUsers()">
            <div class="row mb-4">
              <div class="col-12 col-sm-3 text-start text-sm-end d-sm-flex justify-content-center align-items-center">
                <label>
                  <span
                  :class="{
                    'text-danger': errors.name,
                  }"
                  >
                  Họ và tên:
                  <span class="text-danger me-1">*</span>
                  </span>
                </label>
              </div>
              <div class="col-12 col-sm-7">
                <a-input
                  placeholder="Tên Tài khoản"
                  allow-clear
                  v-model:value="user.name"
                  :class="{
                    'input-danger': errors.name,
                  }"
                />
                <div class="w-100"></div>
                <small v-if="errors.name" class="text-danger">{{
                  errors.name[0]
                }}</small>
              </div>
            </div>

            <div class="row mb-4">
              <div class="col-12 col-sm-3 text-start text-sm-end d-sm-flex justify-content-center align-items-center">
                <label>
                  <span
                  :class="{
                    'text-danger': errors.email,
                  }"
                  >
                  Email:
                  <span class="text-danger me-1">*</span>
                  </span>
                </label>
              </div>
              <div class="col-12 col-sm-7">
                <a-input
                  placeholder="Email"
                  allow-clear
                  v-model:value="user.email"
                  :class="{
                    'input-danger': errors.email,
                  }"
                />
                <div class="w-100"></div>
                <small v-if="errors.email" class="text-danger">{{
                  errors.email[0]
                }}</small>
              </div>
            </div>

            <div class="row mb-4">
              <div class="col-12 col-sm-3 text-start text-sm-end d-sm-flex justify-content-center align-items-center">
                <label>
                  <span
                  :class="{
                    'text-danger': errors.password,
                  }"
                  >
                  Mật khẩu:
                  <span class="text-danger me-1">*</span>
                  </span>
                </label>
              </div>
              <div class="col-12 col-sm-7">
                <a-input-password
                  placeholder="Mật khẩu"
                  allow-clear
                  v-model:value="user.password"
                  :class="{
                    'input-danger': errors.password,
                  }"
                />
                <div class="w-100"></div>
                <small v-if="errors.password" class="text-danger">{{
                  errors.password[0]
                }}</small>
              </div>
            </div>

            <div class="row mb-4">
              <div class="col-12 col-sm-3 text-start text-sm-end d-sm-flex justify-content-center align-items-center">
                <label>
                  <span
                  :class="{
                    'text-danger': errors.password_confirmation,
                  }"
                  >
                  Xác nhận mật khẩu:
                  <span class="text-danger me-1">*</span>
                  </span>
                </label>
              </div>
              <div class="col-12 col-sm-7">
                <a-input-password
                  placeholder="Mật khẩu"
                  allow-clear
                  v-model:value="user.password_confirmation"
                  :class="{
                    'input-danger': errors.password_confirmation,
                  }"
                />
                <div class="w-100"></div>
                <small
                  v-if="errors.password_confirmation"
                  class="text-danger"
                  >{{ errors.password_confirmation[0] }}</small
                >
              </div>
            </div>

            <div
              class="col-12 d-grid d-sm-flex justify-content-sm-center mx-auto"
            >
              <a-button
                class="w-xl-25"
                type="primary"
                html-type="submit"
                size="large"
              >
                <span>Đăng kí</span>
              </a-button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script setup>
import { defineComponent, ref, reactive, toRefs } from "vue";
import { useMenu } from "../../stores/menu-store";
import { useRouter } from "vue-router";
import Swal from "../../sweetalert2";
import axios from "axios";
const router = useRouter();
const errors = ref([]);
const store = useMenu();
store.onSelectedKeys(["register"]);
store.onOpenKeys(["register"]);
const user = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
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
const createUsers = () => {
  errors.value = [];
  Swal.showLoading ()
  axios
    .post("/api/register", user)
    .then((response) => {
      if (response) {
        Swal.close()
        Toast.fire({
          icon: "success",
          title: "Đăng kí thành công",
        });
        router.push("/login");
      }
    })
    .catch((error) => {
      Swal.close()
      errors.value = error.response.data.errors;
    });
};
</script>

<style scoped>


.card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 2px 10px #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 800px;
  margin: 80px auto;
  text-align: center;
  transition: all 0.3s ease-in-out;
  height: auto; 
  margin-top: 50px;
}

.card:hover {
  transform: scale(1.1);
}

.card-icon {
  font-size: 60px;
  color: #5b5b5b;
  margin-top: 20px;
}

.card-body {
  padding: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.card-title {
  font-weight: bold;
  font-size: 20px;
  color: #333;
  margin-top: 10px;
  margin-bottom: 35px;
  width: 100%;
}

.card-text {
  font-size: 14px;
  color: #333;
  margin-top: 10px;
  text-align: justify;
  display: flex;
  justify-content: center;
  width: 100%;
}

@media (max-width: 767px) {
  .card {
    width: 90%;
    margin: 10px auto;

    height: auto;
    margin-top: 10px;
  }
  
}
.ant-card {
  background-color: #f3f8fd;
  border-radius: 50px;
  width: 100%;
  height: 100vh;
}
.ant-card-head {
  font-size: 32px;
  text-align: center;
}
.select-danger {
  border: 1px solid red;
}
.input-danger {
  border-color: red;
}
.ant-input-affix-wrapper {
  font-size: 24px;
}
</style>
