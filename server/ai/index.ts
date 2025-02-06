import { LLMClient, LLMConfig } from "./llm";
import { PluginManager } from "./plugin";
import { MemoryManager } from "./memory";

export interface NovaConfig {
  llm: LLMConfig;
}

export class Nova {
  private llm: LLMClient;
  private plugins: PluginManager;
  private memory: MemoryManager;

  constructor(config: NovaConfig) {
    this.llm = new LLMClient(config.llm);
    this.plugins = new PluginManager();
    this.memory = new MemoryManager();
  }

  async process(input: string): Promise<string> {
    // Store input in memory
    await this.memory.store(input);

    // Get relevant context
    const context = await this.memory.search(input);

    // Process with LLM
    const response = await this.llm.complete(input);

    return response.text;
  }
}

export { LLMClient, PluginManager, MemoryManager };
