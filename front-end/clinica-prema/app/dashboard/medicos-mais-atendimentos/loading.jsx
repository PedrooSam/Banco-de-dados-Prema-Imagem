import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { ArrowLeft, Filter } from "lucide-react"

export default function LoadingMedicosMaisAtendimentos() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Skeleton className="h-9 w-3/4 mb-2" /> 
            <Skeleton className="h-5 w-1/2" /> 
          </div>
          <Skeleton className="h-10 w-24" /> 
        </div>

        <Card className="mb-8">
          <CardHeader>
            <Skeleton className="h-6 w-48 flex items-center">
              <Filter className="h-5 w-5 mr-2 text-gray-400" />
            </Skeleton>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div>
              <Skeleton className="h-4 w-16 mb-1" /> 
              <Skeleton className="h-10 w-full" /> 
            </div>
            <div>
              <Skeleton className="h-4 w-16 mb-1" /> 
              <Skeleton className="h-10 w-full" /> 
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="shadow-xl h-full">
              <CardHeader>
                <Skeleton className="h-7 w-3/4 mb-1" /> 
                <Skeleton className="h-4 w-1/2" /> 
              </CardHeader>
              <CardContent className="h-[400px]">
                <Skeleton className="h-full w-full" /> 
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="shadow-xl h-full">
              <CardHeader>
                <Skeleton className="h-7 w-3/4 mb-1" /> 
                <Skeleton className="h-4 w-1/2" /> 
              </CardHeader>
              <CardContent className="max-h-[400px] space-y-3 pt-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex justify-between items-center p-3 border-b">
                    <div className="flex items-center w-3/4">
                      <Skeleton className="h-5 w-5 mr-3 rounded-full" />
                      <Skeleton className="h-5 w-full" />
                    </div>
                    <Skeleton className="h-6 w-20" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
