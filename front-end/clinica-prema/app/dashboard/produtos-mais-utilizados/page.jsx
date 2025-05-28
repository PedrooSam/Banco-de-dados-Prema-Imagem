"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { ArrowLeft, Package, TrendingUp, AlertTriangle, ListFilter, Search, ChevronsUpDown, ChevronDown, ChevronUp } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Mock data - substitua com dados reais da sua API
const mockProdutos = [
  {
    id: 1,
    nome: "Seringa Descartável 5ml",
    categoria: "Descartáveis",
    fornecedor: "Fornecedor A",
    quantidadeUtilizada: 1200,
    estoqueAtual: 500,
    estoqueMinimo: 100,
  },
  {
    id: 2,
    nome: "Luva Cirúrgica Estéril (Par)",
    categoria: "EPIs",
    fornecedor: "Fornecedor B",
    quantidadeUtilizada: 850,
    estoqueAtual: 300,
    estoqueMinimo: 50,
  },
  {
    id: 3,
    nome: "Gaze Estéril 7,5x7,5cm (Pacote)",
    categoria: "Curativos",
    fornecedor: "Fornecedor A",
    quantidadeUtilizada: 950,
    estoqueAtual: 400,
    estoqueMinimo: 80,
  },
  {
    id: 4,
    nome: "Álcool Etílico 70% 1L",
    categoria: "Antissépticos",
    fornecedor: "Fornecedor C",
    quantidadeUtilizada: 500,
    estoqueAtual: 150,
    estoqueMinimo: 30,
  },
  {
    id: 5,
    nome: "Agulha Hipodérmica 25x0,7mm",
    categoria: "Descartáveis",
    fornecedor: "Fornecedor B",
    quantidadeUtilizada: 1100,
    estoqueAtual: 600,
    estoqueMinimo: 120,
  },
  {
    id: 6,
    nome: "Máscara Cirúrgica Tripla Camada (Caixa)",
    categoria: "EPIs",
    fornecedor: "Fornecedor A",
    quantidadeUtilizada: 700,
    estoqueAtual: 250,
    estoqueMinimo: 40,
  },
  { id: 7, nome: "Fio de Sutura Nylon 3-0", categoria: "Cirúrgicos", fornecedor: "Fornecedor D", quantidadeUtilizada: 300, estoqueAtual: 100, estoqueMinimo: 20 },
  {
    id: 8,
    nome: "Compressa de Gaze Não Estéril (Pacote)",
    categoria: "Curativos",
    fornecedor: "Fornecedor C",
    quantidadeUtilizada: 600,
    estoqueAtual: 350,
    estoqueMinimo: 70,
  },
  {
    id: 9,
    nome: "Abaixador de Língua de Madeira (Pacote)",
    categoria: "Descartáveis",
    fornecedor: "Fornecedor A",
    quantidadeUtilizada: 400,
    estoqueAtual: 200,
    estoqueMinimo: 50,
  },
  {
    id: 10,
    nome: "Sabonete Líquido Antisséptico 500ml",
    categoria: "Antissépticos",
    fornecedor: "Fornecedor B",
    quantidadeUtilizada: 350,
    estoqueAtual: 120,
    estoqueMinimo: 25,
  },
  { id: 11, nome: "Cateter Intravenoso 22G", categoria: "Descartáveis", fornecedor: "Fornecedor D", quantidadeUtilizada: 750, estoqueAtual: 280, estoqueMinimo: 60 },
  { id: 12, nome: "Atadura Elástica 10cm", categoria: "Curativos", fornecedor: "Fornecedor C", quantidadeUtilizada: 250, estoqueAtual: 90, estoqueMinimo: 15 },
];

const categoriasUnicas = [...new Set(mockProdutos.map((p) => p.categoria))];
const fornecedoresUnicos = [...new Set(mockProdutos.map((p) => p.fornecedor))];
const ALL_FILTER_VALUE = "all";

