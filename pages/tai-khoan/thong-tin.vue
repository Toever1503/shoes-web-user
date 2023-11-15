<template>
  <div class="max-w-[1200px] mx-auto grid px-20 grid-cols-4 mt-10">
    <div class="col-span-1">

      <!-- <div class="w-48 h-auto border border-solid border-gray-200 rounded-lg">
        <img class="ml-6 mt-2 rounded-full w-36" src="https://th.bing.com/th/id/OIP.sv0AyRSdUVI72wlCMqYQ3gAAAA?pid=ImgDet&rs=1" alt="image description">

        <a-button class="bg-purple-500 h-10 hover:bg-purple-700 text-white font-medium ml-12 mt-10 mb-2  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit">Logout</a-button>
      </div> -->

      <div
          class="w-60 text-gray-900 bg-white border border-gray-200"
      >
        <nuxt-link to="/tai-khoan/thong-tin">
          <div
              class="py-5 uppercase relative inline-flex items-center rounded-t-lg w-full px-4 text-sm font-medium divide-y divide-slate-200 border-solid border  border-gray-200 hover:bg-blue-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
          >
            <svg
                class="w-3 h-3 mr-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
              <path
                  d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"
              />
            </svg>
            Thông tin cá nhân
          </div>
        </nuxt-link>
        <nuxt-link to="/tai-khoan/lich-su-mua">
          <div
              type="button"
              class="py-5 uppercase relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-solid border  border-gray-200 hover:bg-blue-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
          >
            <svg
                class="w-3 h-3 mr-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
            >
              <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7.75 4H19M7.75 4a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 4h2.25m13.5 6H19m-2.25 0a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 10h11.25m-4.5 6H19M7.75 16a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 16h2.25"
              />
            </svg>
            Lịch sử mua
          </div>
        </nuxt-link>
        <nuxt-link to="/tai-khoan/change-password">
          <div
            type="button"
            class="py-5 uppercase relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-solid border  border-gray-200 hover:bg-blue-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
        >
          <svg
              class="w-3 h-3 mr-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 18"
              fill="currentColor"
          >
            <path
                d="M18 4H16V9C16 10.0609 15.5786 11.0783 14.8284 11.8284C14.0783 12.5786 13.0609 13 12 13H9L6.846 14.615C7.17993 14.8628 7.58418 14.9977 8 15H11.667L15.4 17.8C15.5731 17.9298 15.7836 18 16 18C16.2652 18 16.5196 17.8946 16.7071 17.7071C16.8946 17.5196 17 17.2652 17 17V15H18C18.5304 15 19.0391 14.7893 19.4142 14.4142C19.7893 14.0391 20 13.5304 20 13V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4Z"
                fill="currentColor"
            />
            <path
                d="M12 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V9C0 9.53043 0.210714 10.0391 0.585786 10.4142C0.960859 10.7893 1.46957 11 2 11H3V13C3 13.1857 3.05171 13.3678 3.14935 13.5257C3.24698 13.6837 3.38668 13.8114 3.55279 13.8944C3.71889 13.9775 3.90484 14.0126 4.08981 13.996C4.27477 13.9793 4.45143 13.9114 4.6 13.8L8.333 11H12C12.5304 11 13.0391 10.7893 13.4142 10.4142C13.7893 10.0391 14 9.53043 14 9V2C14 1.46957 13.7893 0.960859 13.4142 0.585786C13.0391 0.210714 12.5304 0 12 0Z"
                fill="currentColor"
            />
          </svg>
          Đổi mật khẩu
        </div>
        </nuxt-link>
        <div
            type="button"
            class="py-5 uppercase relative inline-flex items-center w-full px-4 py-2 text-sm rounded-b-lg font-medium border-solid border  border-gray-200 hover:bg-blue-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
        >
          <svg
              class="w-3 h-3 mr-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
          >
            <path
                d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"
            />
            <path
                d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"
            />
          </svg>
         Đăng xuất
        </div>
      </div>
    </div>
    <div class="col-span-3 border border-solid border-gray-300 rounded-lg">
      <a-form
          ref="formRef"
          class="w-full p-4 relative"
          :model="formState"
          name="basic"
          layout="vertical"
      >
        <h2 class="text-lg font-medium mb-4">Thông tin</h2>
        <div class="mb-4">
          <a-radio-group v-model:value="formState.sex">
            <a-radio :value="1">Nam</a-radio>
            <a-radio :value="2">Nữ</a-radio>
          </a-radio-group>
        </div>
        <div class="mb-4">
          <a-form-item
              label="Họ và tên"
              name="fullName"
          >
            <a-input  class="h-10 text-base" v-model:value="formState.name" placeholder="Họ và tên ..."/>
          </a-form-item>
        </div>
        <div class="mb-4">
          <a-form-item
              label="Email"
              name="email"
          >
            <a-input v-model:value="formState.email" class="h-10 text-base" placeholder="Email..."/>
          </a-form-item>
        </div>
        <div class="mb-4">
          <a-form-item
              label="Số điện thoại"
              name="phone"
          >
            <a-input v-model:value="formState.phone" class="h-10 text-base" placeholder="Số điện thoại"/>
          </a-form-item>
        </div>
        <a-button @click="handleSubmit"
            class="bg-purple-500 h-10 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
        >
          Submit
        </a-button>
      </a-form>
    </div>
  </div>

</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";
import { fetchInstance } from "../../services/FetchInstance";
import { authService } from "../../services/AuthService";

const username = fetchInstance.getCookie('username');

interface FormState {
  name: string;
  email: string;
  phone: string;
  sex: number;
  role: string;
}

const formState = reactive<FormState>({
  name: '',
  email: '',
  phone: '',
  sex: 1,
  role: 'ROLE_USER'
});

const formRef = ref(null);


const accountDetail = () =>{
  authService.account_detail().then(
    res =>{
      console.log('res', res.data.content);
      formState.name = res.data.content.name;
      formState.email = res.data.content.email;
      formState.phone = res.data.content.phone;
    },error => {
    console.log('error', error);
  
  });
}

const handleSubmit = () => {
  authService.updateAccount(formState).then(
    res => {
      console.log('res', res.data);
      message.success('Cập nhật thành công');
    },error => {
      console.log('error', error);
      message.error('Cập nhật thất bại');
    });
}

accountDetail();
</script>