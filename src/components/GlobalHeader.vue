<template>
  <div id="globalHeader">
    <a-row style="margin-bottom: 16px" align="center">
      <a-col flex="auto">
        <a-menu
          mode="horizontal"
          :selected-keys="selectedKeys"
          @menu-item-click="doMenuClick"
        >
          <a-menu-item
            key="0"
            :style="{ padding: 0, marginRight: '38px' }"
            disabled
          >
            <div id="title-bar">
              <img class="logo" src="../assets/dog.jpg" />
              <div class="title">OJ</div>
            </div>
          </a-menu-item>
          <a-menu-item v-for="item in routes" :key="item.path">
            {{ item.name }}
          </a-menu-item>
        </a-menu>
      </a-col>
      <a-col flex="100px">
        <div>
          {{ store.state.user?.loginUser?.userName ?? "未登录" }}
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { routes } from "../router/routes";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useStore } from "vuex";

const router = useRouter();

// 默认主页
const selectedKeys = ref(["/"]);

// 路由跳转后，更新选中的菜单项
router.afterEach((to, from, failuer) => {
  selectedKeys.value = [to.path];
});

const store = useStore();

setTimeout(() => {
  store.dispatch("user/getLoginUser", {
    userName: "鱼皮",
    role: "admin",
  });
  console.log(store.state.user.loginUser.role);
}, 3000);

// 点击菜单跳转
const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};
</script>

<style scoped>
#title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: #444;
  margin-left: 16px;
}

.logo {
  height: 48px;
}
</style>
