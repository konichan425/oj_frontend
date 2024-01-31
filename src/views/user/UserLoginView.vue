<template>
  <div id="userLoginView">
    <h2 style="margin-bottom: 16px">用户登录</h2>
    <a-form
      style="max-width: 480px; margin: 0 auto"
      label-align="left"
      auto-label-width
      :model="form"
      @submit="handleSubmit"
    >
      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="userPassword" tooltip="密码不少于 8 位" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 120px">
          登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { UserControllerService, UserLoginRequest } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { methods } from "@arco-design/web-vue/es/_utils/date";

/**
 * 表单信息
 */

// onMounted(() => {
//   account();
// });

const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);

const router = useRouter();
const store = useStore();

/**
 * 提交表单
 * @param data
 */
const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form);
  // 登录成功，跳转到主页
  if (res.code === 0) {
    await store.dispatch("user/getLoginUser");
    router.push({
      path: "/",
      replace: true,
    });
  } else {
    message.error("登陆失败，" + res.message);
  }
};

// const account = () => {
//   if (document.cookie.length > 0) {
//     let arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
//     // console.log(arr)
//     for (let i = 0; i < arr.length; i++) {
//       let arr2 = arr[i].split("="); //再次切割
//       //判断查找相对应的值
//       if (arr2[0] == "userAccount") {
//         this.form.userAccount = arr2[1]; //保存到保存数据的地方
//       } else if (arr2[0] == "userPassword") {
//         this.form.userPassword = arr2[1];
//       }
//     }
//   }
// };
//
// const setCookie = (userAccount: any, userPassword: any) => {
//   let ex_date = new Date();
//   ex_date.setTime(ex_date.getTime() + 24 * 60 * 60 * 1000 * ex_date);
//   document.cookie =
//     "userAccount=" +
//     userAccount +
//     ";path=/;expires=" +
//     ex_date.toLocaleString();
//   document.cookie =
//     "userPassword=" +
//     userPassword +
//     ";path=/;expires=" +
//     ex_date.toLocaleString();
// };
</script>
