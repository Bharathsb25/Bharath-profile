function SkeletonCard({ className = "" }: { className?: string }) {
  return <div className={`card animate-pulse bg-line/40 ${className}`} />;
}

export default function AnalyticsLoading() {
  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-line/40" />
        <div className="mt-6 h-16 animate-pulse rounded-2xl bg-line/40" />
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} className="h-24" />
          ))}
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} className="h-48" />
          ))}
        </div>
      </div>
    </div>
  );
}
