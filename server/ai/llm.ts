import { z } from "zod";

export const LLMProviderSchema = z.enum(["gpt4", "claude", "custom"]);
export type LLMProvider = z.infer<typeof LLMProviderSchema>;

export interface LLMConfig {
  provider: LLMProvider;
  apiKey: string;
  modelName?: string;
}

export interface LLMResponse {
  text: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export class LLMClient {
  constructor(private config: LLMConfig) {}

  async complete(prompt: string): Promise<LLMResponse> {
    switch (this.config.provider) {
      case "gpt4":
        return this.completeWithGPT4(prompt);
      case "claude":
        return this.completeWithClaude(prompt);
      default:
        throw new Error(`Unsupported provider: ${this.config.provider}`);
    }
  }

  private async completeWithGPT4(prompt: string): Promise<LLMResponse> {
    // Implementation for GPT-4
    throw new Error("Not implemented");
  }

  private async completeWithClaude(prompt: string): Promise<LLMResponse> {
    // Implementation for Claude
    throw new Error("Not implemented");
  }
}
