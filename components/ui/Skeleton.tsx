interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`h-[270px] min-w-[180px] animate-pulse rounded-[1.2rem] border border-white/5 bg-gradient-to-b from-zinc-900 to-zinc-950 ${className}`}
    />
  );
}
