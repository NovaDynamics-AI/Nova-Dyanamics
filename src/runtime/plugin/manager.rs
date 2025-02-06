use std::collections::HashMap;
use tokio::sync::RwLock;

use super::{Plugin, PluginMetadata};

pub struct PluginManager {
    plugins: RwLock<HashMap<String, Box<dyn Plugin>>>,
    metadata: RwLock<HashMap<String, PluginMetadata>>,
}

impl PluginManager {
    pub fn new() -> Self {
        Self {
            plugins: RwLock::new(HashMap::new()),
            metadata: RwLock::new(HashMap::new()),
        }
    }

    pub async fn register<P: Plugin + 'static>(&self, plugin: P) -> Result<(), Error> {
        let metadata = plugin.metadata();
        let id = metadata.id.clone();

        let mut plugins = self.plugins.write().await;
        let mut metadata_store = self.metadata.write().await;

        plugins.insert(id.clone(), Box::new(plugin));
        metadata_store.insert(id, metadata);

        Ok(())
    }

    pub async fn process(&self, plugin_id: &str, input: &str) -> Result<String, Error> {
        let plugins = self.plugins.read().await;
        
        let plugin = plugins.get(plugin_id)
            .ok_or_else(|| Error::NotFound(plugin_id.to_string()))?;

        plugin.process(input).await
    }
}

#[derive(Debug)]
pub enum Error {
    NotFound(String),
    Process(String),
}
