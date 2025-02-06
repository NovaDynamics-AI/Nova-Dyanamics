
package storage

import (
    "sync"
    "time"
)

type Memory struct {
    ID        int       `json:"id"`
    Text      string    `json:"text"`
    CreatedAt time.Time `json:"createdAt"`
}

type Plugin struct {
    ID          int       `json:"id"`
    Name        string    `json:"name"`
    Version     string    `json:"version"`
    EntryPoint  string    `json:"entryPoint"`
    Enabled     bool      `json:"enabled"`
    LastUpdated time.Time `json:"lastUpdated"`
}

type Storage struct {
    mu          sync.RWMutex
    memories    map[int]*Memory
    plugins     map[int]*Plugin
    memoryID    int
    pluginID    int
}

func NewStorage() *Storage {
    return &Storage{
        memories: make(map[int]*Memory),
        plugins:  make(map[int]*Plugin),
        memoryID: 1,
        pluginID: 1,
    }
}

func (s *Storage) GetMemories() []*Memory {
    s.mu.RLock()
    defer s.mu.RUnlock()
    
    memories := make([]*Memory, 0, len(s.memories))
    for _, m := range s.memories {
        memories = append(memories, m)
    }
    return memories
}

func (s *Storage) CreateMemory(text string) *Memory {
    s.mu.Lock()
    defer s.mu.Unlock()
    
    memory := &Memory{
        ID:        s.memoryID,
        Text:      text,
        CreatedAt: time.Now(),
    }
    s.memories[s.memoryID] = memory
    s.memoryID++
    return memory
}

func (s *Storage) GetPlugins() []*Plugin {
    s.mu.RLock()
    defer s.mu.RUnlock()
    
    plugins := make([]*Plugin, 0, len(s.plugins))
    for _, p := range s.plugins {
        plugins = append(plugins, p)
    }
    return plugins
}

func (s *Storage) CreatePlugin(name, version, entryPoint string) *Plugin {
    s.mu.Lock()
    defer s.mu.Unlock()
    
    plugin := &Plugin{
        ID:          s.pluginID,
        Name:        name,
        Version:     version,
        EntryPoint:  entryPoint,
        Enabled:     true,
        LastUpdated: time.Now(),
    }
    s.plugins[s.pluginID] = plugin
    s.pluginID++
    return plugin
}
