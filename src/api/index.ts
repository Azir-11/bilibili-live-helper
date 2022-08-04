import { fetch } from "@tauri-apps/api/http";
import { createDiscreteApi } from "naive-ui";
import type { FetchOptions } from "@tauri-apps/api/http";

// 请求总入口
const getQueryData = async (url: string, options: Partial<FetchOptions>) => {
  try {
    const { data: response }: Record<string, any> = await fetch(url, {
      ...options,
      method: options.method || "GET",
      timeout: 60000
    });

    if (response?.code === 0 || response?.code === 200) {
      return response?.data ?? response;
    } else {
      throw response?.message || "请求出错，再试试吧~";
    }
  } catch (error: any) {
    const { message } = createDiscreteApi(["message"]);

    let errorMessage = error;

    if (error.includes("timed out")) {
      errorMessage = "服务器请求超时";
    } else if (error.includes("50")) {
      errorMessage = "服务器连接失败";
    }

    message.error(errorMessage);
  }
};

export { getQueryData };

export * from "./bilibili";
export * from "./live";
export * from "./music";