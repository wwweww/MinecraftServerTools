use std::io::{BufRead, BufReader};
use std::{process, thread};
use std::process::Stdio;
use tauri::{Runtime, plugin::{Builder, TauriPlugin}, command, Window};

#[command]
fn test(name: String) -> String {
    format!("Hello {}", name)
}

#[command]
fn run_server<R: Runtime>(window: Window<R>, server_name: String) -> String {
    let mut cmd = process::Command::new("java")
        .stdout(Stdio::piped())
        .stdin(Stdio::piped())
        .spawn()
        .unwrap();

    let stdout = cmd.stdout.take().unwrap();
    thread::spawn(move || {
        let reader = BufReader::new(stdout);
        let event_name = format!("server-{}-log", server_name);
        for line in reader.lines() {
            if let Ok(line) = line {
                window.emit(event_name.as_str(), line).unwrap()
            }
        }
    });

    "Hello World".to_string()
}

pub fn init<R: Runtime>() -> TauriPlugin<R> {
    Builder::new("server")
        .invoke_handler(tauri::generate_handler![test, run_server])
        .build()
}