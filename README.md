# Nova Dynamics - Advanced AI Agent Framework

## Table of Contents
- [Overview](#overview)
- [Core Features](#core-features)
- [Extension Points](#extension-points)
- [Quick Start](#quick-start)
- [Using Nova Dynamics as a Module](#using-nova-dynamics-as-a-module)
- [Contact](#contact)
- [License](#license)

## Overview
Nova Dynamics is a highly modular AI agent engine built with **TypeScript, Rust, and Go**, designed for **scalability, adaptability, and cross-platform intelligence**. It provides a robust foundation for AI-powered systems through:

- **Plugin-based architecture** with hot-swappable components
- **Multi-provider LLM support** (GPT-4, Claude, and custom AI models)
- **Cross-platform agent management** for seamless AI deployment
- **Extensible manager system** for custom AI behaviors
- **Vector-based semantic storage** using `pgvector` for intelligent memory handling

## Core Features

### Plugin Architecture
Nova Dynamics follows a **pluggable module system**, allowing developers to enhance core functionality effortlessly.

- **Manager System**: Extend AI capabilities via custom managers.
- **Memory Manager**: Handles AI memory and conversational context.
- **Personality Manager**: Customizes AI behavior and responses.
- **Custom Managers**: Define specialized behaviors tailored to specific needs.

### State Management
- **Shared State System**: Centralized state handling across components.
- **Manager-Specific Storage**: Maintain independent data for different modules.
- **Cross-Manager Communication**: Enables seamless data flow.

### LLM Integration
- **Provider Abstraction**: Support for multiple AI providers.
- **Pre-configured GPT-4 & Claude support**.
- **Customizable LLM integration** with an extensible provider interface.
- **Automatic fallback and retry mechanisms** for enhanced reliability.

### Platform Support
- **Platform-Agnostic Core**: Engine operates independently from any specific platform.
- **Built-in CLI and API interfaces**.
- **Extensible platform integration framework** for custom implementations.

### Storage Layer
- **Flexible Data Storage**:
  - PostgreSQL with `pgvector` for semantic search.
  - GORM-based data modeling.
  - Customizable memory storage with vector embeddings.

### Toolkit/Function System
- **Pluggable Function Execution**:
  - Support for custom AI tools.
  - Dynamic function calling capabilities.
  - Automatic tool response handling.
  - State-aware tool execution.

## Extension Points
Nova Dynamics allows for extensive customization with modular interfaces:

### LLM Providers
Define custom AI models by implementing the **LLM Provider Interface**:
```typescript
type Provider interface {
    GenerateCompletion(context.Context, CompletionRequest) (string, error)
    GenerateJSON(context.Context, JSONRequest, interface{}) error
    EmbedText(context.Context, string) ([]float32, error)
}
```

### Custom Managers
Develop AI behaviors by implementing the **Manager Interface**:
```typescript
type Manager interface {
    GetID() ManagerID
    GetDependencies() []ManagerID
    Process(state *state.State) error
    PostProcess(state *state.State) error
    Context(state *state.State) ([]state.StateData, error)
    Store(fragment *db.Fragment) error
    StartBackgroundProcesses()
    StopBackgroundProcesses()
    RegisterEventHandler(callback EventCallbackFunc)
    triggerEvent(eventData EventData)
}
```

## Quick Start
### 1. Clone the Repository
```sh
git clone https://github.com/novadynamics/nova-ai
```

### 2. Configure Environment Variables
```sh
cp .env.example .env
```
Update `.env` with necessary credentials:
```sh
DB_URL=postgresql://user:password@localhost:5432/nova
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key
```

### 3. Install Dependencies
```sh
npm install
cargo build
go mod download
```

### 4. Run the Development Environment
```sh
npm run dev
```

## Using Nova Dynamics as a Module

### 1. Install Nova Dynamics
```sh
npm install @novadynamics/nova-ai
```

### 2. Import Nova Dynamics into Your Project
```typescript
import {
  Engine,
  LLMClient,
  BaseAgent,
  MemoryManager,
  PersonalityManager
} from '@novadynamics/nova-ai';
```

### 3. Basic Usage Example
```typescript
// Initialize LLM Client
const llmClient = new LLMClient({
  provider: 'gpt4',
  apiKey: process.env.OPENAI_API_KEY,
  modelConfig: {
    default: 'gpt-4-turbo'
  }
});

// Create Engine Instance
const engine = new Engine({
  llm: llmClient,
  db: database,
  logger: logger
});

// Process Input
const state = await engine.newState({
  actorId,
  sessionId,
  input: "Your input text here"
});

const response = await engine.process(state);
```

## Available Packages
- `@novadynamics/nova-ai`: Core framework
- `@novadynamics/nova-llm`: LLM provider interfaces
- `@novadynamics/nova-runtime`: Rust runtime
- `@novadynamics/nova-network`: Go networking layer
- `@novadynamics/nova-plugins`: Plugin system

For detailed examples, check the `examples/` directory in the repository.

## Contact
- **Website**: [novadynamics.io](https://novadynamics.io)
- **Email**: [contact@novadynamics.io](mailto:contact@novadynamics.io)
- **Twitter**: [@nova_dynamics](https://twitter.com/nova_dynamics)

## License
This project is licensed under the **MIT License** - see the `LICENSE` file for details.

