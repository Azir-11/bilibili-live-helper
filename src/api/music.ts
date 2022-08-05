import { getQueryData } from ".";
import { MUSIC_URL_PREFIX } from "@/constants";

// 查找歌单列表
const searchPlaylistApi = async (id: string) =>
  await getQueryData(`${MUSIC_URL_PREFIX}/playlist/detail`, {
    query: {
      id: id || "3778678"
    }
  });

// 搜索音乐信息
const searchMusicInfoApi = async (keywords: string) =>
  await getQueryData(`${MUSIC_URL_PREFIX}/cloudsearch`, {
    query: {
      keywords
    }
  });

// 搜索歌词
const searchLyricApi = async (id: number) =>
  await getQueryData(`${MUSIC_URL_PREFIX}/lyric`, {
    query: {
      id
    }
  });

export { searchPlaylistApi, searchMusicInfoApi, searchLyricApi };