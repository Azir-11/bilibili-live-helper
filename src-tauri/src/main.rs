#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::{WindowEvent, RunEvent, Manager, Window};
use tauri_plugin_store::PluginBuilder;

mod tray;

fn main() {
  let content = tauri::generate_context!();
  
  let mut app =tauri::Builder::default()
  .on_page_load(|_window, _| {
    #[cfg(debug_assertions)] // 开发模式在页面加载时打开调试工具
    _window.open_devtools();
  })
  .system_tray(tray::main_menu())  // ✅ 将 `tauri.conf.json` 上配置的图标添加到系统托盘
  .on_system_tray_event(tray::handler) // ✅ 注册系统托盘事件处理程序
  .invoke_handler(tauri::generate_handler![close_window]) // ✅ 注册自定义事件处理程序
  .plugin(PluginBuilder::default().build()) // ✅ 启用tauri插件
  .build(content)
  .expect("error while building tauri application");

  #[cfg(target_os = "macos")] //✅ `macOS`下不显示docker图标
  app.set_activation_policy(tauri::ActivationPolicy::Accessory);

  app.run(|app_handle, e| match e {
    // App加载完成后，注册全局快捷键
    // RunEvent::Ready => {
    //   let app_handle = app_handle.clone();
    //   app_handle
    //     .global_shortcut_manager()
    //     .register("CmdOrCtrl+1", move || {
    //       // 执行的操作
    //       println!("CmdOrCtrl+1 pressed");
    //     })
    //     .unwrap();
    // }

    // 窗口关闭前的操作
    RunEvent::WindowEvent {
      label,
      event: WindowEvent::CloseRequested { api, .. },
      ..
    } => {
      let app_handle = app_handle.clone();
      let window = app_handle.get_window(&label).unwrap();

      if label == "main" {
        api.prevent_close();
        // 阻止主窗口关闭
        window.hide().unwrap();
      }
    }

    // 开启一个循环监听托盘事件，此时所有窗口kou都已经关闭
    // RunEvent::ExitRequested { api, .. } => {
    //   api.prevent_exit();
    // }
    _ => {}
  })
}

#[tauri::command]
fn close_window(label:String,window: Window) {

  let flag = window.windows().contains_key(&label);
  if flag{
    let window = window.get_window(&label).unwrap();
    window.close().unwrap();

    #[cfg(debug_assertions)] 
    window.close_devtools();
  }

}