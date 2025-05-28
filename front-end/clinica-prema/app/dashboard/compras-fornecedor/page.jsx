"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Search, 
  Truck, 
  Package, 
  CalendarDays, 
  FilterX,
  TrendingUp,
  TrendingDown,
  Minus,
  DollarSign,
  ShoppingCart,
  Building2,
  Calendar,
  Filter
} from "lucide-react";

// Mock data - dados simulados para demonstração
const mockFornecedores = [
  { id: "forn001", nome: "MedSupply Ltda", categoria: "Medicamentos", cidade: "São Paulo", ativo: true },
  { id: "forn002", nome: "EquipMed Brasil", categoria: "Equipamentos", cidade: "Rio de Janeiro", ativo: true },
  { id: "forn003", nome: "Suprimentos Médicos SA", categoria: "Suprimentos", cidade: "Belo Horizonte", ativo: true },
  { id: "forn004", nome: "Pharma Distribuidora", categoria: "Medicamentos", cidade: "São Paulo", ativo: true },
  { id: "forn005", nome: "Tech Medical", categoria: "Equipamentos", cidade: "Curitiba", ativo: false },
  { id: "forn006", nome: "Laboratório Supplies", categoria: "Reagentes", cidade: "Salvador", ativo: true },
  { id: "forn007", nome: "Instrumental Cirúrgico", categoria: "Instrumentos", cidade: "Porto Alegre", ativo: true },
  { id: "forn008", nome: "Descartáveis Medical", categoria: "Descartáveis", cidade: "Fortaleza", ativo: true },
];

const mockProdutos = [
  { id: "prod001", nome: "Seringa 10ml", fornecedorId: "forn001", categoria: "Descartáveis", preco: 2.50 },
  { id: "prod002", nome: "Ultrassom Portátil", fornecedorId: "forn002", categoria: "Equipamentos", preco: 15000.00 },
  { id: "prod003", nome: "Luvas Nitrilo (cx)", fornecedorId: "forn003", categoria: "Suprimentos", preco: 45.00 },
  { id: "prod004", nome: "Dipirona 500mg", fornecedorId: "forn004", categoria: "Medicamentos", preco: 12.80 },
  { id: "prod005", nome: "Monitor Cardíaco", fornecedorId: "forn002", categoria: "Equipamentos", preco: 8500.00 },
  { id: "prod006", nome: "Reagente Glicose", fornecedorId: "forn006", categoria: "Reagentes", preco: 89.90 },
  { id: "prod007", nome: "Bisturi Descartável", fornecedorId: "forn007", categoria: "Instrumentos", preco: 3.20 },
  { id: "prod008", nome: "Máscara N95 (cx)", fornecedorId: "forn008", categoria: "Descartáveis", preco: 120.00 },
];

