use std::cell::RefCell;
use std::rc::Rc;
use std::sync::{Arc, Mutex};
use tauri::api::dialog::FileDialogBuilder;
use tauri::plugin::{Builder, TauriPlugin};
use tauri::{Runtime, Window};

#[tauri::command]
fn get_drives() -> tauri::Result<Vec<String>> {
    let mut drives = Vec::new();
    for drive_letter in "CDEFGHIJKLMNOPQRSTUVWXYZ".chars() {
        let drive = format!("{}:\\", drive_letter);
        if std::path::Path::new(&drive).exists() {
            drives.push(drive);
        }
    }
    Ok(drives)
}

#[tauri::command]
fn get_files(path: String) -> tauri::Result<Vec<String>> {
    let mut files_and_folders = Vec::new();
    for entry in std::fs::read_dir(path)? {
        let entry = entry?;
        let path = entry.path();
        if path.is_dir() || path.extension() == Some(std::ffi::OsStr::new("jar")) {
            files_and_folders.push(path.display().to_string());
        }
    }
    Ok(files_and_folders)
}

#[tauri::command]
fn open_file_dialog<R: Runtime>(window: Window<R>, extensions: Vec<String>, title: String) {
    let extensions: Vec<&str> = extensions.iter().map(AsRef::as_ref).collect();
    FileDialogBuilder::new()
        .set_title(title.as_str())
        .add_filter("Server core file", &*extensions)
        .pick_file(move |file_path| {
            if let Some(file_path) = file_path {
                if let Some(file_path) = file_path.as_path().to_str() {
                    window.emit("select-jar-file", file_path.to_string()).unwrap()
                }
            }
        })
}

pub fn init<R: Runtime>() -> TauriPlugin<R> {
    Builder::new("file")
        .invoke_handler(tauri::generate_handler![get_drives, get_files, open_file_dialog])
        .build()
}