import { createDiscreteApi } from "naive-ui";

const { message, dialog, loadingBar, notification } = createDiscreteApi([
  "message",
  "dialog",
  "loadingBar",
  "notification"
]);

export {
  message as NaiveMessage,
  dialog as NaiveDialog,
  loadingBar as NaiveLoadingBar,
  notification as NaiveNotification
};