import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Docs() {
  const sections = [
    {
      id: "getting-started",
      title: "Getting Started",
      content: `
# Quick Start Guide

\`\`\`bash
git clone https://github.com/nova-dynamics/nova-engine
cd nova-engine
npm install
\`\`\`

## Configuration

Create a .env file with your API keys:

\`\`\`
OPENAI_API_KEY=your_key_here
ANTHROPIC_API_KEY=your_key_here
\`\`\`

## Basic Usage

\`\`\`typescript
import { NovaEngine, LLMProvider } from '@nova/core';

const engine = new NovaEngine({
  provider: LLMProvider.GPT4,
  apiKey: process.env.OPENAI_API_KEY
});

const response = await engine.process("Your input here");
\`\`\`
      `
    },
    {
      id: "architecture",
      title: "Architecture",
      content: `
# Nova Architecture

## Core Components

1. **Agent System**
   - Conversation Management
   - Context Handling
   - Memory Integration

2. **Plugin Framework**
   - Custom Behaviors
   - Event System
   - State Management

3. **Provider Interface**
   - Multiple LLM Support
   - Custom Provider Integration
   - Fallback Handling

## Storage Layer

Nova uses pgvector for efficient semantic search:

\`\`\`typescript
import { VectorStore } from '@nova/storage';

const store = new VectorStore();
await store.insert({ text: "Example", embedding: [...] });
\`\`\`
      `
    },
    {
      id: "plugins",
      title: "Plugin System",
      content: `
# Plugin Development

Create custom plugins to extend Nova's capabilities:

\`\`\`typescript
import { Plugin } from '@nova/core';

export class CustomPlugin implements Plugin {
  async process(input: string): Promise<string> {
    // Plugin implementation
    return output;
  }
}
\`\`\`

## Plugin Lifecycle

1. Registration
2. Initialization
3. Processing
4. Cleanup

## Best Practices

- Keep plugins focused and modular
- Implement proper error handling
- Use typed interfaces
- Document extensively
      `
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2">Nova Documentation</h1>
      <p className="text-muted-foreground mb-8">
        Everything you need to build with Nova Dynamics
      </p>

      <Tabs defaultValue="getting-started" className="space-y-4">
        <TabsList>
          {sections.map(section => (
            <TabsTrigger key={section.id} value={section.id}>
              {section.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {sections.map(section => (
          <TabsContent key={section.id} value={section.id}>
            <ScrollArea className="h-[600px] w-full rounded-md border p-6">
              <div className="prose dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: section.content }} />
              </div>
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}