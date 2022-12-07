<template>
  <div class="container-fluid p-0 d-flex justify-content-center">
    <a-card  class="bg-img" title="Đăng nhập">
      <div class="row mb-3">
        <div class="col-12 col-sm-4">
          <div class="row">
            <div class="col-6 d-flex justify-content-start mb-3">
            </div>
          </div>
        </div>

        <div class="col-12 col-sm-4 mt-5">
          <form @submit.prevent="login()">
            <div class="row mb-4">
              <div class="col-12 col-sm-3 text-start text-sm-end">
                <label>
                  <span class="text-danger me-1">*</span>
                  <span class=""
                    :class="{
                      'text-danger': errors.email,
                    }"
                  >
                    Email:
                  </span>
                </label>
              </div>
              <div class="col-12 col-sm-9">
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

            <div class="row mb-1">
              <div class="col-12 col-sm-3 text-start text-sm-end">
                <label>
                  <span class="text-danger me-1">*</span>
                  <span :class="{'text-danger': errors.password}">
                    Mật khẩu:
                  </span>
                </label>
              </div>
              <div class="col-12 col-sm-9">
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

            <div class="row  mb-4">
              <a class="login-form-forgot d-flex justify-content-end" href="">Forgot password</a>
            </div>

            <div class="row  mb-4">
              <small v-if="errors.login" class="text-danger d-flex justify-content-center">{{errors.login[0]}}
              </small>
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
                <span>Đăng nhập</span>
              </a-button>
            </div>
          </form>
        </div>

        <div class="col-12 col-sm-4">
         
        </div>
      </div>
    </a-card>
  </div>
</template>

<script setup>
import {ref, reactive } from "vue";
import { useMenu } from "../../stores/menu-store";
import { useSuggestionStore } from "../../stores/suggestion-store";
import { useRouter } from "vue-router";
import Swal from "../../sweetalert2";
import { useUserStore } from "../../stores/user-store";
import axios from "axios";

const suggestionStore = useSuggestionStore();
const router = useRouter();
const userStore = useUserStore();
const store = useMenu();
store.onSelectedKeys(["login"]);
store.onOpenKeys(["login"]);
const errors = ref([]);
const user = reactive({
  email: "",
  password: "",
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

const login = async () => {
  errors.value = [];
  if (user.email == "") {
    errors.value.email = ["vui lòng nhập đầy đủ thông tin"];
  }
  if (user.password == "") {
    errors.value.password = ["vui lòng nhập đầy đủ thông tin"];
  } 
  else {
    Swal.showLoading()
    await axios
      .post("/api/login", user)
      .then(async (response) => {
        if (response) {
          if (!response.data.error) {
            Toast.fire({
              icon: "success",
              title: "Đăng nhập thành công",
            });
            axios.defaults.headers.common["Authorization"] ="Bearer " + response.data.token;
            userStore.setUserDetails(response);

            await suggestionStore.fetchSuggestionsByUser();
            
            router.push({ path: "/dashboard" });
          } 
          else{
            Toast.fire({
              icon: "error",
              title: "Đăng nhập thất bại",
            });
            errors.value.login = ["Thông Thông Tài Khoản Mật Khẩu Không Chính Xác!"];
          }
            
        }
      })
      .catch((error) => {
        Swal.close()
        errors.value = error.response.data.errors;
      });
  }
};
</script>

<style scoped>

.bg-img{
  height: 500px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
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
