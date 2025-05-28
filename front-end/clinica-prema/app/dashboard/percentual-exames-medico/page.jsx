'use client';

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { HomeIcon, Users, Activity, PieChart as PieChartIcon, Percent } from 'lucide-react';
import Link from 'next/link';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// Mock de dados ajustado para refletir o retorno do backend (nome e percentual)
const medicosPerformanceMock = [
  { nome: 'Dr. Carlos Mendes', percentual: 35.5 },
  { nome: 'Dra. Ana Souza', percentual: 25.0 },
  { nome: 'Dr. Paulo Ribeiro', percentual: 15.8 },
  { nome: 'Dra. Carla Santos', percentual: 12.2 },
  { nome: 'Dr. Ricardo Almeida', percentual: 7.5 },
  { nome: 'Dra. Beatriz Lima', percentual: 4.0 },
];

const PIE_CHART_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1919', '#1976D2', '#FF5733', '#C70039', '#900C3F'];

export default function PercentualExamesMedicoPage() {
  const [loading, setLoading] = useState(true);
  const [medicosData, setMedicosData] = useState([]);

  useEffect(() => {
    // Simula o carregamento de dados
    setTimeout(() => {
      // Ordena os dados mockados por percentual (decrescente) como o backend faria
      const sortedData = [...medicosPerformanceMock].sort((a, b) => b.percentual - a.percentual);
      setMedicosData(sortedData);
      setLoading(false);
    }, 500);
  }, []);

  // medicosProcessados agora usa diretamente medicosData (que simula os dados do backend)
  const medicosProcessados = useMemo(() => {
    return medicosData;
  }, [medicosData]);

  const dadosGraficoPizza = useMemo(() => {
    if (medicosProcessados.length === 0) return [];
    return medicosProcessados.map(medico => ({
      name: medico.nome,
      value: parseFloat(medico.percentual.toFixed(2)), // O valor já é o percentual
    }));
  }, [medicosProcessados]);

  const kpiData = useMemo(() => {
    const totalMedicos = medicosProcessados.length;
    const mediaPercentual = totalMedicos > 0 ? (medicosProcessados.reduce((sum, m) => sum + m.percentual, 0) / totalMedicos) : 0;
    
    return [
      { title: "Total de Médicos", value: totalMedicos, icon: Users, color: "text-blue-500" },
      { title: "Média de Participação", value: `${mediaPercentual.toFixed(2)}%`, icon: Percent, color: "text-purple-500" },
    ];
  }, [medicosProcessados]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Activity className="h-16 w-16 text-lime-600 animate-spin" />
        <p className="ml-4 text-xl text-gray-700">Carregando dados...</p>
      </div>
    );
  }

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
          {/* KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-8"> {/* Ajustado para lg:grid-cols-2 */}
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

          {medicosProcessados.length > 0 ? (
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
                        <TableHead className="text-right">Percentual (%)</TableHead>
                        <TableHead className="w-[150px]">Barra de Progresso</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {medicosProcessados.map((medico, index) => ( // Adicionado index para key
                        <TableRow key={medico.nome + '-' + index}> {/* Chave ajustada para ser única */}
                          <TableCell className="font-medium">{medico.nome}</TableCell>
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
              <p className="text-xl font-semibold text-gray-700">Nenhum médico encontrado.</p>
              <p className="text-gray-500">Verifique os dados cadastrados.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
