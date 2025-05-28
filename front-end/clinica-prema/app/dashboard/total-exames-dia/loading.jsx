export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="animate-pulse">
        <div className="h-8 w-48 bg-gray-300 rounded-md mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="h-10 w-full bg-gray-300 rounded-md"></div>
          <div className="h-10 w-full bg-gray-300 rounded-md"></div>
          <div className="h-10 w-full bg-gray-300 rounded-md"></div>
        </div>
        <div className="w-full h-64 bg-gray-300 rounded-lg"></div>
      </div>
      <p className="text-gray-600 mt-4">Carregando dados do dashboard...</p>
    </div>
  );
}
