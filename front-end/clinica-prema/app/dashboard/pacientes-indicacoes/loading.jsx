import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <Skeleton className="h-12 w-3/4 mb-4" />
      <Skeleton className="h-8 w-1/2 mb-6" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-20 w-full" /> 
      </div>
      
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-6 w-1/4" />
            </div>
            <Skeleton className="h-4 w-3/4 mb-3" />
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
