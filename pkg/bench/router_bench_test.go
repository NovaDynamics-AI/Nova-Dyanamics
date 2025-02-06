package bench

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/novaai/nova-dynamics/pkg/network"
)

func BenchmarkRouterBasic(b *testing.B) {
	router := network.NewRouter()
	router.Handle("/test", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("OK"))
	})

	ts := httptest.NewServer(router)
	defer ts.Close()

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		resp, err := http.Get(ts.URL + "/test")
		if err != nil {
			b.Fatal(err)
		}
		resp.Body.Close()
	}
}

func BenchmarkRouterWithMiddleware(b *testing.B) {
	router := network.NewRouter()
	router.Handle("/test", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("OK"))
	})

	// Add middleware
	handler := func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			// Simulate middleware processing
			next.ServeHTTP(w, r)
		})
	}

	ts := httptest.NewServer(handler(router))
	defer ts.Close()

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		resp, err := http.Get(ts.URL + "/test")
		if err != nil {
			b.Fatal(err)
		}
		resp.Body.Close()
	}
}
