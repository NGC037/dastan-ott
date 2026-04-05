export default function PageSkeleton() {
  return (
    <div className="min-h-[70vh] animate-pulse px-8 py-10">
      <div className="h-12 w-56 rounded-full bg-zinc-900/80" />
      <div className="mt-6 h-[42vh] rounded-[2rem] bg-zinc-900/70" />
      <div className="mt-8 h-5 w-32 rounded-full bg-zinc-900/80" />
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="h-56 rounded-[1.5rem] bg-zinc-900/70" />
        <div className="h-56 rounded-[1.5rem] bg-zinc-900/70" />
        <div className="h-56 rounded-[1.5rem] bg-zinc-900/70" />
      </div>
    </div>
  );
}
