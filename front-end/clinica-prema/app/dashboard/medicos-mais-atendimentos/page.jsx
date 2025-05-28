"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, BarChartHorizontalBig, Filter, CalendarIcon, Users } from "lucide-react"
import Link from "next/link"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";

// Mock de dados de médicos e atendimentos - SIMULANDO TOP 5 VINDO DO BACKEND
const gerarTop5MedicosMock = (ano, mes) => {
  // Simula que o backend retorna uma lista de objetos com 'nome' e 'total'
  const medicosTop = [
    { nome: "Dr. Carlos Mendes", total: Math.floor(Math.random() * 50) + 20 },
    { nome: "Dra. Ana Souza", total: Math.floor(Math.random() * 40) + 15 },
    { nome: "Dr. Paulo Ribeiro", total: Math.floor(Math.random() * 30) + 10 },
    { nome: "Dra. Carla Santos", total: Math.floor(Math.random() * 25) + 8 },
    { nome: "Dr. João Silva", total: Math.floor(Math.random() * 20) + 5 },
  ];
  // Ordena por total para garantir que é o top 5
  return medicosTop.sort((a, b) => b.total - a.total);
};


export default function MedicosMaisAtendimentosPage() {
  const [anoSelecionado, setAnoSelecionado] = useState(new Date().getFullYear().toString());
  const [mesSelecionado, setMesSelecionado] = useState((new Date().getMonth() + 1).toString().padStart(2, '0'));
  const [dadosProcessados, setDadosProcessados] = useState([]); // Estado para os dados que vêm do backend (Top 5)
  const [loadingDados, setLoadingDados] = useState(false);

  const anos = Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() - 5 + i).toString());
  const meses = [
    { value: "01", label: "Janeiro" }, { value: "02", label: "Fevereiro" }, { value: "03", label: "Março" },
    { value: "04", label: "Abril" }, { value: "05", label: "Maio" }, { value: "06", label: "Junho" },
    { value: "07", label: "Julho" }, { value: "08", label: "Agosto" }, { value: "09", label: "Setembro" },
    { value: "10", label: "Outubro" }, { value: "11", label: "Novembro" }, { value: "12", label: "Dezembro" },
  ];

  useEffect(() => {
    setLoadingDados(true);
    // Simula uma chamada de API que retorna o Top 5
    setTimeout(() => {
      const top5Simulado = gerarTop5MedicosMock(parseInt(anoSelecionado), parseInt(mesSelecionado));
      setDadosProcessados(top5Simulado);
      setLoadingDados(false);
    }, 700);
  }, [anoSelecionado, mesSelecionado]);

  const mesLabel = meses.find(m => m.value === mesSelecionado)?.label || "";

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Top 5 Médicos com Mais Atendimentos</h1>
            <p className="text-gray-500 mt-1">Ranking dos 5 médicos com mais atendimentos no período selecionado.</p>
          </div>
          <Link href="/">
            <Button variant="outline" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar para o Início</span>
            </Button>
          </Link>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Filter className="h-5 w-5 mr-2 text-gray-600" />
              Filtrar por Período
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div>
              <label htmlFor="ano" className="block text-sm font-medium text-gray-700 mb-1">Ano</label>
              <Select value={anoSelecionado} onValueChange={setAnoSelecionado}>
                <SelectTrigger id="ano">
                  <SelectValue placeholder="Selecione o Ano" />
                </SelectTrigger>
                <SelectContent>
                  {anos.map(ano => <SelectItem key={ano} value={ano}>{ano}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="mes" className="block text-sm font-medium text-gray-700 mb-1">Mês</label>
              <Select value={mesSelecionado} onValueChange={setMesSelecionado}>
                <SelectTrigger id="mes">
                  <SelectValue placeholder="Selecione o Mês" />
                </SelectTrigger>
                <SelectContent>
                  {meses.map(mes => <SelectItem key={mes.value} value={mes.value}>{mes.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {loadingDados ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500 text-lg">Carregando dados dos médicos...</p>
          </div>
        ) : dadosProcessados.length > 0 ? (
          <div className="grid grid-cols-1 gap-8">
            <div>
              <Card className="shadow-xl h-full">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center text-indigo-700">
                    <BarChartHorizontalBig className="h-6 w-6 mr-2" />
                    Ranking de Atendimentos ({mesLabel} de {anoSelecionado})
                  </CardTitle>
                  <CardDescription>Top 5 médicos com maior número de atendimentos registrados.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{ total: { label: "Atendimentos", color: "hsl(var(--chart-2))" } }} className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      {/* Usar dadosProcessados diretamente, que já é o Top 5 */}
                      <BarChart layout="vertical" data={dadosProcessados} margin={{ top: 5, right: 30, left: 120, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" strokeWidth={1} fontSize={12} />
                        <YAxis dataKey="nome" type="category" strokeWidth={1} fontSize={12} width={110} interval={0} />
                        <Tooltip
                          cursor={{ fill: "hsl(var(--muted))" }}
                          content={<ChartTooltipContent hideLabel />}
                        />
                        <Legend content={<ChartLegendContent />} />
                        <Bar dataKey="total" fill="var(--color-total)" radius={[0, 4, 4, 0]} name="Total de Atendimentos" barSize={20} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">Nenhum dado de atendimento encontrado</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Não há registros de atendimentos para o período selecionado ({mesLabel} de {anoSelecionado}).
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
