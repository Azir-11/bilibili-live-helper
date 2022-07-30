#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

fn main() {
  use tauri::Manager;
  tauri::Builder::default()
  .setup(|_app| {
    #[cfg(debug_assertions)] // only include this code on debug builds
    {
      let window = _app.get_window("main").unwrap();
      window.open_devtools();
      window.close_devtools();
    }
    Ok(())
  })
  .run(tauri::generate_context!())
  .expect("error while running tauri application");
}