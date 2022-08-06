<script setup lang="ts">
import QRCode from "qrcode";
import { getLoginUrlApi, verifyQrCodeApi } from "@/api";

// 二维码图片
const qrCodeImage = ref<string>();

// 扫码状态 0 未扫码 1 已扫码 2 已过期 3 扫码并登录
const qrCodeStatus = ref<0 | 1 | 2 | 3>(0);

const emit = defineEmits(["checked"]);

// 获取登录链接，生成二维码
const getQRCode = async () => {
  try {
    const { oauthKey, url } = await getLoginUrlApi();

    qrCodeImage.value = await QRCode.toDataURL(url);
    verifyQrCode(oauthKey);
  } catch (error) {
    qrCodeImage.value = "@/assets/img/no-data.png";
  }
};

// 验证扫码信息
const verifyQrCode = async (oauthKey: string) => {
  let result: number;

  try {
    result = await verifyQrCodeApi(oauthKey);
  } catch (error) {
    return;
  }

  switch (result) {
    // 验证码不存在
    case -1:
      // qrCodeStatus.value = 2;
      break;

    // 二维码已过期
    case -2:
      qrCodeStatus.value = 2;
      break;

    // 未扫码
    case -4:
      setTimeout(() => {
        verifyQrCode(oauthKey);
      }, 1000 * 3);
      break;

    // 已扫码,之后再次请求获取登陆信息
    case -5:
      qrCodeStatus.value = 1;

      setTimeout(() => {
        verifyQrCode(oauthKey);
      }, 3000);
      break;

    // 扫码并登录
    default:
      qrCodeStatus.value = 3;

      console.log("result", result);

      // const { DedeUserID, bili_jct, SESSDATA } = QS.parse(
      //   result?.data.url.split("?")[1]
      // );

      // // 存储用户信息
      // setStore("UP_INFO",{
      //   uid: Number(DedeUserID),
      //   cookie: `SESSDATA=${SESSDATA}`,
      //   csrf: bili_jct
      // });

      // 通知父组件再次检测是否登录
      emit("checked");

      break;
  }
};

onMounted(() => getQRCode());
</script>

<template>
  <div class="relative">
    <div
      class="flex h-full w-full items-center justify-center bg-white opacity-80"
      v-if="qrCodeStatus"
    >
      <n-result
        status="success"
        description="扫码成功"
        v-if="qrCodeStatus === 1"
      />

      <n-result
        status="error"
        description="二维码已过期"
        v-else-if="qrCodeStatus === 2"
      >
        <template #icon>
          <n-icon
            class="i-carbon-renew text-blue rotate-90 text-4xl hover:cursor-pointer"
            @click="getQRCode"
          >
            换一张
          </n-icon>
        </template>
      </n-result>

      <n-result
        status="success"
        description="登录成功"
        v-else-if="qrCodeStatus === 3"
      />
    </div>
    <img
      :src="qrCodeImage"
      alt="加载二维码..."
      class="-z-1 absolute top-0 left-0 h-full w-full"
    >
  </div>
</template>

<style lang="scss"></style>