import numpy as np
from typing import List, Dict, Any
from dataclasses import dataclass

@dataclass
class ModelMetrics:
    accuracy: float
    latency: float  # in milliseconds
    token_count: int
    memory_usage: float  # in MB

class ModelEvaluator:
    def __init__(self, model_name: str, config: Dict[str, Any]):
        self.model_name = model_name
        self.config = config
        self.metrics: List[ModelMetrics] = []

    def evaluate_batch(self, inputs: List[str], expected: List[str]) -> ModelMetrics:
        """Simulates model evaluation by generating synthetic performance metrics."""
        token_count = sum(len(inp.split()) for inp in inputs)
        
        metrics = ModelMetrics(
            accuracy=np.random.uniform(0.5, 1.0),  # Simulated accuracy between 50-100%
            latency=np.random.uniform(10, 200),  # Simulated latency in ms
            token_count=token_count,
            memory_usage=np.random.uniform(100, 2000)  # Simulated memory usage in MB
        )
        
        self.metrics.append(metrics)
        return metrics

    def generate_report(self) -> Dict[str, Any]:
        """Generates a summary report of the model's performance."""
        if not self.metrics:
            return {
                "model_name": self.model_name,
                "config": self.config,
                "message": "No evaluations performed yet."
            }

        return {
            "model_name": self.model_name,
            "config": self.config,
            "average_metrics": {
                "accuracy": np.mean([m.accuracy for m in self.metrics]),
                "latency": np.mean([m.latency for m in self.metrics]),
                "token_count": int(np.mean([m.token_count for m in self.metrics])),
                "memory_usage": np.mean([m.memory_usage for m in self.metrics])
            },
            "evaluations": len(self.metrics)
        }
