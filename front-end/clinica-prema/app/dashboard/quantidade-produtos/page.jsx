"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Search, Package, AlertTriangle, CheckCircle2, Archive, ListFilter, ChevronsUpDown, ChevronUp, ChevronDown, Info, DollarSign } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Mock Data para Produtos e Estoque
const mockProdutosEstoque = [
  { id: 1, nome: 'Seringa Descartável 5ml', categoria: 'Descartáveis', fornecedor: 'Fornecedor A', estoqueAtual: 200, estoqueMinimo: 100, unidade: 'un', ultimaEntrada: '2025-05-15', valorUnitario: 1.50 },
  { id: 2, nome: 'Luvas Cirúrgicas (Par)', categoria: 'EPIs', fornecedor: 'Fornecedor B', estoqueAtual: 50, estoqueMinimo: 80, unidade: 'par', ultimaEntrada: '2025-05-10', valorUnitario: 3.00 },
  { id: 3, nome: 'Gaze Estéril (Pacote)', categoria: 'Curativos', fornecedor: 'Fornecedor A', estoqueAtual: 150, estoqueMinimo: 50, unidade: 'pct', ultimaEntrada: '2025-05-20', valorUnitario: 5.20 },
  { id: 4, nome: 'Álcool 70% (Litro)', categoria: 'Antissépticos', fornecedor: 'Fornecedor C', estoqueAtual: 30, estoqueMinimo: 20, unidade: 'L', ultimaEntrada: '2025-04-25', valorUnitario: 12.00 },
  { id: 5, nome: 'Agulha Hipodérmica 25G', categoria: 'Descartáveis', fornecedor: 'Fornecedor B', estoqueAtual: 300, estoqueMinimo: 150, unidade: 'un', ultimaEntrada: '2025-05-15', valorUnitario: 0.80 },
  { id: 6, nome: 'Máscara N95', categoria: 'EPIs', fornecedor: 'Fornecedor D', estoqueAtual: 90, estoqueMinimo: 60, unidade: 'un', ultimaEntrada: '2025-05-01', valorUnitario: 4.50 },
  { id: 7, nome: 'Fio de Sutura Nylon 3-0', categoria: 'Cirúrgicos', fornecedor: 'Fornecedor A', estoqueAtual: 40, estoqueMinimo: 30, unidade: 'un', ultimaEntrada: '2025-04-10', valorUnitario: 15.75 },
  { id: 8, nome: 'Compressa de Algodão', categoria: 'Curativos', fornecedor: 'Fornecedor C', estoqueAtual: 120, estoqueMinimo: 70, unidade: 'pct', ultimaEntrada: '2025-05-18', valorUnitario: 6.00 },
  { id: 9, nome: 'Cateter Intravenoso 20G', categoria: 'Acesso Venoso', fornecedor: 'Fornecedor B', estoqueAtual: 60, estoqueMinimo: 40, unidade: 'un', ultimaEntrada: '2025-05-05', valorUnitario: 2.50 },
  { id: 10, nome: 'Esparadrapo Micropore', categoria: 'Curativos', fornecedor: 'Fornecedor D', estoqueAtual: 180, estoqueMinimo: 90, unidade: 'rolo', ultimaEntrada: '2025-05-22', valorUnitario: 8.30 },
  { id: 11, nome: 'Soro Fisiológico 0.9% 500ml', categoria: 'Soluções', fornecedor: 'Fornecedor A', estoqueAtual: 100, estoqueMinimo: 50, unidade: 'frasco', ultimaEntrada: '2025-05-12', valorUnitario: 4.00 },
  { id: 12, nome: 'Abaixador de Língua (Pct c/100)', categoria: 'Descartáveis', fornecedor: 'Fornecedor E', estoqueAtual: 250, estoqueMinimo: 100, unidade: 'pct', ultimaEntrada: '2025-05-08', valorUnitario: 7.50 },
  { id: 13, nome: 'Termômetro Digital', categoria: 'Equipamentos', fornecedor: 'Fornecedor E', estoqueAtual: 15, estoqueMinimo: 10, unidade: 'un', ultimaEntrada: '2025-03-20', valorUnitario: 25.00 },
  { id: 14, nome: 'Oxímetro de Pulso', categoria: 'Equipamentos', fornecedor: 'Fornecedor D', estoqueAtual: 8, estoqueMinimo: 5, unidade: 'un', ultimaEntrada: '2025-04-15', valorUnitario: 120.00 },
  { id: 15, nome: 'Lençol Descartável (Rolo)', categoria: 'Descartáveis', fornecedor: 'Fornecedor A', estoqueAtual: 25, estoqueMinimo: 15, unidade: 'rolo', ultimaEntrada: '2025-05-19', valorUnitario: 35.00 },
];

