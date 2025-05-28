import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <Skeleton className="h-10 w-1/3 mb-6" /> {/* Título */}

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 border rounded-lg">
        <Skeleton className="h-10 flex-grow md:w-1/3" />
        <Skeleton className="h-10 flex-grow md:w-1/4" />
        <Skeleton className="h-10 flex-grow md:w-1/4" />
        <Skeleton className="h-10 md:w-auto" /> {/* Botão Limpar */}
      </div>

      {/* Tabela */}
      <Skeleton className="h-12 w-full mb-2" /> {/* Cabeçalho Tabela */}
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} className="h-10 w-full mb-2" /> /* Linhas da Tabela */
      ))}

      <Skeleton className="h-10 w-32 mt-6" /> {/* Botão Voltar */}
    </div>
  );
}
