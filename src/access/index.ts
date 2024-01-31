import router from "@/router";
import store from "@/store";
import ACCESS_ENUM from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";

router.beforeEach(async (to, from, next) => {
  const user = store.state.user;
  let currentUser = user.loginUser;
  console.log("登陆用户信息", currentUser);
  // 如果之前没登陆过，自动登录
  if (!currentUser || !currentUser.userRole) {
    // 加 await 是为了等用户登录成功之后，再执行后续的代码
    await store.dispatch("user/getLoginUser");
  }
  currentUser = user.loginUser;
  console.log(currentUser.userRole);
  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN;
  // 要跳转的页面必须要登陆
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    console.log(currentUser.userRole);
    // 如果没登陆，跳转到登录页面
    if (!currentUser || !currentUser.userRole) {
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }
    // 如果已经登陆了，但是权限不足，那么跳转到无权限页面
    if (!checkAccess(currentUser, needAccess)) {
      next("/noAuth");
      return;
    }
  }
  next();
});
