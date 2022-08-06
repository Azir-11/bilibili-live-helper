use tauri::{SystemTray, CustomMenuItem, SystemTrayMenu, SystemTrayMenuItem, SystemTraySubmenu,SystemTrayEvent,AppHandle};
use tauri::Manager;
use  tauri::api::dialog::message;

// 托盘菜单
pub fn menu() -> SystemTray {
    let tray_menu = SystemTrayMenu::new()
        .add_submenu(SystemTraySubmenu::new( // 子菜单
            "File", // 子菜单名称
            SystemTrayMenu::new()
                .add_item(CustomMenuItem::new("new_file".to_string(), "New File")) // 子菜单项（新增）
                .add_item(CustomMenuItem::new("edit_file".to_string(), "Edit File")), // 子菜单项（编辑）
        ))
        .add_native_item(SystemTrayMenuItem::Separator) // 分割线
        .add_item(CustomMenuItem::new("hide".to_string(), "Hide")) // 隐藏应用窗口
        .add_item(CustomMenuItem::new("show".to_string(), "Show")) // 显示应用窗口
        .add_item(CustomMenuItem::new("skip".to_string(), "Skip")) // 显示应用窗口
        .add_native_item(SystemTrayMenuItem::Separator) // 分割线
        .add_item(CustomMenuItem::new("quit".to_string(), "Quit")); // 退出

    // 设置在右键单击系统托盘时显示菜单
    SystemTray::new().with_menu(tray_menu)
}

// 菜单事件
pub fn handler(_app: &AppHandle, event: SystemTrayEvent) {
    // 获取应用窗口
    let windows = _app.windows();
    // 判断 main 窗口是否存在
    let flag = windows.contains_key("main");

    // 匹配点击事件
    match event {
        // 左键点击
        SystemTrayEvent::LeftClick {
            position: _,
            size: _,
            ..
        } => {
            let keys = windows.keys();
            println!("keys: {:?}", keys);
            if flag{
                _app.get_window("main").unwrap().show().unwrap();
            }
        }
        // 右键点击
        SystemTrayEvent::RightClick {
            position: _,
            size: _,
            ..
        } => {
            println!("system tray received a right click");
        }
        // 双击，macOS / Linux 不支持
        SystemTrayEvent::DoubleClick {
            position: _,
            size: _,
            ..
        } => {
            println!("system tray received a double click");
        }
        // 根据菜单 id 进行事件匹配
        SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
            "edit_file" => {
                // message(_parent_window, "Eidt File", "TODO");
                println!("Eidt File");
            }
            "new_file" => {
                // message(parent_window, "New File", "TODO");
                println!("New File");
            }
            "quit" => {
                std::process::exit(0);
            }
            "show" => {
                // window.show().unwrap();
                println!("Show");
            }
            "hide" => {
                // window.hide().unwrap();
                println!("Hide");
            }
            "skip" => {
                // window.set_skip_taskbar(false).unwrap();
                println!("Skip");
            }
            _ => {}
        },
        _ => {}
    }
}