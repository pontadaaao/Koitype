export default function ColumnsLoading() {
  return (
    <div className="mx-auto max-w-2xl px-4 pb-20 pt-8">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-2 h-4 w-16 animate-pulse rounded bg-pink-light" />
        <div className="mx-auto h-8 w-36 animate-pulse rounded-lg bg-pink-light" />
        <div className="mx-auto mt-2 h-4 w-56 animate-pulse rounded bg-pink-light" />
      </div>
      <div className="mb-6 flex flex-wrap gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-8 w-20 animate-pulse rounded-full bg-pink-light" />
        ))}
      </div>
      <div className="rounded-2xl border border-pink-light bg-base">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex items-start gap-4 border-b border-pink-light/60 px-1 py-5 last:border-b-0 sm:px-2"
          >
            <div className="mt-2 h-2 w-2 shrink-0 animate-pulse rounded-full bg-pink-light" />
            <div className="flex-1 space-y-2">
              <div className="flex gap-2">
                <div className="h-5 w-20 animate-pulse rounded-full bg-pink-light" />
                <div className="h-5 w-24 animate-pulse rounded bg-pink-light" />
              </div>
              <div className="h-5 w-4/5 animate-pulse rounded bg-pink-light" />
              <div className="h-4 w-full animate-pulse rounded bg-pink-light" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
