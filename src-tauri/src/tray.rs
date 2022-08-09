use tauri::{SystemTray, CustomMenuItem, SystemTrayMenu, SystemTrayMenuItem, SystemTraySubmenu,SystemTrayEvent,AppHandle, Manager};
// use  tauri::api::dialog::message;

// 加载菜单
pub fn main_menu()-> SystemTray {
    let tray_menu = SystemTrayMenu::new()
    .add_submenu(SystemTraySubmenu::new( // 子菜单
        "File", // 子菜单名称
        SystemTrayMenu::new()
            .add_item(CustomMenuItem::new("new_file".to_string(), "New File").disabled()) // 子菜单项（新增）
            .add_item(CustomMenuItem::new("edit_file".to_string(), "Edit File")), // 子菜单项（编辑）
    ))
    .add_native_item(SystemTrayMenuItem::Separator) // 分割线
    .add_item(CustomMenuItem::new("toggle".to_string(), "Hide")) // 显示/隐藏应用窗口
    .add_native_item(SystemTrayMenuItem::Separator) // 分割线
    .add_item(CustomMenuItem::new("switch".to_string(), "Swith")) // 切换
    .add_native_item(SystemTrayMenuItem::Separator) // 分割线
    .add_item(CustomMenuItem::new("quit".to_string(), "Quit")); // 退出

    SystemTray::new().with_menu(tray_menu)
}

// 菜单事件
pub fn handler(app: &AppHandle, event: SystemTrayEvent) {

// 托盘菜单
let loading_menu = SystemTrayMenu::new()
.add_item(CustomMenuItem::new("quit".to_string(), "Quit")); // 退出


    // 获取应用窗口
    let windows = app.windows();
    // 判断主窗口是否存在
    let main_flag = windows.contains_key("main");
    let login_flag = windows.contains_key("splash-screen");

    // 匹配点击事件
    match event {
        // 左键点击
        SystemTrayEvent::LeftClick {
            position: _,
            size: _,
            ..
        } => {
            println!("keys: {:?}", windows.keys());

            if main_flag {
                let window = app.get_window("main").unwrap();
                window.show().unwrap();
                window.set_focus().unwrap();
            }else if login_flag {
                let window = app.get_window("splash-screen").unwrap();
                window.show().unwrap();
                window.set_focus().unwrap();
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
        SystemTrayEvent::MenuItemClick { id, .. } => {
            let item_handle = app.tray_handle().get_item(&id);
            match id.as_str() {
                
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
                "switch" => {
                    println!("switch");
                    if main_flag{
                        app.tray_handle().set_menu( loading_menu.clone()).unwrap();
                    }
                }
                "toggle" => {
                    if main_flag{
                        let window = app.get_window("main").unwrap();
                        let new_title = if window.is_visible().unwrap() {
                            window.hide().unwrap();
                            "Show"
                        } else {
                            window.show().unwrap();
                            "Hide"
                        };
                        item_handle.set_title(new_title).unwrap();
                    }
                }
                _ => {}
            }
        }
        _ => {}
    }
}