-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create memories table
CREATE TABLE memories (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    embedding vector(1536) NOT NULL,
    metadata JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create plugins table
CREATE TABLE plugins (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    version TEXT NOT NULL,
    enabled INTEGER NOT NULL DEFAULT 1,
    config JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create model_metrics table
CREATE TABLE model_metrics (
    id SERIAL PRIMARY KEY,
    model_name TEXT NOT NULL,
    accuracy FLOAT NOT NULL,
    latency FLOAT NOT NULL,
    token_count INTEGER NOT NULL,
    memory_usage FLOAT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes
CREATE INDEX idx_memories_embedding ON memories USING ivfflat (embedding vector_cosine_ops);
CREATE INDEX idx_plugins_name ON plugins(name);
CREATE INDEX idx_model_metrics_model_name ON model_metrics(model_name);
