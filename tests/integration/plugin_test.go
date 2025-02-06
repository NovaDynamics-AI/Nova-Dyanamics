package integration

import (
	"context"
	"testing"

	"github.com/novaai/nova-dynamics/internal/plugin"
	"github.com/stretchr/testify/assert"
)

func TestPluginLifecycle(t *testing.T) {
	ctx := context.Background()
	manager := plugin.NewManager()

	t.Run("Load Plugin", func(t *testing.T) {
		plugin, err := manager.Load("test-plugin")
		assert.NoError(t, err)
		assert.NotNil(t, plugin)
	})

	t.Run("Execute Plugin", func(t *testing.T) {
		result, err := manager.Execute(ctx, "test-plugin", "test input")
		assert.NoError(t, err)
		assert.NotEmpty(t, result)
	})
}
