export default function BlogLoading() {
  return (
    <div className="mx-auto max-w-4xl px-4 pb-20 pt-8">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-2 h-4 w-14 animate-pulse rounded bg-pink-light" />
        <div className="mx-auto h-8 w-40 animate-pulse rounded-lg bg-pink-light" />
        <div className="mx-auto mt-2 h-4 w-60 animate-pulse rounded bg-pink-light" />
      </div>
      <div className="mb-6 h-11 w-full animate-pulse rounded-full bg-pink-light" />
      <div className="mb-6 flex gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-8 w-20 animate-pulse rounded-full bg-pink-light" />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border border-pink-light bg-white"
          >
            <div className="aspect-[16/9] w-full animate-pulse bg-pink-light" />
            <div className="space-y-2 p-4">
              <div className="h-4 w-4/5 animate-pulse rounded bg-pink-light" />
              <div className="h-3 w-full animate-pulse rounded bg-pink-light" />
              <div className="h-3 w-1/3 animate-pulse rounded bg-pink-light" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
