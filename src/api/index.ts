import { fetch } from "@tauri-apps/api/http";
import type { FetchOptions } from "@tauri-apps/api/http";
import { NaiveMessage } from "@/utils/navie";
import type { Rewrite } from "@/types";

// 请求总入口
const getQueryData = async (
  url: string,
  options: Rewrite<
    Partial<FetchOptions>,
    {
      returnError?: boolean;
    }
  >
) => {
  try {
    const { method, returnError } = options;

    const { data: response }: Record<string, any> = await fetch(url, {
      ...options,
      method: method || "GET",
      timeout: 1000 * 60
    });

    if (returnError || response?.code === 0 || response?.code === 200) {
      return response?.data ?? response;
    } else {
      throw response?.message || response?.msg || "请求出错，再试试吧~";
    }
  } catch (error: any) {
    let errorMessage = error;

    if (error.includes("timed out")) {
      errorMessage = "服务器请求超时";
    } else if (error.includes("50")) {
      errorMessage = "服务器连接失败";
    }

    NaiveMessage.error(errorMessage);
  }
};

export { getQueryData };

export * from "./bilibili";
export * from "./live";
export * from "./music";