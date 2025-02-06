use async_trait::async_trait;
use sqlx::PgPool;
use uuid::Uuid;

use super::{Memory, MemoryStore};

pub struct PostgresMemoryStore {
    pool: PgPool,
}

#[async_trait]
impl MemoryStore for PostgresMemoryStore {
    async fn store(&self, text: &str, metadata: serde_json::Value) -> Result<Memory, Error> {
        // Implementation would go here
        Ok(Memory {
            id: Uuid::new_v4(),
            text: text.to_string(),
            metadata,
            created_at: chrono::Utc::now(),
        })
    }

    async fn search(&self, query: &str, limit: i32) -> Result<Vec<Memory>, Error> {
        // Implementation would go here
        Ok(vec![])
    }
}

#[derive(Debug)]
pub enum Error {
    Database(sqlx::Error),
    Serialization(serde_json::Error),
}
