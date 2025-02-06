use criterion::{black_box, criterion_group, criterion_main, Criterion};
use nova_runtime::memory::MemoryManager;

fn bench_memory_operations(c: &mut Criterion) {
    let mut group = c.benchmark_group("memory");
    
    group.bench_function("store", |b| {
        b.iter(|| {
            let manager = MemoryManager::new();
            black_box(manager.store("test memory", json!({})));
        });
    });

    group.bench_function("search", |b| {
        b.iter(|| {
            let manager = MemoryManager::new();
            black_box(manager.search("test query", 5));
        });
    });
}

criterion_group!(benches, bench_memory_operations);
criterion_main!(benches);
