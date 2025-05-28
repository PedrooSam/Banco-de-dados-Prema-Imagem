'use client';

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { HomeIcon, Users, Activity, PieChart as PieChartIcon, Filter, Percent } from 'lucide-react';
import Link from 'next/link';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// Mock de dados: Médicos e o total de exames que realizaram
const medicosPerformanceMock = [
  { id: 'med1', nome: 'Dr. Carlos Mendes', especialidade: 'Cardiologia', totalExames: 1850 },
  { id: 'med2', nome: 'Dra. Ana Souza', especialidade: 'Radiologia', totalExames: 2100 },
  { id: 'med3', nome: 'Dr. Paulo Ribeiro', especialidade: 'Ortopedia', totalExames: 1500 },
  { id: 'med4', nome: 'Dra. Carla Santos', especialidade: 'Neurologia', totalExames: 1700 },
  { id: 'med5', nome: 'Dr. Ricardo Almeida', especialidade: 'Endocrinologia', totalExames: 1200 },
  { id: 'med6', nome: 'Dra. Beatriz Lima', especialidade: 'Ginecologia', totalExames: 1950 },
];

const todasEspecialidadesMock = [
    'Cardiologia', 'Radiologia', 'Ortopedia', 'Neurologia', 'Endocrinologia', 'Ginecologia', 'Todas'
];

const PIE_CHART_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1919', '#1976D2', '#FF5733', '#C70039', '#900C3F'];

export default function PercentualExamesMedicoPage() {
  const [filtroEspecialidade, setFiltroEspecialidade] = useState('Todas');

  const totalExamesClinica = useMemo(() => {
    return medicosPerformanceMock.reduce((sum, medico) => sum + medico.totalExames, 0);
  }, []);

  // Lógica ajustada para agregar médicos e calcular percentuais
  const medicosProcessados = useMemo(() => {
    let medicosFiltradosPorEspecialidade = [...medicosPerformanceMock];
    if (filtroEspecialidade !== 'Todas') {
      medicosFiltradosPorEspecialidade = medicosFiltradosPorEspecialidade.filter(m => m.especialidade === filtroEspecialidade);
    }

    const agregados = medicosFiltradosPorEspecialidade.reduce((acc, medico) => {
      const medicoExistente = acc.find(m => m.nome === medico.nome);
      if (medicoExistente) {
        medicoExistente.totalExames += medico.totalExames;
      } else {
        // Adiciona uma cópia para não modificar o mock original diretamente se não houver agrupamento
        acc.push({ ...medico, totalExames: medico.totalExames }); // Garante que totalExames seja o valor inicial correto
      }
      return acc;
    }, []);

    return agregados.map(medico => ({
      ...medico,
      percentual: totalExamesClinica > 0 ? (medico.totalExames / totalExamesClinica) * 100 : 0,
    })).sort((a, b) => b.percentual - a.percentual);
  }, [filtroEspecialidade, totalExamesClinica]); // medicosPerformanceMock é constante, não precisa ser dep aqui

  const dadosGraficoPizza = useMemo(() => {
    if (medicosProcessados.length === 0) return []; // USA medicosProcessados
    return medicosProcessados.map(medico => ({ // USA medicosProcessados
      name: medico.nome,
      value: parseFloat(medico.percentual.toFixed(2)),
    }));
  }, [medicosProcessados]);

  const kpiData = useMemo(() => {
    const totalMedicos = medicosProcessados.length; // USA medicosProcessados
    const totalExamesConsiderados = medicosProcessados.reduce((sum, m) => sum + m.totalExames, 0); // USA medicosProcessados
    const mediaPercentual = totalMedicos > 0 ? (medicosProcessados.reduce((sum, m) => sum + m.percentual, 0) / totalMedicos) : 0; // USA medicosProcessados
    
    return [
      { title: "Total de Médicos (Filtro)", value: totalMedicos, icon: Users, color: "text-blue-500" },
      { title: "Total de Exames (Filtro)", value: totalExamesConsiderados.toLocaleString('pt-BR'), icon: Activity, color: "text-green-500" },
      { title: "Média de Participação", value: `${mediaPercentual.toFixed(2)}%`, icon: Percent, color: "text-purple-500" },
    ];
  }, [medicosProcessados]); // USA medicosProcessados

  return (
    <div className="container mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
      <Card className="mb-6 shadow-lg">
        <CardHeader className="bg-gray-100 border-b">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-3xl font-bold text-gray-800 flex items-center">
                <PieChartIcon className="mr-3 h-8 w-8 text-lime-600" /> Percentual de Exames por Médico
              </CardTitle>
              <CardDescription className="text-md text-gray-600">Análise da participação de cada médico no total de exames realizados na clínica.</CardDescription>
            </div>
            <Link href="/" passHref>
              <Button variant="outline" className="bg-green-600 hover:bg-green-700 text-white">
                <HomeIcon className="mr-2 h-4 w-4" />
                Voltar para o Início
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-xl flex items-center"><Filter className="mr-2 h-5 w-5 text-gray-600"/>Filtros</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="especialidade" className="block text-sm font-medium text-gray-700 mb-1">Especialidade:</label>
                  <Select value={filtroEspecialidade} onValueChange={setFiltroEspecialidade}>
                    <SelectTrigger id="especialidade" className="w-full bg-white"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {todasEspecialidadesMock.map(esp => <SelectItem key={esp} value={esp}>{esp}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {kpiData.map((kpi, index) => (
              <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">{kpi.title}</CardTitle>
                  <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {medicosProcessados.length > 0 ? ( // USA medicosProcessados
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl text-lime-700">Distribuição Percentual (Gráfico)</CardTitle>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={dadosGraficoPizza}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
                      >
                        {dadosGraficoPizza.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl text-lime-700">Detalhes por Médico</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[250px]">Médico</TableHead>
                        <TableHead>Especialidade</TableHead>
                        <TableHead className="text-right">Exames Realizados</TableHead>
                        <TableHead className="text-right">Percentual (%)</TableHead>
                        <TableHead className="w-[150px]">Barra de Progresso</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {medicosProcessados.map((medico) => ( // USA medicosProcessados
                        <TableRow key={medico.id}>
                          <TableCell className="font-medium">{medico.nome}</TableCell>
                          <TableCell>{medico.especialidade}</TableCell>
                          <TableCell className="text-right">{medico.totalExames.toLocaleString('pt-BR')}</TableCell>
                          <TableCell className="text-right font-semibold text-lime-600">{medico.percentual.toFixed(2)}%</TableCell>
                          <TableCell>
                            <Progress value={medico.percentual} className="h-3 bg-lime-100 [&>*]:bg-lime-500" />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="text-center py-10">
              <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-xl font-semibold text-gray-700">Nenhum médico encontrado para os filtros selecionados.</p>
              <p className="text-gray-500">Ajuste os filtros ou verifique os dados cadastrados.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
