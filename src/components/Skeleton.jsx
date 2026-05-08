export const SkeletonCard = () => (
    <div className="overflow-hidden glass-card animate-pulse">
      <div className="h-48 bg-dark-700" />
      <div className="p-5 space-y-3">
        <div className="w-3/4 h-5 rounded bg-dark-700" />
        <div className="w-full h-3 rounded bg-dark-700" />
        <div className="w-2/3 h-3 rounded bg-dark-700" />
        <div className="flex justify-between pt-2">
          <div className="w-20 h-6 rounded bg-dark-700" />
          <div className="w-10 h-10 rounded-full bg-dark-700" />
        </div>
      </div>
    </div>
  )
  
  export const SkeletonText = ({ lines = 3 }) => (
    <div className="space-y-2 animate-pulse">
      {[...Array(lines)].map((_, i) => (
        <div key={i} className={`h-4 bg-dark-700 rounded ${i === lines - 1 ? 'w-2/3' : 'w-full'}`} />
      ))}
    </div>
  )