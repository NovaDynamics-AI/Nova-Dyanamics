use super::*;
use tokio::test;

mod config;
mod memory;
mod plugin;
mod tokens;

#[test]
async fn test_runtime_initialization() {
    let config = RuntimeConfig::default();
    let runtime = Runtime::new(config);
    assert!(runtime.start().await.is_ok());
}

#[test]
async fn test_plugin_loading() {
    let runtime = setup_test_runtime().await;
    let result = runtime.load_plugin("test-plugin").await;
    assert!(result.is_ok());
}
