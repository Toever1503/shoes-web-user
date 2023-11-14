<template>
<div class="container mx-auto w-2/5 grid mt-10 ">  
    <a-card title="Đổi mật khẩu">
        <div class="px-10">
            <p>Chào {{ qParam  }} !</p>
            <p>Bạn đã yêu cầu phục hồi mật khẩu, vui lòng nhập mật khẩu mới</p>
            <a-form
            ref="formRef"
            :model="formState"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            >
                    <a-form-item
                name="newPasswd"
                :rules="[ {required: true,
                        validator: handleTypePassword
                    }]"
            >
                <span class="">Mật khẩu <span class="text-red-500">(*)</span></span>
                <a-input-password v-model:value="formState.newPasswd">
                <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
            </a-input-password>
            </a-form-item>

            <a-form-item
                name="conFNewPasswd"
                :rules="[{required: true,
                        validator: handleConfirmPassword
                    }]"
            >
                <span>Xác nhận mật khẩu mới<span class="text-red-500">(*)</span></span>
                <a-input-password v-model:value="formState.conFNewPasswd">
                <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
                </a-input-password>
            </a-form-item>

            <a-form-item>
                <a-button type="primary" class="ml-[555px] mt-3" @click="onSubmit">Đổi mật khẩu</a-button>
            </a-form-item>
            </a-form>
        </div>
  </a-card>
</div>
</template>

<script lang="ts" setup>
const route = useRoute();

const qParam = route.query.q;

const tParam = route.query.t;
console.log('qParam', qParam);

console.log('tParam', tParam);
const onSubmit = () => {
    formRef.value
    .validate()
    .then(() => {
      // Check if passwords match
      if (formState.password !== formState.pass) {
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
    })
    .catch(error => {
      console.log('Validation error', error);
    });
};
const formState = reactive({
  newPasswd: '',
  conFNewPasswd: '',
});
    const formRef = ref();

    const resetForm = () => {
      formRef.value.resetFields();
    };

    const handleTypePassword = (rule, value) => {
  if (value === '') {
    return Promise.reject('Mật khẩu không được để trống!');
  }
  if (value.length < 6) {
    return Promise.reject('Mật khẩu phải có ít nhất 6 ký tự!');
  }
  formRef.value.validateFields('conFNewPasswd').then(res => {
    console.log('after: ', res)
  }).catch(err => {
    console.log('err: ', err)
  });
  return Promise.resolve();
}   

const handleConfirmPassword = (rule, value) => {
  if (value === '')
    return Promise.reject('Vui lòng không được để trống!');
  else if (value !== formState.newPasswd) {
    return Promise.reject('Mật khẩu không khớp!');
  }
  return Promise.resolve();
};


</script>