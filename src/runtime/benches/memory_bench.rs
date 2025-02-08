use criterion::{black_box, criterion_group, criterion_main, Criterion, BenchmarkId, Throughput};
use nova_runtime::memory::MemoryManager;
use serde_json::json;
use std::time::Duration;

fn bench_memory_operations(c: &mut Criterion) {
    let mut group = c.benchmark_group("memory_operations");

    // Set measurement time and sample size for better accuracy
    group.measurement_time(Duration::from_secs(10));
    group.sample_size(100);

    // Benchmark storing different sizes of memory entries
    for size in [10, 100, 1000, 10000].iter() {
        group.throughput(Throughput::Elements(*size as u64));

        group.bench_with_input(BenchmarkId::new("store", size), size, |b, &size| {
            b.iter(|| {
                let manager = MemoryManager::new();
                for _ in 0..size {
                    black_box(manager.store("test memory", json!({})));
                }
            });
        });
    }

    // Benchmark search performance with different result limits
    for limit in [1, 5, 10, 50].iter() {
        group.bench_with_input(BenchmarkId::new("search", limit), limit, |b, &limit| {
            b.iter(|| {
                let manager = MemoryManager::new();
                black_box(manager.search("test query", limit));
            });
        });
    }

    // Benchmark deleting memory items
    group.bench_function("delete", |b| {
        b.iter(|| {
            let manager = MemoryManager::new();
            black_box(manager.delete("test memory"));
        });
    });

    group.finish();
}

criterion_group!(benches, bench_memory_operations);
criterion_main!(benches);
