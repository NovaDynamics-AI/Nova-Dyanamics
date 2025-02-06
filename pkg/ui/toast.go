
package ui

import (
    "sync"
    "time"
)

type Toast struct {
    ID          string
    Title       string
    Description string
    Type        string
    Duration    time.Duration
}

type ToastManager struct {
    mu     sync.RWMutex
    toasts map[string]*Toast
}

func NewToastManager() *ToastManager {
    return &ToastManager{
        toasts: make(map[string]*Toast),
    }
}

func (tm *ToastManager) Add(toast *Toast) {
    tm.mu.Lock()
    defer tm.mu.Unlock()
    tm.toasts[toast.ID] = toast
    
    go func() {
        time.Sleep(toast.Duration)
        tm.Remove(toast.ID)
    }()
}

func (tm *ToastManager) Remove(id string) {
    tm.mu.Lock()
    defer tm.mu.Unlock()
    delete(tm.toasts, id)
}
