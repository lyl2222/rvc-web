<template>
  <div class="">
    <div class="rvc-bgc"></div>
    <Header />
    <div class="header-after" style="height: 60px"></div>
    <router-view></router-view>
    <Footer :webInfo="webInfo" />
  </div>
</template>

<script lang="ts" setup>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import { getMember, getWebInfo } from "@/api/website";
import { userInfo } from "@/api/user";

import { useUserStore } from "@/store/user";
const userStore = useUserStore();
if (userStore.userInfo?.username) {
  userInfo({ username: userStore.userInfo.username });
}

const webInfo = ref<{
  beianInfo: string;
  id: number;
  masterQq: string;
  officialQq: string;
  webName: string;
  websiteUrl: string;
}>();

getWebInfo().then((res) => {
  if (res?.data?.webInfo) {
    webInfo.value = res.data.webInfo;
  }
});
</script>

<style lang="scss">
.rvc-bgc {
  pointer-events: none;
  z-index: -1;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  top: 0;
  height: 100vh;
  background-color: var(--el-bg-color-page);
}
</style>
