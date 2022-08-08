#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::{Window};
use tauri_plugin_store::PluginBuilder;

mod tray;

fn main() {
  let content = tauri::generate_context!();
  
  let mut app =tauri::Builder::default()
  .system_tray(tray::main_menu())  // ✅ 将 `tauri.conf.json` 上配置的图标添加到系统托盘
  .on_system_tray_event(tray::handler) // ✅ 注册系统托盘事件处理程序
  .invoke_handler(tauri::generate_handler![open_devtools])
  .plugin(PluginBuilder::default().build()) // ✅ 启用tauri插件
  .build(content)
  .expect("error while building tauri application");

  #[cfg(target_os = "macos")] //✅ `macOS`下不显示docker图标
  app.set_activation_policy(tauri::ActivationPolicy::Accessory);

  app.run(|_app_handle, _event| {});
}

// 打开窗口的调试工具
#[tauri::command]
fn open_devtools(window: Window) {
  #[cfg(debug_assertions)] // only include this code on debug builds
  {
    window.open_devtools();
  }
}