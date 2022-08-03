import dayjs from "dayjs";

const getTimeArr = (now = new Date()) => {
  const h = now.getHours();
  const m = now.getMinutes();
  const s = now.getSeconds();
  return [
    ...toArr(h),
    ...toArr(m),
    ...toArr(s)
  ];
};

// 更换数组类型
const toArr = (n: number) => {
  return n >= 10 ? ("" + n).split("").map(item => Number(item)) : [0, n];
};

// TODO 加载个性化配置文件
const weekArr_zh = ["日", "一", "二", "三", "四", "五", "六", "日"];
// const weekArr_en = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const curDate = dayjs().format("YYYY-MM-DD");
const curDay = `星期${weekArr_zh[dayjs().day()]} `;
// const curDay = getStore(CLOCK_SETTINGS.lang) === "zh_CN" ? `星期${weekArr_zh[dayjs().day()]} ` : weekArr_en[dayjs().day()];

const timeArr = ref(getTimeArr());

let timer: ReturnType<typeof setTimeout>;

const startTimer = () => {
  stopTimer();
  timer = setTimeout(() => {
    timeArr.value = getTimeArr();
    startTimer();
  }, 1000);
};

const stopTimer = () => {
  clearTimeout(timer);
};

export {
  timeArr,
  curDate,
  curDay,
  startTimer,
  stopTimer
};