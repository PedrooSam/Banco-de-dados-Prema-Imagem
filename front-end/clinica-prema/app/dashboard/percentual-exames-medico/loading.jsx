import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <Skeleton className="h-12 w-3/4 mb-4" />
      <Skeleton className="h-8 w-1/2 mb-6" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
      
      <Skeleton className="h-10 w-1/4 mb-4" />
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <Skeleton className="h-8 w-1/4" />
          </div>
        ))}
      </div>
    </div>
  );
}
