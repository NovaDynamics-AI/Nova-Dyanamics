
package bench

import (
    "testing"
)

func BenchmarkMemoryOperations(b *testing.B) {
    b.Run("store", func(b *testing.B) {
        manager := NewMemoryManager()
        for i := 0; i < b.N; i++ {
            manager.Store("test memory", map[string]interface{}{})
        }
    })
    
    b.Run("search", func(b *testing.B) {
        manager := NewMemoryManager()
        for i := 0; i < b.N; i++ {
            manager.Search("test query", 5)
        }
    })
}
