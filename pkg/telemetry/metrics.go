package telemetry

import (
	"context"
	"time"

	"github.com/prometheus/client_golang/prometheus"
)

var (
	RequestDuration = prometheus.NewHistogramVec(
		prometheus.HistogramOpts{
			Name: "request_duration_seconds",
			Help: "Time spent processing request",
		},
		[]string{"provider", "operation"},
	)

	MemoryUsage = prometheus.NewGaugeVec(
		prometheus.GaugeOpts{
			Name: "memory_usage_bytes",
			Help: "Current memory usage in bytes",
		},
		[]string{"type"},
	)
)

func RecordRequestDuration(ctx context.Context, provider, operation string, duration time.Duration) {
	RequestDuration.WithLabelValues(provider, operation).Observe(duration.Seconds())
}

func RecordMemoryUsage(ctx context.Context, memoryType string, bytes float64) {
	MemoryUsage.WithLabelValues(memoryType).Set(bytes)
}
