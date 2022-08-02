<script setup lang="ts">
// 联系方式
const contactDetails = [
  {
    label: "QQ",
    value: "473033518",
    href: "https://wpa.qq.com/msgrd?v=3&uin=473033518&site=qq&menu=yes"
  },
  {
    label: "QQ群1",
    value: "1016788384",
    href: "https://jq.qq.com/?_wv=1027&k=n8dX7wdt"
  },
  {
    label: "QQ群2",
    value: "473033518",
    subValue: "(与 QQ 同号)",
    href: "https://jq.qq.com/?_wv=1027&k=Atkf9u0H"
  },
  {
    label: "微信",
    value: "ayang473033518"
  }
];
</script>

<template>
  <div class="about-helper indent-8 tracking-wide">
    <n-p>
      本软件完全免费，代码已开源，开源地址：
      <n-a
        href="https://github.com/bilibili-ayang/bilibili-live-helper"
        target="_blank"
        class="hover:underline"
      >
        https://github.com/bilibili-ayang/bilibili-live-helper
      </n-a>
      ，本软件开发的初衷仅是为了学习新技术与研究。
    </n-p>
    <n-p>
      您在使用本软件的过程中遇到的任何问题，都可以在仓库提
      <n-text type="success">
        issues
      </n-text>
      或者通过以下的联系方式联系到我们，我们会尽快解决，当然如果您有任何好玩的功能或者想法，也可以联系到我们，我们会尽可能帮助实现的！
    </n-p>
    <n-blockquote>
      <n-ul class="indent-0 list-disc">
        <n-li
          v-for="(item, index) in contactDetails"
          :key="index"
        >
          {{ item.label }}：
          <n-a
            :href="item.href"
            target="_blank"
            class="hover:underline"
          >
            {{ item.value }}
          </n-a>
          {{ item.subValue }}
        </n-li>
      </n-ul>
    </n-blockquote>
    <n-p class="indent-0">
      by：
      <n-a
        href="https://space.bilibili.com/478490349"
        target="_blank"
        class="hover:underline"
      >
        阿阳热爱前端
      </n-a>
    </n-p>
  </div>
</template>