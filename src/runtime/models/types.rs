use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct ModelConfig {
    pub name: String,
    pub version: String,
    pub parameters: usize,
    pub context_window: usize,
    pub capabilities: Vec<Capability>,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum Capability {
    TextGeneration,
    CodeCompletion,
    Embedding,
    ImageGeneration,
    AudioProcessing,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ModelMetrics {
    pub tokens_processed: usize,
    pub average_latency: f64,
    pub error_rate: f64,
    pub uptime: f64,
}
