package engine

import (
	"context"
	"sync"
	"time"

	"github.com/novaai/nova-dynamics/internal/memory"
)

type State struct {
	mu sync.RWMutex

	ID        string
	CreatedAt time.Time
	UpdatedAt time.Time

	Input     string
	Memories  []memory.Memory
	Variables map[string]interface{}
}

func NewState() *State {
	return &State{
		ID:        NewID(),
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
		Variables: make(map[string]interface{}),
	}
}

func (s *State) SetInput(input string) {
	s.mu.Lock()
	defer s.mu.Unlock()

	s.Input = input
	s.UpdatedAt = time.Now()
}

func (s *State) AddMemory(ctx context.Context, m memory.Memory) {
	s.mu.Lock()
	defer s.mu.Unlock()

	s.Memories = append(s.Memories, m)
	s.UpdatedAt = time.Now()
}
