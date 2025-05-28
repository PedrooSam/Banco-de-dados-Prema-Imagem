'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { HomeIcon, Users, Award, TrendingUp } from 'lucide-react';
import Link from 'next/link';

// Mock de dados simplificado: Pacientes e total de exames
const pacientesExamesMock = [
  { nome: 'Maria Silva', totalExames: 25 },
  { nome: 'João Pereira', totalExames: 18 },
  { nome: 'Luiza Costa', totalExames: 35 },
  { nome: 'Roberto Alves', totalExames: 12 },
  { nome: 'Ana Beatriz', totalExames: 42 },
  { nome: 'Carlos Eduardo', totalExames: 22 },
  { nome: 'Fernanda Lima', totalExames: 30 },
  { nome: 'Ricardo Souza', totalExames: 15 },
  { nome: 'Patricia Almeida', totalExames: 28 },
  { nome: 'Marcelo Borges', totalExames: 19 },
];

const getMedalColor = (rank) => {
  if (rank === 0) return "text-yellow-500"; // Ouro
  if (rank === 1) return "text-gray-400";   // Prata
  if (rank === 2) return "text-orange-400"; // Bronze
  return "text-transparent"; 
};

export default function PacientesMaisExamesPage() {
  const [pacientesData, setPacientesData] = useState(pacientesExamesMock); // Estado para dados reais ou mock

  const pacientesOrdenados = useMemo(() => {
    // Ordena os dados atuais (sejam mock ou da API)
    return [...pacientesData].sort((a, b) => b.totalExames - a.totalExames);
  }, [pacientesData]);


  // KPIs simplificados
  const kpiData = useMemo(() => {
    const totalPacientes = pacientesOrdenados.length;
    const totalExamesGeral = pacientesOrdenados.reduce((sum, p) => sum + p.totalExames, 0);
    const mediaExamesPorPaciente = totalPacientes > 0 ? (totalExamesGeral / totalPacientes) : 0;

    return [
      { title: "Top Pacientes Listados", value: totalPacientes, icon: Users, color: "text-blue-500" },
      { title: "Média de Exames (Listados)", value: mediaExamesPorPaciente.toFixed(1), icon: TrendingUp, color: "text-green-500" },
    ];
  }, [pacientesOrdenados]);

  return (
    <div className="container mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
      <Card className="mb-6 shadow-lg">
        <CardHeader className="bg-gray-100 border-b">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-3xl font-bold text-gray-800 flex items-center">
                <Users className="mr-3 h-8 w-8 text-emerald-600" /> Top Pacientes por Número de Exames
              </CardTitle>
              <CardDescription className="text-md text-gray-600">Pacientes com o maior número total de exames pagos realizados.</CardDescription>
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
          {/* KPIs Simplificados */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
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

          {pacientesOrdenados.length > 0 ? (
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-xl text-emerald-700">Ranking de Pacientes</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Rank</TableHead>
                      <TableHead>Paciente</TableHead>
                      <TableHead className="text-right">Total de Exames</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pacientesOrdenados.map((paciente, index) => (
                      <TableRow key={paciente.nome + index}> {/* Usar nome + index como chave para mock, idealmente seria um ID */}
                        <TableCell className="font-medium text-center">
                          <div className="flex items-center justify-center">
                            <Award className={`h-6 w-6 mr-1 ${getMedalColor(index)}`} />
                            {index + 1}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-emerald-800">{paciente.nome}</div>
                        </TableCell>
                        <TableCell className="text-right font-semibold text-lg text-emerald-600">{paciente.totalExames}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ) : (
            <div className="text-center py-10">
              <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-xl font-semibold text-gray-700">Nenhum paciente encontrado.</p>
              <p className="text-gray-500">Não há dados de pacientes para exibir no momento.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
