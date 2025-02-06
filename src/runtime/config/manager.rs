use std::sync::Arc;
use tokio::sync::RwLock;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct RuntimeConfig {
    pub model_settings: ModelSettings,
    pub performance_settings: PerformanceSettings,
    pub security_settings: SecuritySettings,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ModelSettings {
    pub default_model: String,
    pub temperature: f32,
    pub max_tokens: usize,
    pub top_p: f32,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct PerformanceSettings {
    pub max_concurrent_requests: usize,
    pub timeout_ms: u64,
    pub cache_size_mb: usize,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SecuritySettings {
    pub enable_rate_limiting: bool,
    pub max_requests_per_minute: usize,
    pub require_authentication: bool,
}

pub struct ConfigManager {
    config: Arc<RwLock<RuntimeConfig>>,
}

impl ConfigManager {
    pub fn new(initial_config: RuntimeConfig) -> Self {
        Self {
            config: Arc::new(RwLock::new(initial_config)),
        }
    }

    pub async fn update_config(&self, new_config: RuntimeConfig) {
        let mut config = self.config.write().await;
        *config = new_config;
    }
}
