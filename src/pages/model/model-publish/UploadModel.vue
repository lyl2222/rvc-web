<template>
  <div class="model-file-upload">
    <el-upload
      action="#"
      :auto-upload="false"
      v-model:file-list="fileList"
      :on-change="handleChange"
      :on-progress="handleProgress"
      :show-file-list="false"
      :class="{ 'upload-wrap': true, hide: fileList.length === 0 }"
      v-show="fileList.length === 0"
    >
      <template #trigger>
        <div class="upload-icon">
          <el-icon size="20"><Upload/></el-icon>
          <!-- <svg-icon name="upload"></svg-icon> -->
        </div>
      </template>
    </el-upload>
    <div class="upload-list">
      <div
        class="upload-list__item"
        v-for="(file, index) in fileList"
        :key="index"
      >
        <div class="upload-list__item-icon-wrap">
          <el-image
            style="width: 100px; height: 100px"
            :src="file.url || '/rvc.svg'"
            fit="contain"
          />
        </div>
        <div class="upload-list__item-detail">{{ file.name }}</div>
        <div class="upload-list__item-ctrl">
          <span
            class="upload-list__item-delete"
            @click="fileList.splice(fileList.indexOf(file), 1)"
          >
            <el-icon size="20"><Delete /></el-icon>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Delete, Upload } from "@element-plus/icons-vue";
import type { UploadFile, UploadProgressEvent } from "element-plus";

import { uploadModel } from "@/api/oss";

defineProps<{
  modelValue: string;
}>();
const emit = defineEmits(["update:modelValue"]);

const fileList = ref<UploadFile[]>([]);
const handleChange = async (file: UploadFile) => {
  console.log(file);
  return;
  let fid;
  // 上传
  if (file.raw) {
    const formData = new FormData();
    formData.append("model", file.raw);
    try {
      const res = await uploadModel(formData);
      fid = res.data.fid;
    } catch (error) {
      emit("update:modelValue", "");
    }
  }
  // 设置fid
  if (fid) {
    emit("update:modelValue", fid);
  }
};
const handleProgress = (evt: UploadProgressEvent) => {
  console.log("progress");
};
</script>

<style scoped lang="scss">
.model-file-upload {
  display: flex;
  height: 100px;
  justify-content: center;
  align-items: center;

  width: 600px;
}
.upload-icon {
  background-color: #fafafa;
  border: 1px dashed #cdd0d6;
  border-radius: 6px;
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  cursor: pointer;
  vertical-align: top;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
.upload-wrap {
  height: 100px;
  flex: 0 0 100px;
  transition: width 0.5s;
  &.hide {
    width: 0%;
  }
}
.upload-list {
  flex: 1;
  align-items: stretch;
  transition: width 0.5s;
}
.upload-list__item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  min-width: 400px;
  padding: 20px 0 20px 0;
  position: relative;
  border: 1px solid #ccc;

  .upload-list__item-icon-wrap {
    margin: 0 10px 0 32px;
    width: 80px;
    height: 38px;
    border-radius: 8px;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .upload-list__item-detail {
    flex: 1;
  }

  &:hover .upload-list__item-ctrl .upload-list__item-delete {
    display: flex;
  }
  .upload-list__item-ctrl {
    width: 50px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333;

    .upload-list__item-delete {
      display: none;
      justify-content: center;
      align-items: center;
    }
  }
  .upload-list__item-mask {
    display: none;
    position: absolute;
    top: 25px;
    right: 0px;
    width: 50px;
    height: 50px;

    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    z-index: 1;
  }
}
</style>
