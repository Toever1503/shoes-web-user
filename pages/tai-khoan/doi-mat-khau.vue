<template>
  <div class="max-w-[1200px] mx-auto grid px-20 grid-cols-4 mt-10">
    <AccountSidebar />

    <div class="col-span-3 border border-solid border-gray-300 rounded-lg p-4">
      <h1 class="font-600 uppercase">Đổi mật khẩu</h1>
      <a-form ref="formRef" :model="formState" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item name="oldPassword" :rules="[{
          required: true, validator: handleTypeOldPassword
        }]">
          <span class="">Mật khẩu cũ <span class="text-red-500">(*)</span></span>
          <a-input-password v-model:value="formState.oldPassword">
            <template #prefix>
              <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item name="newPassword" :rules="[{
          required: true,
          validator: handleTypePassword
        }, {min: 6, message: 'Mật khẩu cần phải tối thiểu 6 ký tự!'}]">
          <span class="">Mật khẩu mới <span class="text-red-500">(*)</span></span>
          <a-input-password v-model:value="formState.newPassword" @change="formState.newPassword = formState.newPassword.toLowerCase()">
            <template #prefix>
              <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item name="newPasswordConfirm" :rules="[{
          required: true,
          validator: handleConfirmPassword
        }, {min: 6, message: 'Mật khẩu cần phải tối thiểu 6 ký tự!'}]">
          <span>Xác nhận mật khẩu mới<span class="text-red-500">(*)</span></span>
          <a-input-password v-model:value="formState.newPasswordConfirm" @change="formState.newPasswordConfirm = formState.newPasswordConfirm.toLowerCase()">
            <template #prefix>
              <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" @click="onSubmit">Đổi mật khẩu</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { authService } from "~/services/AuthService";
import { useRoute, useRouter } from "vue-router";

const _router = useRouter();

const formState = reactive({
  oldPassword: '',
  newPassword: '',
  newPasswordConfirm: '',
});
const formRef = ref();
const handleTypeOldPassword = (rule, value) => {
  if (value === '') {
    return Promise.reject('Mật khẩu không được để trống!');
  }
  if (value.length < 6) {
    return Promise.reject('Mật khẩu phải có ít nhất 6 ký tự!');
  }
  return Promise.resolve();
}

const handleTypePassword = (rule, value) => {
  if (value === '') {
    return Promise.reject('Mật khẩu không được để trống!');
  }
  if (value.length < 6) {
    return Promise.reject('Mật khẩu phải có ít nhất 6 ký tự!');
  }
  formRef.value.validateFields('newPasswordConfirm').then(res => {
    console.log('after: ', res)
  }).catch(err => {
    console.log('err: ', err)
  });
  return Promise.resolve();
}

const handleConfirmPassword = (rule, value) => {
  if (value === '')
    return Promise.reject('Vui lòng không được để trống!');
  else if (value !== formState.newPassword) {
    return Promise.reject('Mật khẩu không khớp!');
  }
  return Promise.resolve();
};
const onSubmit = () => {
  formRef.value
    .validate()
    .then(() => {
      // Check if passwords match
      if (formState.newPassword !== formState.newPasswordConfirm) {
        // Passwords do not match, show error message
        formRef.value.setFields([
          {
            pass: 'pass',
            errors: ['Passwords do not match'],
          },
        ]);
        console.log('Passwords do not match');
        return;
      }
      // Passwords match, proceed with the form submission


      console.log('Values submitted', formState, toRaw(formState));
      authService.changePassword(formState).then((res) => {
        console.log("res: ", res);
        if (res.data.code == 0) {
          message.success("Đổi mật khẩu thành công");
          _router.push("/tai-khoan/thong-tin");
        } else if (code == 1001) {
          message.error("Mật khẩu cũ của bạn không chính xác vui lòng nhập lại");
        }
      }).catch((err) => {
        message.error("Mật khẩu cũ của bạn không chính xác vui lòng kiểm tra lại!");
      });
    })
    .catch(error => {
      console.log('Validation error', error);
    });
};
</script>