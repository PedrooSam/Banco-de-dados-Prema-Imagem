"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ArrowLeft, Package, TrendingUp, Search, ChevronsUpDown, ChevronDown, ChevronUp, AlertTriangle, Loader2 } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ProdutosMaisUtilizadosPage() {
  const [filtroNome, setFiltroNome] = useState("");
  const [ordenacao, setOrdenacao] = useState({
    campo: "vezesVendido",
    direcao: "desc",
  });
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProdutosMaisUtilizados = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:8080/api/dashboard/top10-produtos-mais-utilizados");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const dadosMapeados = data.map(p => ({
          nome_produto: p.produto,
          vezes_vendido: p.vezesVendido,
          quantidade_total_vendida: p.quantidadeVendida
        }));
        setProdutos(dadosMapeados);
      } catch (e) {
        console.error("Falha ao buscar produtos mais utilizados:", e);
        setError("Não foi possível carregar os dados. Tente novamente mais tarde.");
        setProdutos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutosMaisUtilizados();
  }, []);

  const produtosFiltrados = useMemo(() => {
    let itens = produtos.filter(
      (produto) =>
        produto.nome_produto.toLowerCase().includes(filtroNome.toLowerCase())
    );

    return [...itens].sort((a, b) => {
      const valA = a[ordenacao.campo];
      const valB = b[ordenacao.campo];
      if (ordenacao.direcao === "asc") {
        return typeof valA === "string"
          ? valA.localeCompare(valB)
          : valA - valB;
      }
      return typeof valB === "string"
        ? valB.localeCompare(valA)
        : valB - valA;
    });
  }, [filtroNome, ordenacao, produtos]);

  const kpis = useMemo(() => {
    const totalProdutosDistintos = produtosFiltrados.length;
    const totalUnidadesVendidas = produtosFiltrados.reduce(
      (acc, p) => acc + p.quantidade_total_vendida,
      0
    );
    const produtoMaisVendido =
      produtosFiltrados.length > 0
        ? [...produtosFiltrados].sort((a, b) => b.vezes_vendido - a.vezes_vendido)[0].nome_produto
        : "N/A";
    return {
      totalProdutosDistintos,
      totalUnidadesVendidas,
      produtoMaisVendido,
    };
  }, [produtosFiltrados]);

  const dadosGraficoBarras = useMemo(() => {
    const top10Produtos = [...produtosFiltrados]
        .sort((a,b) => b.quantidade_total_vendida - a.quantidade_total_vendida)
        .slice(0, 10);
    return {
      labels: top10Produtos.map((p) => p.nome_produto),
      datasets: [
        {
          label: "Quantidade Total Vendida",
          data: top10Produtos.map((p) => p.quantidade_total_vendida),
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    };
  }, [produtosFiltrados]);

  const handleSort = (campo) => {
    setOrdenacao((prev) => ({
      campo,
      direcao:
        prev.campo === campo && prev.direcao === "desc" ? "asc" : "desc",
    }));
  };

  const colunasTabela = [
    { label: "Nome do Produto", campo: "nome_produto" },
    { label: "Vezes Vendido", campo: "vezes_vendido" },
    { label: "Qtd. Total Vendida", campo: "quantidade_total_vendida" },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <Loader2 className="h-16 w-16 text-blue-600 animate-spin mb-4" />
        <p className="text-xl text-gray-700">Carregando dados dos produtos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 text-center">
        <AlertTriangle className="h-16 w-16 text-red-600 mb-4" />
        <h2 className="text-2xl font-semibold text-red-700 mb-2">Erro ao Carregar Dados</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <Link href="/dashboard/produtos-mais-utilizados" passHref>
          <Button variant="outline">Tentar Novamente</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 bg-gray-50 min-h-screen">
      <header className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold text-gray-800">
            Dashboard de Produtos Mais Utilizados
          </h1>
          <Link href="/" passHref>
            <Button
              variant="outline"
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-300 rounded shadow"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar para o Início
            </Button>
          </Link>
        </div>
        <p className="text-lg text-gray-600">
          {produtos.length > 0 
            ? "Analise os produtos mais vendidos e suas quantidades para otimizar a gestão de insumos da clínica."
            : "Nenhum dado de produto para exibir no momento."}
        </p>
      </header>

      {/* KPIs */}
      {produtos.length > 0 && ( // Só mostra KPIs se houver produtos
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-lg border border-gray-200 rounded-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gray-100 rounded-t-lg">
              <CardTitle className="text-sm font-medium text-gray-600">Total Produtos Distintos</CardTitle>
              <Package className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent className="py-4">
              <div className="text-3xl font-bold text-gray-800">{kpis.totalProdutosDistintos}</div>
            </CardContent>
          </Card>
          <Card className="shadow-lg border border-gray-200 rounded-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gray-100 rounded-t-lg">
              <CardTitle className="text-sm font-medium text-gray-600">Total Unidades Vendidas</CardTitle>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent className="py-4">
              <div className="text-3xl font-bold text-gray-800">{kpis.totalUnidadesVendidas.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card className="shadow-lg border border-gray-200 rounded-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gray-100 rounded-t-lg">
              <CardTitle className="text-sm font-medium text-gray-600">Produto Mais Vendido (Vezes)</CardTitle>
              <Package className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent className="py-4">
              <div className="text-xl font-bold text-gray-800 truncate" title={kpis.produtoMaisVendido}>{kpis.produtoMaisVendido}</div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Filtros e Tabela */}
      <Card className="mb-8 shadow-lg border border-gray-200 rounded-lg">
        <CardHeader className="bg-gray-100 border-b border-gray-200 py-4 px-6 rounded-t-lg">
          <CardTitle className="text-2xl text-gray-700">Lista de Produtos</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center mb-6">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="Buscar por nome do produto..."
                value={filtroNome}
                onChange={(e) => setFiltroNome(e.target.value)}
                className="pl-10 pr-4 py-2 w-full md:w-1/3"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="overflow-x-auto">
            {produtosFiltrados.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    {colunasTabela.map(({ label, campo }) => (
                      <TableHead 
                        key={campo} 
                        onClick={() => handleSort(campo)} 
                        className="cursor-pointer hover:bg-gray-200 transition-colors py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        <div className="flex items-center">
                          {label}
                          {ordenacao.campo === campo ? (
                            ordenacao.direcao === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                          ) : (
                            <ChevronsUpDown className="ml-1 h-4 w-4 opacity-30" />
                          )}
                        </div>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {produtosFiltrados.map((produto, index) => (
                    <TableRow key={index} className="border-b hover:bg-gray-100 transition-colors">
                      <TableCell className="py-3 px-4 font-medium text-gray-800">{produto.nome_produto}</TableCell>
                      <TableCell className="py-3 px-4 text-gray-600 text-center">{produto.vezes_vendido.toLocaleString()}</TableCell>
                      <TableCell className="py-3 px-4 text-gray-600 text-center">{produto.quantidade_total_vendida.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-lg font-semibold">Nenhum produto encontrado.</p>
                <p className="text-sm">Tente refinar sua busca ou verifique se há produtos cadastrados.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Gráfico de Barras */}
      {produtosFiltrados.length > 0 && ( // Só mostra gráfico se houver produtos
        <Card className="shadow-lg border border-gray-200 rounded-lg">
          <CardHeader className="bg-gray-100 border-b border-gray-200 py-4 px-6 rounded-t-lg">
            <CardTitle className="text-2xl text-gray-700">Top 10 Produtos por Quantidade Vendida</CardTitle>
          </CardHeader>
          <CardContent className="p-6 h-96">
            {produtosFiltrados.length > 0 ? (
              <Bar
                data={dadosGraficoBarras}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: 'top' },
                    title: { display: true, text: "Quantidade Total Vendida dos Top 10 Produtos" },
                  },
                  scales: {
                    y: { beginAtZero: true }
                  }
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Não há dados suficientes para exibir o gráfico.
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
