
package ui

import (
    "sync"
)

type MobileDetector struct {
    mu       sync.RWMutex
    isMobile bool
}

func NewMobileDetector() *MobileDetector {
    return &MobileDetector{}
}

func (m *MobileDetector) SetMobile(mobile bool) {
    m.mu.Lock()
    defer m.mu.Unlock()
    m.isMobile = mobile
}

func (m *MobileDetector) IsMobile() bool {
    m.mu.RLock()
    defer m.mu.RUnlock()
    return m.isMobile
}
