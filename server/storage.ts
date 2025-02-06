import { type Memory, type Plugin, type InsertMemory, type InsertPlugin } from "@shared/schema";

export interface IStorage {
  getMemories(): Promise<Memory[]>;
  createMemory(memory: InsertMemory): Promise<Memory>;
  getPlugins(): Promise<Plugin[]>;
  createPlugin(plugin: InsertPlugin): Promise<Plugin>;
}

export class MemStorage implements IStorage {
  private memories: Map<number, Memory>;
  private plugins: Map<number, Plugin>;
  private memoryId: number;
  private pluginId: number;

  constructor() {
    this.memories = new Map();
    this.plugins = new Map();
    this.memoryId = 1;
    this.pluginId = 1;
  }

  async getMemories(): Promise<Memory[]> {
    return Array.from(this.memories.values());
  }

  async createMemory(insertMemory: InsertMemory): Promise<Memory> {
    const id = this.memoryId++;
    const memory: Memory = { ...insertMemory, id };
    this.memories.set(id, memory);
    return memory;
  }

  async getPlugins(): Promise<Plugin[]> {
    return Array.from(this.plugins.values());
  }

  async createPlugin(insertPlugin: InsertPlugin): Promise<Plugin> {
    const id = this.pluginId++;
    const plugin: Plugin = { ...insertPlugin, id };
    this.plugins.set(id, plugin);
    return plugin;
  }
}

export const storage = new MemStorage();