const mockCompras = [
  { id: "comp001", fornecedorId: "forn001", produtoId: "prod001", data: "2024-01-15", quantidade: 500, valorUnitario: 2.50, notaFiscal: "NF001" },
  { id: "comp002", fornecedorId: "forn002", produtoId: "prod002", data: "2024-01-20", quantidade: 2, valorUnitario: 15000.00, notaFiscal: "NF002" },
  { id: "comp003", fornecedorId: "forn003", produtoId: "prod003", data: "2024-02-01", quantidade: 100, valorUnitario: 45.00, notaFiscal: "NF003" },
  { id: "comp004", fornecedorId: "forn004", produtoId: "prod004", data: "2024-02-05", quantidade: 200, valorUnitario: 12.80, notaFiscal: "NF004" },
  { id: "comp005", fornecedorId: "forn002", produtoId: "prod005", data: "2024-02-10", quantidade: 3, valorUnitario: 8500.00, notaFiscal: "NF005" },
  { id: "comp006", fornecedorId: "forn006", produtoId: "prod006", data: "2024-02-15", quantidade: 50, valorUnitario: 89.90, notaFiscal: "NF006" },
  { id: "comp007", fornecedorId: "forn001", produtoId: "prod001", data: "2024-03-01", quantidade: 300, valorUnitario: 2.40, notaFiscal: "NF007" },
  { id: "comp008", fornecedorId: "forn007", produtoId: "prod007", data: "2024-03-05", quantidade: 1000, valorUnitario: 3.20, notaFiscal: "NF008" },
  { id: "comp009", fornecedorId: "forn008", produtoId: "prod008", data: "2024-03-10", quantidade: 25, valorUnitario: 120.00, notaFiscal: "NF009" },
  { id: "comp010", fornecedorId: "forn003", produtoId: "prod003", data: "2024-04-01", quantidade: 150, valorUnitario: 44.50, notaFiscal: "NF010" },
  { id: "comp011", fornecedorId: "forn004", produtoId: "prod004", data: "2024-04-10", quantidade: 300, valorUnitario: 12.60, notaFiscal: "NF011" },
  { id: "comp012", fornecedorId: "forn006", produtoId: "prod006", data: "2024-04-15", quantidade: 75, valorUnitario: 88.90, notaFiscal: "NF012" },
  { id: "comp013", fornecedorId: "forn002", produtoId: "prod002", data: "2024-05-01", quantidade: 1, valorUnitario: 14800.00, notaFiscal: "NF013" },
  { id: "comp014", fornecedorId: "forn001", produtoId: "prod001", data: "2024-05-10", quantidade: 400, valorUnitario: 2.45, notaFiscal: "NF014" },
  { id: "comp015", fornecedorId: "forn008", produtoId: "prod008", data: "2024-05-15", quantidade: 40, valorUnitario: 118.00, notaFiscal: "NF015" },
];

const categorias = ["Todas", "Medicamentos", "Equipamentos", "Suprimentos", "Reagentes", "Instrumentos", "Descartáveis"];
const cidades = ["Todas", "São Paulo", "Rio de Janeiro", "Belo Horizonte", "Curitiba", "Salvador", "Porto Alegre", "Fortaleza"];

