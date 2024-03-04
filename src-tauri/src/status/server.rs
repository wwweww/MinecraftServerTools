use std::process::Child;
use std::sync::{Arc, Mutex};
use std::sync::atomic::AtomicBool;

pub struct Threading{
    cmd: Child,
    running: Arc<AtomicBool>
}

pub struct Server {
    threading: Threading,
    server_name: String
}

#[derive(Clone)]
pub struct ServerManager {
    servers: Arc<Mutex<Vec<Server>>>
}

impl ServerManager {
    pub fn new() -> Self {
        ServerManager {
            servers: Arc::new(Mutex::new(Vec::new()))
        }
    }

    pub fn add_server(&self, server: Server) {
        self.servers.lock().unwrap().push(server);
    }
}