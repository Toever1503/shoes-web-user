<template>
  <div class="max-w-[1200px] mx-auto grid px-20 grid-cols-4 mt-10">
    <AccountSidebar />
    <div class="col-span-3 border border-solid border-gray-300 rounded-lg">
      <a-form ref="formRef" class="w-full p-4 relative" :model="formState" name="basic" layout="vertical">
        <h2 class="text-lg font-medium mb-4">Thông tin</h2>
        <div class="mb-4">
          <a-radio-group v-model:value="formState.sex">
            <a-radio :value="1">Nam</a-radio>
            <a-radio :value="2">Nữ</a-radio>
          </a-radio-group>
        </div>
        <div class="mb-4">
          <a-form-item label="Họ và tên" name="fullName">
            <a-input class="h-10 text-base" v-model:value="formState.name"
              @change="formState.name = _removeSpecialChars(formState.name)" placeholder="Họ và tên ..." />
          </a-form-item>
        </div>
        <div class="mb-4">
          <a-form-item label="Email" name="email"
            :rules="[{ validator: handleValidateTypeEmail }, { required: true, message: 'Email không được để trống!' }]">
            <a-input v-model:value="formState.email"
              @change="formState.email = formState.email.replace(/[^a-zA-Z0-9.@]/g, '')" class="h-10 text-base"
              placeholder="Email..." />
          </a-form-item>
        </div>
        <div class="mb-4">
          <a-form-item label="Số điện thoại" name="phone" :rules="[{ validator: handleValidateTypePhone }, { required: true, message: 'Số điện thoại không được để trống!' }]">
            <a-input v-model:value="formState.phone" :maxlength="10"
              @change="formState.phone = formState.phone.replace(/[^0-9@]/g, '')" class="h-10 text-base"
              placeholder="Số điện thoại" />
          </a-form-item>
        </div>
        <a-button @click="handleSubmit"
          class="h-10 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="primary"
          html-type="submit">
          Cập nhật
        </a-button>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { fetchInstance } from "../../services/FetchInstance";
import { authService } from "../../services/AuthService";

const _removeSpecialChars = inject("removeSpecialChars", (val: string) => val);
const username = fetchInstance.getCookie('username');

interface FormState {
  name: string;
  email: string;
  phone: string;
  sex: number;
  role: string;
}

const formRef = ref(null);
const formState = reactive<FormState>({
  name: '',
  email: '',
  phone: '',
  sex: 1,
  role: 'ROLE_USER'
});

const handleValidateTypePhone = (rule, value) => {
  if (value && !/((09|03|07|08|05)+([0-9]{8})\b)/g.test(value)) {
    return Promise.reject('Số điện thoại không đúng!');
  }
  return Promise.resolve();
};
const handleValidateTypeEmail = (rule, value) => {
  if (value && !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g.test(value)) {
    return Promise.reject('Email không hợp lệ!');
  }
  return Promise.resolve();
};


const accountDetail = () => {
  authService.account_detail().then(
    res => {
      console.log('res', res.data.content);
      formState.name = res.data.content.name;
      formState.email = res.data.content.email;
      formState.phone = res.data.content.phone;
    }, error => {
      console.log('error', error);

    });
}

const handleSubmit = () => {
  formRef.value?.validate()
    .then(() => {
      authService.updateAccount(formState).then(
        res => {
          console.log('res', res.data);
          message.success('Cập nhật thành công');
        }, error => {
          console.log('error', error);
          message.error('Cập nhật thất bại');
        });
    })
    .catch(err => {
      notification.warning({
        message: 'Vui lòng điền thông tin còn thiếu.'
      });
    })

}

accountDetail();
</script>