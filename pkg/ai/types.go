
package ai

type CompletionRequest struct {
    Prompt      string                 `json:"prompt"`
    MaxTokens   int                    `json:"maxTokens"`
    Temperature float64                `json:"temperature"`
    Options     map[string]interface{} `json:"options"`
}

type CompletionResponse struct {
    Text       string    `json:"text"`
    TokenCount int       `json:"tokenCount"`
    Score      float64   `json:"score"`
}

type Provider interface {
    GenerateCompletion(req *CompletionRequest) (*CompletionResponse, error)
    EmbedText(text string) ([]float64, error)
}

type ModelConfig struct {
    DefaultModel string  `json:"defaultModel"`
    Temperature  float64 `json:"temperature"`
    MaxTokens    int     `json:"maxTokens"`
    TopP         float64 `json:"topP"`
}
