package config

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

func Load(path string) (*Config, error) {
	// Implementation would go here
	return &Config{}, nil
}
