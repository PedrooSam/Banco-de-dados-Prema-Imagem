"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Search, Package, ChevronsUpDown, ChevronUp, ChevronDown } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Mock Data para Produtos - Simplificado para nome e quantidade
const mockProdutosEstoque = [
  { id: 1, nome: 'Seringa Descartável 5ml', quantidade: 200 },
  { id: 2, nome: 'Luvas Cirúrgicas (Par)', quantidade: 50 },
  { id: 3, nome: 'Gaze Estéril (Pacote)', quantidade: 150 },
  { id: 4, nome: 'Álcool 70% (Litro)', quantidade: 30 },
  { id: 5, nome: 'Agulha Hipodérmica 25G', quantidade: 300 },
  { id: 6, nome: 'Máscara N95', quantidade: 90 },
  { id: 7, nome: 'Fio de Sutura Nylon 3-0', quantidade: 40 },
  { id: 8, nome: 'Compressa de Algodão', quantidade: 120 },
  { id: 9, nome: 'Cateter Intravenoso 20G', quantidade: 60 },
  { id: 10, nome: 'Esparadrapo Micropore', quantidade: 180 },
  { id: 11, nome: 'Soro Fisiológico 0.9% 500ml', quantidade: 100 },
  { id: 12, nome: 'Abaixador de Língua (Pct c/100)', quantidade: 250 },
  { id: 13, nome: 'Termômetro Digital', quantidade: 15 },
  { id: 14, nome: 'Oxímetro de Pulso', quantidade: 8 },
  { id: 15, nome: 'Lençol Descartável (Rolo)', quantidade: 25 },
];

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function QuantidadeProdutosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'quantidade', direction: 'descending' }); // Ordenar por quantidade por padrão

  const filteredAndSortedProdutos = useMemo(() => {
    let items = mockProdutosEstoque
      .filter(produto => 
        produto.nome.toLowerCase().includes(searchTerm.toLowerCase())
        // Removidos filtros de categoria e status
      );

    if (sortConfig.key) {
      items.sort((a, b) => {
        let valA = a[sortConfig.key];
        let valB = b[sortConfig.key];

        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();
        
        // Tratamento para números, caso a chave seja 'quantidade'
        if (sortConfig.key === 'quantidade') {
            valA = Number(valA);
            valB = Number(valB);
        }

        if (valA < valB) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return items;
  }, [searchTerm, sortConfig]); // Removido selectedCategoria e selectedStatusEstoque das dependências

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

  // KPIs simplificados para mostrar apenas o total de tipos de itens
  const kpis = useMemo(() => {
    const totalItens = mockProdutosEstoque.length;
    // Removidos valorTotalEstoque, itensBaixoEstoque, itensEmAtencao
    return { totalItens };
  }, [mockProdutosEstoque]);

  // Removida a função renderStatusEstoque

  return (
    <div className="container mx-auto p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center"><Package className="mr-3 h-8 w-8 text-indigo-600"/>Quantidade de Produtos</h1>
        <Link href="/" passHref>
          <Button variant="outline" className="bg-white hover:bg-green-600 hover:text-white">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para o Início
          </Button>
        </Link>
      </div>

      {/* Filtros Simplificados */}
      <Card className="mb-8 shadow-sm">
        <CardHeader className="bg-gray-100 border-b">
          <CardTitle className="text-lg flex items-center text-gray-700">Filtro por Nome</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 items-end"> {/* Alterado para grid-cols-1 */}
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
            {/* Removidos filtros de Categoria e Status do Estoque */}
          </div>
        </CardContent>
      </Card>

      {/* KPIs Simplificados */}
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1 mb-8"> {/* Alterado para exibir um único KPI */}
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total de Tipos de Produtos</CardTitle>
            <Package className="h-5 w-5 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">{kpis.totalItens}</div>
            <p className="text-xs text-muted-foreground">Tipos diferentes de produtos cadastrados</p>
          </CardContent>
        </Card>
        {/* Removidos outros KPIs */}
      </div>

      {/* Tabela de Produtos Simplificada */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gray-100 border-b">
          <CardTitle className="text-xl text-gray-700">Lista de Produtos e Suas Quantidades</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredAndSortedProdutos.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  {/* Colunas simplificadas para Nome e Quantidade */}
                  {['nome', 'quantidade'].map((key) => (
                    <TableHead 
                      key={key} 
                      className={`py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200 ${key === 'quantidade' ? 'text-right' : ''}`}
                      onClick={() => requestSort(key)}
                    >
                      <div className={`flex items-center ${key === 'quantidade' ? 'justify-end' : ''}`}>
                        {key === 'nome' ? 'Produto' : 
                         key === 'quantidade' ? 'Quantidade em Estoque' : 
                         key.charAt(0).toUpperCase() + key.slice(1)}
                        {getSortIndicator(key)}
                      </div>
                    </TableHead>
                  ))}
                  {/* Removida coluna de Status */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedProdutos.map((produto) => (
                  <TableRow key={produto.id} className="border-b hover:bg-gray-50 transition-colors">
                    <TableCell className="py-3 px-4 font-medium text-gray-800 whitespace-nowrap">{produto.nome}</TableCell>
                    <TableCell className="py-3 px-4 text-gray-600 text-right whitespace-nowrap">{produto.quantidade.toLocaleString()}</TableCell>
                    {/* Removidas outras células da tabela */}
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
