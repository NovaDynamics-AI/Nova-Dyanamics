use async_trait::async_trait;
use serde::{Deserialize, Serialize};

use crate::provider::Provider;

pub struct OpenAIProvider {
    api_key: String,
    model: String,
}

#[async_trait]
impl Provider for OpenAIProvider {
    async fn generate_completion(&self, prompt: &str) -> Result<String, Error> {
        // Implementation would go here
        Ok(String::new())
    }

    async fn generate_embedding(&self, text: &str) -> Result<Vec<f32>, Error> {
        // Implementation would go here
        Ok(vec![])
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CompletionRequest {
    pub prompt: String,
    pub max_tokens: u32,
    pub temperature: f32,
}

#[derive(Debug)]
pub enum Error {
    Api(String),
    Rate(String),
    Invalid(String),
}
