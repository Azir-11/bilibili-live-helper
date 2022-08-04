import { getQueryData } from ".";

// 网易云公共的请求前缀
const baseUrl = "https://music-node.vercel.app";

// 查找歌单列表
const searchPlaylistApi = async (id: string) =>
  await getQueryData(`${baseUrl}/playlist/detail`, {
    query: {
      id: id || "3778678"
    }
  });

// 搜索音乐信息
const searchMusicInfoApi = async (keywords: string) =>
  await getQueryData(`${baseUrl}/cloudsearch`, {
    query: {
      keywords
    }
  });

// 搜索歌词
const searchLyricApi = async (id: number) =>
  await getQueryData(`${baseUrl}/lyric`, {
    query: {
      id
    }
  });

export { searchPlaylistApi, searchMusicInfoApi, searchLyricApi };