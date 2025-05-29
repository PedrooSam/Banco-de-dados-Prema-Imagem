"use client";

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Search, Package, ChevronsUpDown, ChevronUp, ChevronDown, Archive } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function QuantidadeProdutosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'quantidade', direction: 'descending' });
  const [produtos, setProdutos] = useState([]); // Estado para dados do backend
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState(null); // Estado de erro

  useEffect(() => {
    const fetchProdutos = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:8080/api/dashboard/quantidade-produtos");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // Backend retorna [{ nome: string, quantidade: number }]
        setProdutos(data);
      } catch (e) {
        console.error("Falha ao buscar dados de quantidade de produtos:", e);
        setError("Não foi possível carregar os dados. Tente novamente mais tarde.");
        setProdutos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  const filteredAndSortedProdutos = useMemo(() => {
    let items = produtos // Usar dados do estado 'produtos'
      .filter(produto => 
        produto.nome.toLowerCase().includes(searchTerm.toLowerCase())
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
  }, [searchTerm, sortConfig, produtos]); // Adicionado 'produtos' como dependência

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
    const totalItens = produtos.length; // Usar dados do estado 'produtos'
    return { totalItens };
  }, [produtos]); // Adicionado 'produtos' como dependência

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
            {loading && <p className="text-xs text-muted-foreground">Carregando...</p>}
            {error && <p className="text-xs text-red-500">Erro ao carregar KPI</p>}
            {!loading && !error && (
              <>
                <div className="text-2xl font-bold text-gray-800">{kpis.totalItens}</div>
                <p className="text-xs text-muted-foreground">Tipos diferentes de produtos cadastrados</p>
              </>
            )}
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
          {loading && (
            <div className="text-center text-gray-500 py-12">
              <Package className="mx-auto h-12 w-12 text-gray-400 mb-4 animate-pulse" />
              <p className="text-lg font-semibold">Carregando produtos...</p>
            </div>
          )}
          {error && (
            <div className="text-center text-red-500 py-12">
              <Archive className="mx-auto h-12 w-12 text-red-400 mb-4" />
              <p className="text-lg font-semibold">Erro ao carregar produtos</p>
              <p className="text-sm">{error}</p>
            </div>
          )}
          {!loading && !error && filteredAndSortedProdutos.length > 0 ? (
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
            !loading && !error && ( // Apenas mostrar se não estiver carregando e sem erro
              <div className="text-center text-gray-500 py-12">
                <Archive className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-lg font-semibold">Nenhum produto encontrado.</p>
                <p className="text-sm">Não há produtos cadastrados ou eles não correspondem aos filtros aplicados.</p>
              </div>
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
}
