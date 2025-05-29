"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Truck,
  Package
} from "lucide-react";

export default function ComprasFornecedorPage() {
  const [dadosFornecedor, setDadosFornecedor] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8080/api/dashboard/compras-por-fornecedor");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // O backend retorna { fornecedor: string, totalVendido: number }
        // Precisamos mapear para { fornecedorNome: string, totalItens: number }
        const dadosMapeados = data.map(item => ({
          fornecedorNome: item.fornecedor,
          totalItens: item.totalVendido 
        }));
        const dadosOrdenados = [...dadosMapeados].sort((a, b) => b.totalItens - a.totalItens);
        setDadosFornecedor(dadosOrdenados);
        setError(null);
      } catch (e) {
        console.error("Falha ao buscar dados de compras por fornecedor:", e);
        setError("Não foi possível carregar os dados. Tente novamente mais tarde.");
        setDadosFornecedor([]); // Limpa os dados em caso de erro
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartData = dadosFornecedor.map(item => ({ // Modificado para usar dadosFornecedor do estado
    name: item.fornecedorNome,
    total: item.totalItens,
  }));

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-lg border-b-4 border-orange-500 sticky top-0 z-10">
        <div className="container mx-auto px-4 md:px-6 py-6">
          <div className="flex items-center justify-between">
            <Link 
              href="/" 
              className="flex items-center gap-3 text-lg font-semibold text-gray-800 dark:text-white hover:text-orange-600 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Voltar para o Início
            </Link>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-xl">
                <Truck className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50">
                  Total de Itens Comprados por Fornecedor
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Lista de fornecedores e o total de itens comprados de cada um.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 md:p-6 space-y-6">
        {/* Gráfico de Barras */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Package className="h-5 w-5 text-orange-600" />
              Gráfico de Compras por Fornecedor
            </CardTitle>
            <CardDescription>
              Visualização do total de itens comprados por fornecedor.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[400px] w-full">
            {loading && <p className="text-center py-10">Carregando dados do gráfico...</p>}
            {error && <p className="text-center py-10 text-red-600">{error}</p>}
            {!loading && !error && dadosFornecedor.length === 0 && (
              <p className="text-center py-10">Nenhum dado para exibir no gráfico.</p>
            )}
            {!loading && !error && dadosFornecedor.length > 0 && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ right: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={150} /* Aumentado para melhor visualização dos nomes */ />
                  <Tooltip
                    formatter={(value) => [value, "Total de Itens"]}
                    cursor={{ fill: 'hsl(var(--muted))' }}
                  />
                  <Legend />
                  <Bar dataKey="total" fill="hsl(var(--primary))" name="Total de Itens Comprados" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Tabela de Resultados Simplificada */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Package className="h-5 w-5 text-orange-600" />
              Fornecedores e Total de Itens
            </CardTitle>
            <CardDescription>
              {loading ? "Carregando..." : 
               error ? "Erro ao carregar" : 
               `${dadosFornecedor.length} fornecedor(es) listado(s), ordenado(s) por total de itens comprados (decrescente).`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading && (
              <div className="text-center py-10">
                <Truck className="mx-auto h-12 w-12 text-gray-400 mb-4 animate-pulse" />
                <p className="text-xl font-semibold text-gray-700">Carregando dados...</p>
              </div>
            )}
            {error && (
              <div className="text-center py-10">
                <Truck className="mx-auto h-12 w-12 text-red-400 mb-4" />
                <p className="text-xl font-semibold text-red-700">Erro ao carregar dados</p>
                <p className="text-gray-500">{error}</p>
              </div>
            )}
            {!loading && !error && dadosFornecedor.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 dark:bg-gray-800">
                      <TableHead className="min-w-[250px]">Fornecedor</TableHead>
                      <TableHead className="text-right min-w-[150px]">Total de Itens Comprados</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dadosFornecedor.map((fornecedor, index) => (
                      <TableRow key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <TableCell className="font-medium">
                          {fornecedor.fornecedorNome}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {fornecedor.totalItens.toLocaleString('pt-BR')} 
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-10">
                <Truck className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-xl font-semibold text-gray-700">Nenhum dado de compra por fornecedor encontrado.</p>
                <p className="text-gray-500">Não há informações disponíveis para exibir no momento.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}