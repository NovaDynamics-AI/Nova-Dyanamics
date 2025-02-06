declare namespace NovaAI {
  interface ModelConfig {
    provider: 'gpt4' | 'claude' | 'custom';
    modelName: string;
    temperature: number;
    maxTokens: number;
    topP: number;
  }

  interface MemoryConfig {
    maxSize: number;
    ttl: number;
    storageType: 'postgres' | 'redis' | 'memory';
  }

  interface Plugin {
    id: string;
    name: string;
    version: string;
    process(input: string): Promise<string>;
    initialize?(): Promise<void>;
    cleanup?(): Promise<void>;
  }

  type EmbeddingVector = number[];
  
  interface Memory {
    id: string;
    text: string;
    embedding: EmbeddingVector;
    metadata: Record<string, any>;
    createdAt: Date;
  }
}

export = NovaAI;
export as namespace NovaAI;
