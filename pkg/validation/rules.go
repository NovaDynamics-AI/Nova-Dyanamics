package validation

import (
	"fmt"
	"regexp"
	"strings"
)

type Rule struct {
	Name        string
	Description string
	Validate    func(interface{}) error
}

type Validator struct {
	rules map[string]Rule
}

func NewValidator() *Validator {
	return &Validator{
		rules: make(map[string]Rule),
	}
}

func (v *Validator) AddRule(rule Rule) {
	v.rules[rule.Name] = rule
}

func (v *Validator) Validate(name string, value interface{}) error {
	rule, exists := v.rules[name]
	if !exists {
		return fmt.Errorf("validation rule not found: %s", name)
	}
	return rule.Validate(value)
}

// Common validation rules for Nova Dynamics
var (
	ModelNameRule = Rule{
		Name:        "model_name",
		Description: "Validates model name format",
		Validate: func(v interface{}) error {
			name, ok := v.(string)
			if !ok {
				return fmt.Errorf("value must be a string")
			}
			if len(name) < 3 {
				return fmt.Errorf("model name too short")
			}
			return nil
		},
	}

	APIKeyRule = Rule{
		Name:        "api_key",
		Description: "Validates API key format",
		Validate: func(v interface{}) error {
			key, ok := v.(string)
			if !ok {
				return fmt.Errorf("value must be a string")
			}
			if len(key) < 32 {
				return fmt.Errorf("api key too short")
			}
			return nil
		},
	}
	EmailRule = Rule{
		Name:        "email",
		Description: "Validates email format",
		Validate: func(v interface{}) error {
			email, ok := v.(string)
			if !ok {
				return fmt.Errorf("value must be a string")
			}
			if !strings.Contains(email, "@") {
				return fmt.Errorf("invalid email format")
			}
			return nil
		},
	}
)