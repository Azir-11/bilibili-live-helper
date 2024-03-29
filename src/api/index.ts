import { fetch } from "@tauri-apps/api/http";
import type { FetchOptions } from "@tauri-apps/api/http";
import { NaiveMessage, NaiveLoadingBar } from "@/utils/navie";
import type { Rewrite } from "@/types";

// 请求总入口
const getQueryData = async (
  url: string,
  options: Rewrite<
    Partial<FetchOptions>,
    {
      returnError?: boolean;
      hideLoadingBar?: boolean;
    }
  >
) => {
  const { method, returnError, headers, hideLoadingBar } = options;

  try {
    !hideLoadingBar && NaiveLoadingBar.start();

    const { data: response }: Record<string, any> = await fetch(url, {
      ...options,
      method: method || "GET",
      timeout: 1000 * 60,
      headers: {
        ...headers,
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36"
      }
    });

    if (returnError || response?.code === 0 || response?.code === 200) {
      !hideLoadingBar && NaiveLoadingBar.finish();

      return response?.data ?? response;
    } else {
      throw response?.message || response?.msg || "请求出错，再试试吧~";
    }
  } catch (error: any) {
    !hideLoadingBar && NaiveLoadingBar.error();

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