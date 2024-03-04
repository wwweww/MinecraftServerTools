// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;
use window_shadows::set_shadow;

mod services;
mod status;
mod config;

#[tauri::command]
fn greet(name: String) -> String {
    println!("Hello world");
    format!("Hello {}", name)
}

#[tauri::command]
fn close() {
    std::process::exit(0);
}

fn main() {
    tauri::Builder::default()
        .setup(move |app|{
            #[cfg(debug_assertions)]
            {
                let window = app.get_window("main").unwrap();
                window.open_devtools();
                window.close_devtools();
            }
            #[cfg(any(windows, target_os = "windows"))]
            {
                let window = app.get_window("main").unwrap();
                set_shadow(&window, true).unwrap();
            }
            Ok(())
        })
        .plugin(services::server::init())
        .plugin(services::file::init())
        .invoke_handler(tauri::generate_handler![greet, close])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
