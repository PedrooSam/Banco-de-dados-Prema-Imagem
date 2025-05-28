"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, UserCheck, BarChartHorizontalBig, Filter, CalendarIcon, Users } from "lucide-react"
import Link from "next/link"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";

// Mock de dados de médicos e atendimentos
const todosMedicos = [
  { id: "m1", nome: "Dr. Carlos Mendes" },
  { id: "m2", nome: "Dra. Ana Souza" },
  { id: "m3", nome: "Dr. Paulo Ribeiro" },
  { id: "m4", nome: "Dra. Carla Santos" },
  { id: "m5", nome: "Dr. João Silva" },
  { id: "m6", nome: "Dra. Mariana Lima" },
];

const gerarAtendimentosMock = (ano, mes) => {
  const atendimentos = [];
  const numAtendimentos = Math.floor(Math.random() * 150) + 50; // Entre 50 e 200 atendimentos no mês
  for (let i = 0; i < numAtendimentos; i++) {
    const medico = todosMedicos[Math.floor(Math.random() * todosMedicos.length)];
    atendimentos.push({
      id: `at${i}-${ano}-${mes}`,
      medicoId: medico.id,
      medicoNome: medico.nome,
      data: new Date(ano, mes - 1, Math.floor(Math.random() * 28) + 1), // Dia aleatório no mês
      tipoExame: `Exame ${String.fromCharCode(65 + Math.floor(Math.random() * 5))}` // Exame A, B, C, D, E
    });
  }
  return atendimentos;
};


export default function MedicosMaisAtendimentosPage() {
  const [anoSelecionado, setAnoSelecionado] = useState(new Date().getFullYear().toString());
  const [mesSelecionado, setMesSelecionado] = useState((new Date().getMonth() + 1).toString().padStart(2, '0'));
  const [dadosAtendimentos, setDadosAtendimentos] = useState([]);
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
    // Simula uma chamada de API
    setTimeout(() => {
      const atendimentosSimulados = gerarAtendimentosMock(parseInt(anoSelecionado), parseInt(mesSelecionado));
      setDadosAtendimentos(atendimentosSimulados);
      setLoadingDados(false);
    }, 700);
  }, [anoSelecionado, mesSelecionado]);

  const dadosProcessados = useMemo(() => {
    if (!dadosAtendimentos.length) return [];

    const contagemPorMedico = dadosAtendimentos.reduce((acc, atendimento) => {
      acc[atendimento.medicoNome] = (acc[atendimento.medicoNome] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(contagemPorMedico)
      .map(([nome, total]) => ({ nome, total }))
      .sort((a, b) => b.total - a.total); // Ordena do maior para o menor
  }, [dadosAtendimentos]);

  const mesLabel = meses.find(m => m.value === mesSelecionado)?.label || "";
  const topMedicos = dadosProcessados.slice(0, 5); // Pega os top 5 para o gráfico

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Médicos com Mais Atendimentos</h1>
            <p className="text-gray-500 mt-1">Performance de atendimentos por médico no período selecionado.</p>
          </div>
          <Link href="/">
            <Button variant="outline" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar</span>
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="shadow-xl h-full">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center text-indigo-700">
                    <BarChartHorizontalBig className="h-6 w-6 mr-2" />
                    Ranking de Atendimentos ({mesLabel} de {anoSelecionado})
                  </CardTitle>
                  <CardDescription>Médicos com maior número de atendimentos registrados.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{ total: { label: "Atendimentos", color: "hsl(var(--chart-2))" } }} className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart layout="vertical" data={topMedicos} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" strokeWidth={1} fontSize={12} />
                        <YAxis dataKey="nome" type="category" strokeWidth={1} fontSize={12} width={120} interval={0} />
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

            <div className="lg:col-span-1">
              <Card className="shadow-xl h-full">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center text-sky-700">
                    <Users className="h-6 w-6 mr-2" />
                    Lista Completa
                  </CardTitle>
                  <CardDescription>Todos os médicos e seus totais de atendimento no período.</CardDescription>
                </CardHeader>
                <CardContent className="max-h-[400px] overflow-y-auto">
                  {dadosProcessados.map((medico, index) => (
                    <div key={medico.nome} className={`flex justify-between items-center p-3 ${index < dadosProcessados.length - 1 ? 'border-b' : ''} hover:bg-sky-50`}>
                      <div className="flex items-center">
                        <UserCheck className={`h-5 w-5 mr-3 ${index < 3 ? 'text-amber-500' : 'text-sky-600'}`} />
                        <span className="font-medium text-gray-700">{medico.nome}</span>
                      </div>
                      <Badge variant={index < 3 ? "destructive" : "secondary"} className="text-sm">
                        {medico.total} atend.
                      </Badge>
                    </div>
                  ))}
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
