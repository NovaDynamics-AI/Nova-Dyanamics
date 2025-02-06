import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { Nova } from "./ai";
import { insertMemorySchema, insertPluginSchema } from "@shared/schema";

export function registerRoutes(app: Express) {
  const nova = new Nova({
    llm: {
      provider: "gpt4",
      apiKey: process.env.OPENAI_API_KEY || "",
    },
  });

  app.post("/api/process", async (req, res) => {
    try {
      const { input } = req.body;
      const result = await nova.process(input);
      res.json({ result });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  });

  app.get("/api/plugins", async (req, res) => {
    try {
      const plugins = await storage.getPlugins();
      res.json(plugins);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  });

  app.post("/api/plugins", async (req, res) => {
    try {
      const plugin = insertPluginSchema.parse(req.body);
      const result = await storage.createPlugin(plugin);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
