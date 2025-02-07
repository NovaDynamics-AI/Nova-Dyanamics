import numpy as np
from typing import List, Dict, Any
from dataclasses import dataclass

@dataclass
class ModelMetrics:
    accuracy: float
    latency: float
    token_count: int
    memory_usage: float

class ModelEvaluator:
    def __init__(self, model_name: str, config: Dict[str, Any]):
        self.model_name = model_name
        self.config = config
        self.metrics: List[ModelMetrics] = []

    def evaluate_batch(self, inputs: List[str], expected: List[str]) -> ModelMetrics:
        metrics = ModelMetrics(
            accuracy=np.random.random(),  # Simulated accuracy in ms
            latency=np.random.random() * 100,  # Simulated latency in ms
            token_count=len(' '.join(inputs).split()),
            memory_usage=np.random.random() * 1024  # Simulated memory usage in MB
        )
        self.metrics.append(metrics)
        return metrics

    def generate_report(self) -> Dict[str, Any]:
        return {
            "model_name": self.model_name,
            "config": self.config,
            "average_metrics": {
                "accuracy": np.mean([m.accuracy for m in self.metrics]),
                "latency": np.mean([m.latency for m in self.metrics]),
                "token_count": np.mean([m.token_count for m in self.metrics]),
                "memory_usage": np.mean([m.memory_usage for m in self.metrics])
            }
        }
