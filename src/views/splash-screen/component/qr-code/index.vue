<script setup lang="ts">
import QS from "qs";
import QRCode from "qrcode";
import { getLoginUrlApi, verifyQrCodeApi } from "@/api";
import { CDN_URL, UP_INFO } from "@/constants";
import { setStore } from "@/store/tauri";

// 进入主窗口的事件
const enterMainWindow: any = inject("enterMainWindow");

// 二维码图片
const qrCodeImage = ref<string>();

// 扫码状态 0 未扫码 1 已扫码 2 已过期 3 扫码并登录
const qrCodeStatus = ref<0 | 1 | 2 | 3>(0);

// 获取登录链接，生成二维码
const getQRCode = async () => {
  qrCodeStatus.value = 0;
  qrCodeImage.value = "";

  const result = await getLoginUrlApi();
  if (!result) {
    setTimeout(getQRCode, 1000 * 3);

    return;
  }

  const { oauthKey, url } = result;
  qrCodeImage.value = await QRCode.toDataURL(url);
  verifyQrCode(oauthKey);
};

// 验证扫码信息
const verifyQrCode = async (oauthKey: string) => {
  const result = await verifyQrCodeApi(oauthKey);

  if (!result) {
    setTimeout(() => verifyQrCode(oauthKey), 1000 * 3);

    return;
  }

  switch (result) {
    // 二维码已过期
    case -2:
      qrCodeStatus.value = 2;
      break;

    // 未扫码
    case -4:
      setTimeout(() => verifyQrCode(oauthKey), 1000 * 3);
      break;

    // 已扫码,之后再次请求获取登陆信息
    case -5:
      qrCodeStatus.value = 1;

      setTimeout(() => verifyQrCode(oauthKey), 1000 * 3);
      break;

    // 扫码并登录
    default:
      qrCodeStatus.value = 3;

      const { DedeUserID, bili_jct, SESSDATA } = QS.parse(
        result.url.split("?")[1]
      );

      await setStore(UP_INFO.uid, DedeUserID);
      await setStore(UP_INFO.cookie, `SESSDATA=${SESSDATA}`);
      await setStore(UP_INFO.csrf, bili_jct);

      enterMainWindow();

      break;
  }
};

onMounted(() => getQRCode());
</script>

<template>
  <div class="relative h-40 w-40">
    <img
      :src="qrCodeImage || `${CDN_URL}/img/loading.gif`"
      class="h-full w-full"
    >

    <n-result
      status="success"
      description="扫码成功"
      v-if="qrCodeStatus === 1"
    />

    <n-result
      description="二维码已过期"
      class="cursor-pointer"
      @click="getQRCode"
      v-else-if="qrCodeStatus === 2"
    >
      <template #icon>
        <n-icon class="i-carbon-renew text-blue rotate-90 text-4xl" />
      </template>
    </n-result>

    <n-result
      status="success"
      description="登录成功"
      v-else-if="qrCodeStatus === 3"
    />
  </div>
</template>

<style scoped lang="scss">
.n-result {
  @apply bg-white/85 absolute top-0 left-0 flex h-full w-full flex-col justify-center;
}
</style>