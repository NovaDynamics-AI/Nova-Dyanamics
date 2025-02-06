export interface Plugin {
  id: string;
  name: string;
  description: string;
  version: string;
  process(input: string): Promise<string>;
}

export class PluginManager {
  private plugins: Map<string, Plugin>;

  constructor() {
    this.plugins = new Map();
  }

  register(plugin: Plugin) {
    this.plugins.set(plugin.id, plugin);
  }

  async process(pluginId: string, input: string): Promise<string> {
    const plugin = this.plugins.get(pluginId);
    if (!plugin) {
      throw new Error(`Plugin not found: ${pluginId}`);
    }
    return plugin.process(input);
  }

  getPlugins(): Plugin[] {
    return Array.from(this.plugins.values());
  }
}
