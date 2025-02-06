
package network

import (
    "encoding/json"
    "net/http"
    
    "github.com/novadynamics/nova-ai/pkg/ai"
    "github.com/novadynamics/nova-ai/pkg/storage"
)

type Handler struct {
    nova    *ai.Nova
    storage *storage.Storage
}

func NewHandler(nova *ai.Nova, storage *storage.Storage) *Handler {
    return &Handler{
        nova:    nova,
        storage: storage,
    }
}

func (h *Handler) ProcessInput(w http.ResponseWriter, r *http.Request) {
    var req struct {
        Input string `json:"input"`
    }
    
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }
    
    result, err := h.nova.Process(req.Input)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    
    json.NewEncoder(w).Encode(map[string]interface{}{
        "result": result,
    })
}

func (h *Handler) GetPlugins(w http.ResponseWriter, r *http.Request) {
    plugins := h.storage.GetPlugins()
    json.NewEncoder(w).Encode(plugins)
}

func (h *Handler) CreatePlugin(w http.ResponseWriter, r *http.Request) {
    var req struct {
        Name       string `json:"name"`
        Version    string `json:"version"`
        EntryPoint string `json:"entryPoint"`
    }
    
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }
    
    plugin := h.storage.CreatePlugin(req.Name, req.Version, req.EntryPoint)
    json.NewEncoder(w).Encode(plugin)
}
