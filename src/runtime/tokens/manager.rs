use std::collections::HashMap;
use std::sync::Arc;
use tokio::sync::RwLock;
use time::{Duration, OffsetDateTime};

pub struct TokenBucket {
    capacity: usize,
    tokens: usize,
    refill_rate: f64,
    last_refill: OffsetDateTime,
}

pub struct TokenManager {
    buckets: Arc<RwLock<HashMap<String, TokenBucket>>>,
    usage_stats: Arc<RwLock<HashMap<String, UsageStatistics>>>,
}

#[derive(Debug, Clone)]
pub struct UsageStatistics {
    pub total_tokens: usize,
    pub requests_processed: usize,
    pub average_tokens_per_request: f64,
    pub last_request: OffsetDateTime,
}

impl TokenManager {
    pub fn new() -> Self {
        Self {
            buckets: Arc::new(RwLock::new(HashMap::new())),
            usage_stats: Arc::new(RwLock::new(HashMap::new())),
        }
    }

    pub async fn consume_tokens(&self, user_id: &str, amount: usize) -> Result<(), TokenError> {
        let mut buckets = self.buckets.write().await;
        let bucket = buckets.get_mut(user_id).ok_or(TokenError::NoQuota)?;

        if bucket.tokens < amount {
            return Err(TokenError::InsufficientTokens);
        }

        bucket.tokens -= amount;
        Ok(())
    }
}

#[derive(Debug)]
pub enum TokenError {
    NoQuota,
    InsufficientTokens,
    RateLimitExceeded,
}
