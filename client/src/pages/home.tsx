import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Network, Database, Box, Cpu, Code } from "lucide-react";

export default function Home() {
  const features = [
    {
      title: "Advanced AI Processing",
      description: "State-of-the-art language models with custom processing pipelines",
      icon: <Brain className="w-8 h-8 text-primary" />,
    },
    {
      title: "Multi-Provider Support",
      description: "Seamless integration with GPT-4, Claude and custom LLM providers",
      icon: <Network className="w-8 h-8 text-primary" />,
    },
    {
      title: "Vector Storage",
      description: "High-performance semantic search and storage with pgvector",
      icon: <Database className="w-8 h-8 text-primary" />,
    },
    {
      title: "Plugin System",
      description: "Extensible architecture for custom behaviors and integrations",
      icon: <Box className="w-8 h-8 text-primary" />,
    },
    {
      title: "Cross-Platform",
      description: "Run on any platform with our TypeScript, Rust and Go components",
      icon: <Cpu className="w-8 h-8 text-primary" />,
    },
    {
      title: "Developer Friendly",
      description: "Comprehensive API and tooling for seamless integration",
      icon: <Code className="w-8 h-8 text-primary" />,
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/80 text-transparent bg-clip-text">
            Nova Dynamics
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            The Next Generation AI Engine for Enterprise Applications
          </p>
          <div className="flex gap-2 justify-center mb-8">
            <Badge variant="secondary">TypeScript</Badge>
            <Badge variant="secondary">Rust</Badge>
            <Badge variant="secondary">Go</Badge>
            <Badge variant="secondary">Vector DB</Badge>
            <Badge variant="secondary">Multi-Modal</Badge>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <Card key={i} className="border-primary/10 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}