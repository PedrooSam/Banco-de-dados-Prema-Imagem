import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Filter } from "lucide-react"

export default function LoadingExamesFaixaEtaria() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
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
          <CardContent>
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <Card className="shadow-lg">
            <CardHeader className="pb-2">
              <Skeleton className="h-7 w-3/4 mb-1" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-6 bg-orange-50 rounded-lg">
                <Skeleton className="h-12 w-12 rounded-full mr-4" />
                <div>
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-12 w-24" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <Skeleton className="h-7 w-3/4 mb-1" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent className="h-[300px]">
              <Skeleton className="h-full w-full rounded-full" /> {/* Pie chart skeleton */}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
