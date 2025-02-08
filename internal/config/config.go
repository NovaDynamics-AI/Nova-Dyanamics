package config

import (
	"fmt"
	"os"

	"gopkg.in/yaml.v3"
)

// Config struct holds application configuration parameters.
type Config struct {
	LLM struct {
		Provider  string `yaml:"provider"`
		APIKey    string `yaml:"apiKey"`
		ModelName string `yaml:"modelName"`
	} `yaml:"llm"`

	Storage struct {
		Type     string `yaml:"type"`
		URL      string `yaml:"url"`
		MaxConns int    `yaml:"maxConns"`
	} `yaml:"storage"`

	Plugins struct {
		Dir     string   `yaml:"dir"`
		Enabled []string `yaml:"enabled"`
	} `yaml:"plugins"`
}

// Load reads a YAML configuration file and loads it into a Config struct.
func Load(path string) (*Config, error) {
	file, err := os.Open(path)
	if err != nil {
		return nil, fmt.Errorf("failed to open config file: %w", err)
	}
	defer file.Close()

	var cfg Config
	decoder := yaml.NewDecoder(file)
	if err := decoder.Decode(&cfg); err != nil {
		return nil, fmt.Errorf("failed to decode YAML: %w", err)
	}

	if err := validateConfig(&cfg); err != nil {
		return nil, fmt.Errorf("invalid config: %w", err)
	}

	return &cfg, nil
}

// validateConfig ensures required configuration fields are set.
func validateConfig(cfg *Config) error {
	if cfg.LLM.Provider == "" {
		return fmt.Errorf("missing LLM provider")
	}
	if cfg.Storage.Type == "" {
		return fmt.Errorf("missing storage type")
	}
	if cfg.Storage.URL == "" {
		return fmt.Errorf("missing storage URL")
	}
	return nil
}

// LoadFromEnv overrides config values with environment variables if present.
func LoadFromEnv(cfg *Config) {
	if provider := os.Getenv("LLM_PROVIDER"); provider != "" {
		cfg.LLM.Provider = provider
	}
	if apiKey := os.Getenv("LLM_API_KEY"); apiKey != "" {
		cfg.LLM.APIKey = apiKey
	}
	if modelName := os.Getenv("LLM_MODEL_NAME"); modelName != "" {
		cfg.LLM.ModelName = modelName
	}
	if storageURL := os.Getenv("STORAGE_URL"); storageURL != "" {
		cfg.Storage.URL = storageURL
	}
}