const categoriasUnicas = [...new Set(mockProdutosEstoque.map(p => p.categoria))];
const STATUS_ESTOQUE_OPTIONS = [
  { value: 'todos', label: 'Todos os Status' },
  { value: 'ok', label: 'OK' },
  { value: 'atencao', label: 'Atenção' },
  { value: 'baixo', label: 'Baixo Estoque' },
];

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function QuantidadeProdutosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoria, setSelectedCategoria] = useState('todos');
  const [selectedStatusEstoque, setSelectedStatusEstoque] = useState('todos');
  const [sortConfig, setSortConfig] = useState({ key: 'estoqueAtual', direction: 'ascending' });

  const getStatusProduto = (produto) => {
    if (produto.estoqueAtual < produto.estoqueMinimo) return 'baixo';
    if (produto.estoqueAtual < produto.estoqueMinimo * 1.2) return 'atencao';
    return 'ok';
  };

  const filteredAndSortedProdutos = useMemo(() => {
    let items = mockProdutosEstoque
      .filter(produto => 
        produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategoria === 'todos' || produto.categoria === selectedCategoria) &&
        (selectedStatusEstoque === 'todos' || getStatusProduto(produto) === selectedStatusEstoque)
      );

    if (sortConfig.key) {
      items.sort((a, b) => {
        let valA = a[sortConfig.key];
        let valB = b[sortConfig.key];

        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();

        if (valA < valB) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return items;
  }, [searchTerm, selectedCategoria, selectedStatusEstoque, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
      direction = 'ascending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />;
    }
    return <ChevronsUpDown className="ml-1 h-4 w-4 opacity-30" />;
  };

  const kpis = useMemo(() => {
    const totalItens = mockProdutosEstoque.length;
    const valorTotalEstoque = mockProdutosEstoque.reduce((sum, p) => sum + (p.estoqueAtual * p.valorUnitario), 0);
    const itensBaixoEstoque = mockProdutosEstoque.filter(p => getStatusProduto(p) === 'baixo').length;
    const itensEmAtencao = mockProdutosEstoque.filter(p => getStatusProduto(p) === 'atencao').length;
    return { totalItens, valorTotalEstoque, itensBaixoEstoque, itensEmAtencao };
  }, [mockProdutosEstoque]);

  const renderStatusEstoque = (produto) => {
    const status = getStatusProduto(produto);
    if (status === 'baixo') {
      return <span className="flex items-center text-red-600"><AlertTriangle className="mr-1 h-4 w-4" /> Baixo</span>;
    }
    if (status === 'atencao') {
      return <span className="flex items-center text-yellow-600"><Info className="mr-1 h-4 w-4" /> Atenção</span>;
    }
    return <span className="flex items-center text-green-600"><CheckCircle2 className="mr-1 h-4 w-4" /> OK</span>;
  };

  return (
    <div className="container mx-auto p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center"><Archive className="mr-3 h-8 w-8 text-indigo-600"/>Inventário de Produtos</h1>
        <Link href="/" passHref>
          <Button variant="outline" className="bg-white">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para o Início
          </Button>
        </Link>
      </div>

      {/* Filtros */}
      <Card className="mb-8 shadow-sm">
        <CardHeader className="bg-gray-100 border-b">
          <CardTitle className="text-lg flex items-center text-gray-700"><ListFilter className="mr-2 h-5 w-5" />Filtros e Ordenação</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="relative">
              <label htmlFor="searchNome" className="block text-sm font-medium text-gray-700 mb-1">Nome do Produto</label>
              <Search className="absolute left-3 top-9 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input 
                id="searchNome"
                type="text" 
                placeholder="Buscar por nome..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div>
              <label htmlFor="selectCategoria" className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
              <Select value={selectedCategoria} onValueChange={setSelectedCategoria} id="selectCategoria">
                <SelectTrigger>
                  <SelectValue placeholder="Todas as Categorias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas as Categorias</SelectItem>
                  {categoriasUnicas.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="selectStatus" className="block text-sm font-medium text-gray-700 mb-1">Status do Estoque</label>
              <Select value={selectedStatusEstoque} onValueChange={setSelectedStatusEstoque} id="selectStatus">
                <SelectTrigger>
                  <SelectValue placeholder="Todos os Status" />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_ESTOQUE_OPTIONS.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total de Itens Únicos</CardTitle>
            <Package className="h-5 w-5 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">{kpis.totalItens}</div>
            <p className="text-xs text-muted-foreground">Tipos diferentes de produtos</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Valor Total em Estoque</CardTitle>
            <DollarSign className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">R$ {kpis.valorTotalEstoque.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            <p className="text-xs text-muted-foreground">Soma do valor (qtd x preço)</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Itens com Baixo Estoque</CardTitle>
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{kpis.itensBaixoEstoque}</div>
            <p className="text-xs text-muted-foreground">Abaixo do estoque mínimo</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Itens em Atenção</CardTitle>
            <Info className="h-5 w-5 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{kpis.itensEmAtencao}</div>
            <p className="text-xs text-muted-foreground">Próximo ao estoque mínimo</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Produtos em Estoque */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gray-100 border-b">
          <CardTitle className="text-xl text-gray-700">Lista de Produtos em Estoque</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredAndSortedProdutos.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  {['nome', 'categoria', 'fornecedor', 'estoqueAtual', 'estoqueMinimo', 'unidade', 'ultimaEntrada', 'valorUnitario'].map((key) => (
                    <TableHead 
                      key={key} 
                      className={`py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200 ${key === 'estoqueAtual' || key === 'estoqueMinimo' || key === 'valorUnitario' ? 'text-right' : ''}`}
                      onClick={() => requestSort(key)}
                    >
                      <div className={`flex items-center ${key === 'estoqueAtual' || key === 'estoqueMinimo' || key === 'valorUnitario' ? 'justify-end' : ''}`}>
                        {key === 'nome' ? 'Produto' : 
                         key === 'estoqueAtual' ? 'Qtd. Atual' : 
                         key === 'estoqueMinimo' ? 'Qtd. Mín.' : 
                         key === 'ultimaEntrada' ? 'Últ. Entrada' : 
                         key === 'valorUnitario' ? 'Val. Unit.' : 
                         key.charAt(0).toUpperCase() + key.slice(1)}
                        {getSortIndicator(key)}
                      </div>
                    </TableHead>
                  ))}
                  <TableHead className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedProdutos.map((produto) => (
                  <TableRow key={produto.id} className="border-b hover:bg-gray-50 transition-colors">
                    <TableCell className="py-3 px-4 font-medium text-gray-800 whitespace-nowrap">{produto.nome}</TableCell>
                    <TableCell className="py-3 px-4 text-gray-600 whitespace-nowrap">{produto.categoria}</TableCell>
                    <TableCell className="py-3 px-4 text-gray-600 whitespace-nowrap">{produto.fornecedor}</TableCell>
                    <TableCell className="py-3 px-4 text-gray-600 text-right whitespace-nowrap">{produto.estoqueAtual.toLocaleString()}</TableCell>
                    <TableCell className="py-3 px-4 text-gray-600 text-right whitespace-nowrap">{produto.estoqueMinimo.toLocaleString()}</TableCell>
                    <TableCell className="py-3 px-4 text-gray-600 whitespace-nowrap">{produto.unidade}</TableCell>
                    <TableCell className="py-3 px-4 text-gray-600 whitespace-nowrap">{new Date(produto.ultimaEntrada).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell className="py-3 px-4 text-gray-600 text-right whitespace-nowrap">R$ {produto.valorUnitario.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                    <TableCell className="py-3 px-4 whitespace-nowrap">{renderStatusEstoque(produto)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center text-gray-500 py-12">
              <Archive className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-lg font-semibold">Nenhum produto encontrado.</p>
              <p className="text-sm">Tente ajustar os filtros ou adicione novos produtos ao inventário.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
