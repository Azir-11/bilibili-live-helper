export const useAnchorInfoStore = defineStore("anchorInfo", {
  state: () => ({
    anchorInfo: {} as Record<string, any>
  })
});