export default function ProdutosMaisUtilizadosPage() {
  const [produtos, setProdutos] = useState(mockProdutos);
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState(ALL_FILTER_VALUE);
  const [filtroFornecedor, setFiltroFornecedor] = useState(ALL_FILTER_VALUE);
  const [ordenacao, setOrdenacao] = useState({
    campo: "quantidadeUtilizada",
    direcao: "desc",
  });

  const produtosFiltrados = useMemo(() => {
    let itens = mockProdutos.filter(
      (produto) =>
        produto.nome.toLowerCase().includes(filtroNome.toLowerCase()) &&
        (filtroCategoria === ALL_FILTER_VALUE ||
          produto.categoria === filtroCategoria) &&
        (filtroFornecedor === ALL_FILTER_VALUE ||
          produto.fornecedor === filtroFornecedor)
    );

    return itens.sort((a, b) => {
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
  }, [filtroNome, filtroCategoria, filtroFornecedor, ordenacao]);

  const kpis = useMemo(() => {
    const totalProdutosDistintos = produtosFiltrados.length;
    const totalUnidadesUtilizadas = produtosFiltrados.reduce(
      (acc, p) => acc + p.quantidadeUtilizada,
      0
    );
    const produtoMaisUtilizado =
      produtosFiltrados.length > 0 ? produtosFiltrados[0].nome : "N/A"; // Assumindo que o primeiro é o mais utilizado após ordenação
    const produtosBaixoEstoque = produtosFiltrados.filter(
      (p) => p.estoqueAtual < p.estoqueMinimo
    ).length;
    return {
      totalProdutosDistintos,
      totalUnidadesUtilizadas,
      produtoMaisUtilizado,
      produtosBaixoEstoque,
    };
  }, [produtosFiltrados]);

  const dadosGraficoBarras = useMemo(() => {
    const top10Produtos = produtosFiltrados.slice(0, 10);
    return {
      labels: top10Produtos.map((p) => p.nome),
      datasets: [
        {
          label: "Quantidade Utilizada",
          data: top10Produtos.map((p) => p.quantidadeUtilizada),
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    };
  }, [produtosFiltrados]);

  const dadosGraficoPizza = useMemo(() => {
    const contagemPorCategoria = produtosFiltrados.reduce((acc, produto) => {
      acc[produto.categoria] = (acc[produto.categoria] || 0) + produto.quantidadeUtilizada;
      return acc;
    }, {});
    return {
      labels: Object.keys(contagemPorCategoria),
      datasets: [
        {
          data: Object.values(contagemPorCategoria),
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
          ],
          hoverOffset: 4,
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

  const getStockStatus = (produto) => {
    if (produto.estoqueAtual < produto.estoqueMinimo)
      return <span className="text-red-500 font-semibold">Baixo</span>;
    if (produto.estoqueAtual < produto.estoqueMinimo * 1.5)
      return <span className="text-yellow-500 font-semibold">Atenção</span>;
    return <span className="text-green-500 font-semibold">OK</span>;
  };

  // Simula o carregamento de dados
  useEffect(() => {
    // Aqui você faria a chamada à API para buscar os dados reais
    // Por enquanto, estamos usando mockProdutos
    // Se precisar simular um delay:
    // const timer = setTimeout(() => setProdutos(mockProdutos), 1000);
    // return () => clearTimeout(timer);
  }, []);

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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                />
              </svg>
              Voltar para o Início
            </Button>
          </Link>
        </div>
        <p className="text-lg text-gray-600">
          Analise os produtos mais utilizados, seu estoque e distribuição para
          otimizar a gestão de insumos da clínica.
        </p>
      </header>

      {/* Filtros */}
      <Card className="mb-8 shadow-lg border border-gray-200 rounded-lg">
        <CardHeader className="bg-gray-100 border-b border-gray-200 py-4 px-6 rounded-t-lg">
          <CardTitle className="text-2xl text-gray-700">Filtros Avançados</CardTitle>
        </CardHeader>
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative">
            <Input
              type="text"
              placeholder="Buscar por nome do produto..."
              value={filtroNome}
              onChange={(e) => setFiltroNome(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
            <SelectTrigger className="text-base border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm">
              <SelectValue placeholder="Filtrar por Categoria" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-300 rounded-md shadow-lg">
              <SelectItem value={ALL_FILTER_VALUE}>Todas as Categorias</SelectItem>
              {categoriasUnicas.map((cat) => (
                <SelectItem key={cat} value={cat} className="text-base hover:bg-gray-100 p-2">
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filtroFornecedor} onValueChange={setFiltroFornecedor}>
            <SelectTrigger className="text-base border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm">
              <SelectValue placeholder="Filtrar por Fornecedor" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-300 rounded-md shadow-lg">
              <SelectItem value={ALL_FILTER_VALUE}>Todos os Fornecedores</SelectItem>
              {fornecedoresUnicos.map((forn) => (
                <SelectItem key={forn} value={forn} className="text-base hover:bg-gray-100 p-2">
                  {forn}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          {
            title: "Produtos Distintos",
            value: kpis.totalProdutosDistintos,
            color: "text-indigo-600",
            icon: "📦",
          },
          {
            title: "Total Unidades Utilizadas",
            value: kpis.totalUnidadesUtilizadas.toLocaleString(),
            color: "text-green-600",
            icon: "📊",
          },
          {
            title: "Produto Mais Utilizado",
            value: kpis.produtoMaisUtilizado,
            color: "text-purple-600",
            icon: "⭐",
            isText: true,
          },
          {
            title: "Baixo Estoque (< Estoque Mín.)",
            value: kpis.produtosBaixoEstoque,
            color: "text-red-600",
            icon: "⚠️",
          },
        ].map((kpi) => (
          <Card
            key={kpi.title}
            className="shadow-lg border border-gray-200 rounded-lg hover:shadow-xl transition-shadow duration-300"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gray-50 rounded-t-lg p-4 border-b border-gray-200">
              <CardTitle className="text-sm font-medium text-gray-600">
                {kpi.title}
              </CardTitle>
              <span className="text-2xl">{kpi.icon}</span>
            </CardHeader>
            <CardContent className="p-4">
              <div
                className={`text-3xl font-bold ${kpi.color} ${
                  kpi.isText ? "truncate" : ""
                }`}
                title={kpi.isText ? kpi.value : ""}
              >
                {kpi.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-10">
        <Card className="lg:col-span-3 shadow-xl border border-gray-200 rounded-lg">
          <CardHeader className="bg-gray-100 border-b border-gray-200 py-4 px-6 rounded-t-lg">
            <CardTitle className="text-xl text-gray-700">
              Top 10 Produtos Mais Utilizados (por Quantidade)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 h-[400px]">
            {produtosFiltrados.length > 0 ? (
              <Bar
                data={dadosGraficoBarras}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: { color: "#4b5563" }, // gray-700
                      grid: { color: "#e5e7eb" }, // gray-200
                    },
                    x: {
                      ticks: { color: "#4b5563" },
                      grid: { display: false },
                    },
                  },
                  plugins: {
                    legend: {
                      position: "bottom",
                      labels: { color: "#1f2937" }, // gray-800
                    },
                    tooltip: {
                      backgroundColor: "#1f2937", // gray-800
                      titleColor: "#ffffff",
                      bodyColor: "#ffffff",
                    },
                  },
                }}
              />
            ) : (
              <p className="flex items-center justify-center h-full text-center text-gray-500">
                Nenhum dado para exibir no gráfico de barras.
              </p>
            )}
          </CardContent>
        </Card>
        <Card className="lg:col-span-2 shadow-xl border border-gray-200 rounded-lg">
          <CardHeader className="bg-gray-100 border-b border-gray-200 py-4 px-6 rounded-t-lg">
            <CardTitle className="text-xl text-gray-700">
              Distribuição por Categoria (Unidades)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 h-[400px]">
            {produtosFiltrados.length > 0 &&
            dadosGraficoPizza.datasets[0].data.some((d) => d > 0) ? (
              <Pie
                data={dadosGraficoPizza}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "bottom",
                      labels: { color: "#1f2937" }, // gray-800
                    },
                    tooltip: {
                      backgroundColor: "#1f2937", // gray-800
                      titleColor: "#ffffff",
                      bodyColor: "#ffffff",
                    },
                  },
                }}
              />
            ) : (
              <p className="flex items-center justify-center h-full text-center text-gray-500">
                Nenhum dado para exibir no gráfico de pizza.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Produtos */}
      <Card className="shadow-xl border border-gray-200 rounded-lg">
        <CardHeader className="bg-gray-100 border-b border-gray-200 py-4 px-6 rounded-t-lg">
          <CardTitle className="text-xl text-gray-700">
            Lista Detalhada de Produtos
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {produtosFiltrados.length > 0 ? (
            <div className="overflow-x-auto">
              <Table className="min-w-full divide-y divide-gray-200">
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    {[
                      { label: "Nome", field: "nome" },
                      { label: "Categoria", field: "categoria" },
                      { label: "Fornecedor", field: "fornecedor" },
                      { label: "Qtd. Utilizada", field: "quantidadeUtilizada", numeric: true },
                      { label: "Estoque Atual", field: "estoqueAtual", numeric: true },
                      { label: "Status Estoque", field: "statusEstoque", noSort: true },
                    ].map((header) => (
                      <TableHead
                        key={header.field}
                        onClick={() => !header.noSort && handleSort(header.field)}
                        className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                          !header.noSort ? "cursor-pointer hover:bg-gray-200" : ""
                        } ${header.numeric ? "text-right" : ""}`}
                      >
                        {header.label}{" "}
                        {ordenacao.campo === header.field &&
                          !header.noSort &&
                          (ordenacao.direcao === "asc" ? "▲" : "▼")}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody className="bg-white divide-y divide-gray-200">
                  {produtosFiltrados.map((produto) => (
                    <TableRow key={produto.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {produto.nome}
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {produto.categoria}
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {produto.fornecedor}
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        {produto.quantidadeUtilizada.toLocaleString()}
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        {produto.estoqueAtual.toLocaleString()}
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm">
                        {getStockStatus(produto)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-center text-gray-500 py-12">
              Nenhum produto encontrado com os filtros aplicados.
            </p>
          )}
        </CardContent>
      </Card>

      <footer className="mt-16 mb-8 text-center">
        <Link href="/" passHref>
          <Button
            variant="secondary"
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 border border-gray-300 rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
              />
            </svg>
            Voltar para o Início
          </Button>
        </Link>
      </footer>
    </div>
  );
}
