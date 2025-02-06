import { useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Zap, Clock } from "lucide-react";

interface Model {
  id: string;
  name: string;
  description: string;
  parameters: string;
  latency: string;
  type: "gpt" | "claude" | "custom";
}

const models: Model[] = [
  {
    id: "gpt-4",
    name: "GPT-4 Turbo",
    description: "Latest GPT-4 model with enhanced capabilities",
    parameters: "1.5 trillion",
    latency: "~500ms",
    type: "gpt"
  },
  {
    id: "claude-3", 
    name: "Claude 3",
    description: "Advanced language model by Anthropic",
    parameters: "2 trillion",
    latency: "~400ms",
    type: "claude"
  },
  {
    id: "nova-1",
    name: "Nova-1",
    description: "Custom fine-tuned model for specific tasks",
    parameters: "800 billion",
    latency: "~300ms",
    type: "custom"
  }
];

export function ModelSelector() {
  const [selectedModel, setSelectedModel] = useState<Model>(models[0]);

  return (
    <div className="space-y-4">
      <Select onValueChange={(value) => setSelectedModel(models.find(m => m.id === value)!)}>
        <SelectTrigger>
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Available Models</SelectLabel>
            {models.map((model) => (
              <SelectItem key={model.id} value={model.id}>
                {model.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            {selectedModel.name}
          </CardTitle>
          <CardDescription>{selectedModel.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-muted-foreground">
                {selectedModel.parameters} parameters
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-muted-foreground">
                {selectedModel.latency} latency
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Badge variant={selectedModel.type === "custom" ? "default" : "secondary"}>
            {selectedModel.type.toUpperCase()}
          </Badge>
        </CardFooter>
      </Card>
    </div>
  );
}