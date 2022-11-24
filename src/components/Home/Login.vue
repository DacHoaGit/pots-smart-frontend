<template>
    <div class="container-fluid p-0  d-flex justify-content-center">
        <a-card title="Đăng nhập">
          <div class="row mb-3">
  
            <div class="col-12 col-sm-4">
              <div class="row">
                <div class="col-6 d-flex justify-content-start mb-3">
                      <img class="d-none d-sm-flex" width="500" src="../../assets/logo.png" alt="Avatar" />
                      <img class="d-sm-none d-flex" width="100" src="../../assets/logo.png" alt="Avatar" />
                </div>
                <div class="col-6 d-sm-none d-flex justify-content-end mb-3">
                      <img class="d-sm-none d-flex" width="100" src="../../assets/logo.png" alt="Avatar" />
                </div>
              </div>
            </div>
  
            
            <div class="col-12 col-sm-4 mt-5">
              <form @submit.prevent="login()" >
  
  
                <div class="row mb-4">
                  <div class="col-12 col-sm-3 text-start text-sm-end">
                    <label>
                      <span class="text-danger me-1">*</span>
                      <span :class="{
                        'text-danger': errors.email
                      }">
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
                        'input-danger': errors.email
                      }"
                    />
                    <div class="w-100"></div>
                    <small v-if="errors.email" class="text-danger">{{ errors.email[0] }}</small>
                  </div>
                </div>
  
                <div class="row mb-4">
                  <div class="col-12 col-sm-3 text-start text-sm-end">
                    <label>
                      <span class="text-danger me-1">*</span>
                      <span :class="{
                        'text-danger': errors.password
                      }">
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
                        'input-danger': errors.password
                      }"
                    />
                    <div class="w-100"></div>
                    <small v-if="errors.password" class="text-danger">{{ errors.password[0] }}</small>
                  </div>
                </div>
  
                
                <div class="col-12 d-grid d-sm-flex justify-content-sm-center mx-auto">
                  <a-button class="w-xl-25" type="primary" html-type="submit" size="large">
                    <span >Đăng nhập</span>
                  </a-button>
                </div>
              </form>
            </div>
  
            <div class="col-12 col-sm-4">
              <div class="row">
                <div class="col-12 d-none  d-sm-flex justify-content-sm-end mb-3">
                      <img width="500" src="../../assets/logo.png" alt="Avatar" />
                </div>
              </div>
            </div>


          </div>
        </a-card>
    </div>
  </template>
  
  
  <script setup>
    import { defineComponent, ref, reactive, toRefs } from "vue";
    import { useMenu } from "../../stores/menu-store";
    import { notification } from 'ant-design-vue';
    import { useRouter } from "vue-router";
    import { message } from 'ant-design-vue';
    import {useUserStore} from '../../stores/user-store'
    import axios from 'axios'
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
    const openNotificationWithIcon = type => {
      notification[type]({
        message: 'Đăng nhập thành công !',
        duration: 2.5,
        description: '',
      });
    };

    const login = () => {
      errors.value = [];
      if(user.email == ''){
        errors.value.email = ["vui lòng nhập đầy đủ thông tin"]
      }
      if(user.password == ''){
        errors.value.password = ["vui lòng nhập đầy đủ thông tin"]
      }
      else{
        axios.post("/api/login", user)
        .then((response) => {
          if(response) {
            if(!response.data.error){
              openNotificationWithIcon('success')
              axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
              userStore.setUserDetails(response);
              router.push({path: "/dashboard"});
            }
          else
            message.error("Đăng nhập thất bại");
          }
        })
        .catch((error) => {
          errors.value = error.response.data.errors;
        });
      }
    }

  </script>
  
  <style scoped>
  .ant-card {
    background-color: #f3f8fd;
    border-radius: 50px;
    width: 100%;
    height:100vh;
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