export default function ComprasFornecedorPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFornecedor, setSelectedFornecedor] = useState("all");
  const [selectedCategoria, setSelectedCategoria] = useState("Todas");
  const [selectedCidade, setSelectedCidade] = useState("Todas");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [ordenacao, setOrdenacao] = useState("decrescente");
  const [filteredData, setFilteredData] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [resumoGeral, setResumoGeral] = useState({
    totalCompras: 0,
    totalFornecedores: 0,
    ticketMedio: 0,
    maiorCompra: 0
  });

  useEffect(() => {
    // Simula carregamento dos fornecedores
    setFornecedores(mockFornecedores);
  }, []);

  useEffect(() => {
    // Processa e filtra os dados
    let comprasProcessadas = mockCompras.map(compra => {
      const fornecedor = mockFornecedores.find(f => f.id === compra.fornecedorId);
      const produto = mockProdutos.find(p => p.id === compra.produtoId);
      return {
        ...compra,
        fornecedorNome: fornecedor?.nome || 'N/A',
        fornecedorCategoria: fornecedor?.categoria || 'N/A',
        fornecedorCidade: fornecedor?.cidade || 'N/A',
        fornecedorAtivo: fornecedor?.ativo || false,
        produtoNome: produto?.nome || 'N/A',
        totalCompra: compra.quantidade * compra.valorUnitario,
      };
    });

    // Aplica filtros
    if (searchTerm) {
      comprasProcessadas = comprasProcessadas.filter(
        (compra) =>
          compra.fornecedorNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          compra.produtoNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          compra.notaFiscal.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedFornecedor !== "all") {
      comprasProcessadas = comprasProcessadas.filter((compra) => compra.fornecedorId === selectedFornecedor);
    }

    if (selectedCategoria !== "Todas") {
      comprasProcessadas = comprasProcessadas.filter((compra) => compra.fornecedorCategoria === selectedCategoria);
    }

    if (selectedCidade !== "Todas") {
      comprasProcessadas = comprasProcessadas.filter((compra) => compra.fornecedorCidade === selectedCidade);
    }

    if (startDate) {
      comprasProcessadas = comprasProcessadas.filter((compra) => new Date(compra.data) >= new Date(startDate));
    }

    if (endDate) {
      comprasProcessadas = comprasProcessadas.filter((compra) => new Date(compra.data) <= new Date(endDate));
    }

    // Agrupa por fornecedor e calcula totais
    const groupedData = comprasProcessadas.reduce((acc, compra) => {
      if (!acc[compra.fornecedorId]) {
        acc[compra.fornecedorId] = {
          fornecedorId: compra.fornecedorId,
          fornecedorNome: compra.fornecedorNome,
          fornecedorCategoria: compra.fornecedorCategoria,
          fornecedorCidade: compra.fornecedorCidade,
          fornecedorAtivo: compra.fornecedorAtivo,
          totalVendido: 0,
          totalCompras: 0,
          ultimaCompra: compra.data,
          produtos: new Set(),
        };
      }
      
      acc[compra.fornecedorId].totalVendido += compra.totalCompra;
      acc[compra.fornecedorId].totalCompras += 1;
      acc[compra.fornecedorId].produtos.add(compra.produtoNome);
      
      // Atualiza data da última compra
      if (new Date(compra.data) > new Date(acc[compra.fornecedorId].ultimaCompra)) {
        acc[compra.fornecedorId].ultimaCompra = compra.data;
      }
      
      return acc;
    }, {});

    // Converte para array e calcula métricas adicionais
    let finalData = Object.values(groupedData).map(item => ({
      ...item,
      ticketMedio: item.totalVendido / item.totalCompras,
      quantidadeProdutos: item.produtos.size,
      produtos: Array.from(item.produtos), // Converte Set para Array
    }));

    // Ordena os dados
    finalData.sort((a, b) => {
      if (ordenacao === "decrescente") {
        return b.totalVendido - a.totalVendido;
      } else {
        return a.totalVendido - b.totalVendido;
      }
    });

    setFilteredData(finalData);

    // Calcula resumo geral
    const totalGeral = finalData.reduce((sum, item) => sum + item.totalVendido, 0);
    const totalComprasGeral = finalData.reduce((sum, item) => sum + item.totalCompras, 0);
    const maiorCompraGeral = Math.max(...finalData.map(item => item.totalVendido), 0);

    setResumoGeral({
      totalCompras: totalGeral,
      totalFornecedores: finalData.length,
      ticketMedio: finalData.length > 0 ? totalGeral / totalComprasGeral : 0,
      maiorCompra: maiorCompraGeral
    });

  }, [searchTerm, selectedFornecedor, selectedCategoria, selectedCidade, startDate, endDate, ordenacao]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedFornecedor("all");
    setSelectedCategoria("Todas");
    setSelectedCidade("Todas");
    setStartDate("");
    setEndDate("");
    setOrdenacao("decrescente");
  };

  const formatCurrency = (value) => {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  const formatDate = (dateString) => {
    return new Date(dateString + 'T00:00:00').toLocaleDateString('pt-BR');
  };

  const getStatusBadge = (ativo) => {
    return ativo ? (
      <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
        Ativo
      </Badge>
    ) : (
      <Badge variant="secondary" className="bg-red-100 text-red-800 border-red-200">
        Inativo
      </Badge>
    );
  };

  const getTrendIcon = (index) => {
    if (index === 0) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (index === 1) return <TrendingUp className="h-4 w-4 text-yellow-600" />;
    if (index === 2) return <Minus className="h-4 w-4 text-orange-600" />;
    return <TrendingDown className="h-4 w-4 text-red-600" />;
  };

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
                  Compras por Fornecedor
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Análise detalhada de vendas por fornecedor
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 md:p-6 space-y-6">
        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-lg border-l-4 border-l-green-500 hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total em Compras</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(resumoGeral.totalCompras)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-l-4 border-l-blue-500 hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Fornecedores Ativos</p>
                  <p className="text-2xl font-bold text-blue-600">{resumoGeral.totalFornecedores}</p>
                </div>
                <Building2 className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-l-4 border-l-purple-500 hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Ticket Médio</p>
                  <p className="text-2xl font-bold text-purple-600">{formatCurrency(resumoGeral.ticketMedio)}</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-l-4 border-l-orange-500 hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Maior Compra</p>
                  <p className="text-2xl font-bold text-orange-600">{formatCurrency(resumoGeral.maiorCompra)}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card className="shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-orange-600" />
              <CardTitle className="text-lg">Filtros Avançados</CardTitle>
            </div>
            <CardDescription>Refine sua análise com filtros detalhados.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
              {/* Pesquisa */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Pesquisa Geral
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Fornecedor, produto ou NF..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>

              {/* Fornecedor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Fornecedor
                </label>
                <Select value={selectedFornecedor} onValueChange={setSelectedFornecedor}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Fornecedores</SelectItem>
                    {fornecedores.map((fornecedor) => (
                      <SelectItem key={fornecedor.id} value={fornecedor.id}>
                        {fornecedor.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Categoria */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Categoria
                </label>
                <Select value={selectedCategoria} onValueChange={setSelectedCategoria}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    {categorias.map((categoria) => (
                      <SelectItem key={categoria} value={categoria}>
                        {categoria}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Cidade */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cidade
                </label>
                <Select value={selectedCidade} onValueChange={setSelectedCidade}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    {cidades.map((cidade) => (
                      <SelectItem key={cidade} value={cidade}>
                        {cidade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Ordenação */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Ordenação
                </label>
                <Select value={ordenacao} onValueChange={setOrdenacao}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="decrescente">Maior → Menor</SelectItem>
                    <SelectItem value="crescente">Menor → Maior</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Filtros de Data */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Data Inicial
                </label>
                <div className="relative">
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="pl-10"
                  />
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Data Final
                </label>
                <div className="relative">
                  <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="pl-10"
                  />
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div className="flex items-end">
                <Button onClick={clearFilters} variant="outline" className="w-full">
                  <FilterX className="mr-2 h-4 w-4" /> 
                  Limpar Todos os Filtros
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Resultados */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Truck className="h-5 w-5 text-orange-600" />
              Ranking de Fornecedores
            </CardTitle>
            <CardDescription>
              {filteredData.length} fornecedor(es) encontrado(s), ordenado(s) por valor total {ordenacao === "decrescente" ? "decrescente" : "crescente"}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredData.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 dark:bg-gray-800">
                      <TableHead className="w-[60px]">Pos.</TableHead>
                      <TableHead className="min-w-[200px]">Fornecedor</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Cidade</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-center">Compras</TableHead>
                      <TableHead className="text-center">Produtos</TableHead>
                      <TableHead>Última Compra</TableHead>
                      <TableHead className="text-right min-w-[120px]">Ticket Médio</TableHead>
                      <TableHead className="text-right min-w-[140px]">Total Vendido</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((fornecedor, index) => (
                      <TableRow key={fornecedor.fornecedorId} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            {getTrendIcon(index)}
                            {index + 1}º
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-gray-500" />
                            {fornecedor.fornecedorNome}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {fornecedor.fornecedorCategoria}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                          {fornecedor.fornecedorCidade}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(fornecedor.fornecedorAtivo)}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="secondary" className="text-xs">
                            {fornecedor.totalCompras}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Package className="h-4 w-4 text-gray-500" />
                            {fornecedor.quantidadeProdutos}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <CalendarDays className="h-4 w-4 text-gray-500" />
                            {formatDate(fornecedor.ultimaCompra)}
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {formatCurrency(fornecedor.ticketMedio)}
                        </TableCell>
                        <TableCell className="text-right font-bold text-lg">
                          {formatCurrency(fornecedor.totalVendido)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <div className="flex flex-col items-center gap-4">
                  <Truck className="h-16 w-16 text-gray-300 dark:text-gray-600" />
                  <div>
                    <p className="text-xl font-semibold mb-2">Nenhum fornecedor encontrado</p>
                    <p className="text-sm">Tente ajustar os filtros ou verifique se há dados de compras disponíveis para o período selecionado.</p>
                  </div>
                  <Button onClick={clearFilters} variant="outline" className="mt-4">
                    <FilterX className="mr-2 h-4 w-4" />
                    Limpar Filtros
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          © {new Date().getFullYear()} Clínica Prema. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}