package main

import (
	"flag"
	"fmt"
	"os"

	"github.com/novaai/nova-dynamics/internal/config"
	"github.com/novaai/nova-dynamics/internal/engine"
)

func main() {
	configPath := flag.String("config", "config.yaml", "path to config file")
	flag.Parse()

	cfg, err := config.Load(*configPath)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error loading config: %v\n", err)
		os.Exit(1)
	}

	engine := engine.New(cfg)
	if err := engine.Start(); err != nil {
		fmt.Fprintf(os.Stderr, "Error starting engine: %v\n", err)
		os.Exit(1)
	}
}
