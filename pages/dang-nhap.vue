<template>
  <div
      class="min-h-screen flex flex-col items-center justify-center bg-cover"
      style="
        background-image: url('https://goodfit.vn/wp-content/uploads/2021/01/gang-tay-the-thao-chong-nang-6.jpg');
      "
    >
      <div
        class="flex flex-col bg-white opacity-90 shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md"
      >
        <div class="mt-3">
          <a-form
            ref="formRef"
            class="w-full sm:max-w-[300px] lg:max-w-[500px] relative"
            :model="formState"
            name="basic"
            layout="vertical"
        >

            <div class="flex flex-col">
              <a-form-item
              label="Tài khoản"
              name="username"
              :rules="[{ required: true, message: 'Tài khoản không được để trống!' }]"
          > 
              <a-input class="h-10 text-base" v-model:value="formState.username" placeholder="Tài khoản ...">
                <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
              </a-input>
            </a-form-item>
            </div>
            <div class="flex flex-col mb-3">
              <a-form-item
              style="margin-bottom: 0"
              label="Mật khẩu"
              name="password"
              :rules="[{ required: true, message: 'Mật khẩu không được để trống!' }]"
          >
            <a-input-password class="h-10 text-base" v-model:value="formState.password" placeholder="Mật khẩu ...">
              <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
            </a-input-password>
          </a-form-item>

            </div>

            <div class="flex w-full">
              <a-button html-type="button"
              @click="handleSubmit"
                class="flex z-auto items-center justify-center focus:outline-none h-10 text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 hover:text-white rounded py-2 w-full transition duration-150 ease-in"
              >
                <span class="justify-center uppercase">Đăng nhập</span>
              </a-button>
            </div>
          </a-form>

          <div class="mt-10">
            Chưa có tài khoản?
            <nuxt-link class="text-blue-600 hover:text-blue-700" href="/dang-ky">Đăng ký</nuxt-link>
          </div>
          <div class="mt-5"><a class="text-blue-600 hover:text-blue-700" @click="showModal">Forgot Password ?</a></div>
          
          <a-modal v-model:visible="visible" title="Quên mật khẩu" @ok="handleOk">
         <a-form 
            ref="formRef"
            style="margin: 0 auto"
            :model="formForgotPass"
            name="basic"
            layout="vertical">
          <div class="flex flex-col">
                 <a-form-item
              label="Email"
              name="email"
              :rules="[ {validator: handleValidateTypeEmail}, { required: true, message: 'Email không được để trống!' }]"
          > 
              <a-input v-model:value="formForgotPass.email" placeholder="Email ..."/>
            </a-form-item>
              </div>
         </a-form>
    </a-modal>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import { message} from "ant-design-vue";
import { authService } from "../services/AuthService";
import { fetchInstance } from "../services/FetchInstance";
const onSlideChange = () => {
  console.log("slide change");
};
const formState = reactive({
  username: '',
  password: '',
});
const formForgotPass = reactive({
  email: '',
});
const formRef = ref(null);
const visible = ref<boolean>(false);

const showModal = () => {
  visible.value = true;
  formForgotPass.email = "";
  resetValidation();
};

const resetValidation = () => {
  // Xóa thông báo validate
  formRef.value.resetFields();
};

const handleOk = (e: MouseEvent) => {
      console.log(e);
      console.log(formForgotPass.email);
      authService.forgotPassword(formForgotPass.email).then(
                res => {
                    console.log('user: ',res.data);
                    message.success('Vui lòng kiểm tra email để lấy lại mật khẩu');
                    setTimeout(() => {
                      visible.value = false;
                    }, 1000);
                },
                error => {
                    if(error.response.data.code == 9999){
                       message.warning('Email không tồn tại trong hệ thống !');
                    }
                }
            ).catch((error) => {
              message.warning('Không tìm thấy email. Vui lòng kiểm tra lại!');
              console.log(error);
            });
    };

const handleValidateTypeEmail = (rule, value) => {
  if (value && !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g.test(value)) {
    return Promise.reject('Email không hợp lệ!');
  }
    return Promise.resolve();
};


const handleSubmit = () => {
  authService.login(formState).then(
                res => {
                    console.log('user: ',res.data);
                    console.log('login success: ');
                    // fetchInstance.setCookie('token', `${res.data.content.accessToken}`, res.data.content.accessExpireIn);
                    // fetchInstance.setCookie('auth',  `${res.data.content.roles[0]}`, res.data.content.refreshExpireIn);
                    // fetchInstance.setCookie('username',  `${res.data.content.userName}`, res.data.content.refreshExpireIn);
                    window.localStorage.setItem('loggedUser', `${res.data.content.accessToken}`);
                    window.localStorage.setItem('auth', `${res.data.content.roles[0]}`);
                    window.localStorage.setItem('username', `${res.data.content.userName}`);
                    message.success('Đăng nhập thành công');
                    window.location.href = '/';
                },
                error => {
                    if(error.response.data.code == 1001){
                       message.error('Tài khoản hoặc mật khẩu không chính xác');
                    }
                }
            );
};

</script>