<template>
  <div class="model-search-item">
    <div class="model-search-item__pic--wrap">
      <img
        src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      />
    </div>
    <div class="model-search-item__title">
      【原神】全任务全剧情1 序章 第一章 完成 捕风的异乡人 PC版 Yuan Shen
      x天马骑士x版
    </div>
    <div class="model-search-item__footer d-flex justify-space-between">
      <div class="d-flex align-center">
        <el-avatar :size="30" :src="data.avatar"> </el-avatar>
        <span class="ml-2">{{ data.nickname }}</span>
      </div>
      <div class="d-flex justify-space-around align-center">
        <SvgIcon name="liulan"></SvgIcon>
        {{ data.lookNum }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  data: Object,
});
</script>

<style scoped lang="scss">
.model-search-item {
  width: 100%;
  box-sizing: border-box;
  max-width: 400px;
}

.model-search-item__pic--wrap {
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  padding-top: 66%;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
    border-radius: 6px;
    overflow: hidden;
  }
}
.model-search-item__title {
  --title-line-height: 22px;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word !important;
  line-break: anywhere;
  -webkit-line-clamp: 2;
  padding-right: 16px;
  font-size: 14px;
  line-height: 22px;
  height: calc(2 * var(--title-line-height));
  color: var(--text1);
  transition: color 0.2s linear;
}

.model-search-item__footer {
  font-size: 13px;
  color: #9499a0;
}
</style>
