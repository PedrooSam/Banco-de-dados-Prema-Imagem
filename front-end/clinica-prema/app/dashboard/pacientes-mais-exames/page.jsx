'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { HomeIcon, Users, Activity, Filter, Award, TrendingUp, UserSearch, CalendarDays } from 'lucide-react';
import Link from 'next/link';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Mock de dados: Pacientes e seus históricos de exames
const pacientesExamesMock = [
  {
    id: 'pac1', 
    nome: 'Maria Silva', 
    dataNascimento: '1985-07-15', 
    totalExames: 25, 
    ultimoExame: '2025-05-10',
    historicoVisitas: [
      { data: '2024-01-15', examesRealizados: 3, tipos: ['Raio-X', 'Hemograma'] },
      { data: '2024-06-20', examesRealizados: 2, tipos: ['Ultrassonografia'] },
      { data: '2025-01-10', examesRealizados: 5, tipos: ['Tomografia', 'Ecocardiograma', 'MAPA'] },
      { data: '2025-05-10', examesRealizados: 15, tipos: ['Ressonância', 'Holter', 'Teste Ergométrico', 'Doppler'] },
    ]
  },
  {
    id: 'pac2', 
    nome: 'João Pereira', 
    dataNascimento: '1972-03-22', 
    totalExames: 18, 
    ultimoExame: '2025-04-28',
    historicoVisitas: [
      { data: '2023-11-05', examesRealizados: 10, tipos: ['Consulta Cardiológica', 'Eletrocardiograma'] },
      { data: '2024-08-12', examesRealizados: 2, tipos: ['Endoscopia'] },
      { data: '2025-04-28', examesRealizados: 6, tipos: ['Ultrassonografia Abdome'] },
    ]
  },
  {
    id: 'pac3', 
    nome: 'Luiza Costa', 
    dataNascimento: '1990-11-01', 
    totalExames: 35, 
    ultimoExame: '2025-05-20',
    historicoVisitas: [
      { data: '2024-02-01', examesRealizados: 10, tipos: ['Raio-X Tórax', 'Hemograma Completo'] },
      { data: '2024-09-15', examesRealizados: 10, tipos: ['MAPA 24h', 'Holter 24h'] },
      { data: '2025-03-05', examesRealizados: 5, tipos: ['Teste Ergométrico'] },
      { data: '2025-05-20', examesRealizados: 10, tipos: ['Ecocardiograma', 'Doppler Arterial'] },
    ]
  },
   {
    id: 'pac4', 
    nome: 'Roberto Alves', 
    dataNascimento: '1965-01-30', 
    totalExames: 12, 
    ultimoExame: '2025-03-10',
    historicoVisitas: [
      { data: '2024-10-10', examesRealizados: 6, tipos: ['Consulta Cardiológica'] },
      { data: '2025-03-10', examesRealizados: 6, tipos: ['Eletrocardiograma', 'Raio-X Tórax'] },
    ]
  },
  {
    id: 'pac5', 
    nome: 'Ana Beatriz', 
    dataNascimento: '2001-09-05', 
    totalExames: 42, 
    ultimoExame: '2025-05-01',
    historicoVisitas: [
      { data: '2024-07-22', examesRealizados: 12, tipos: ['Ultrassonografia', 'Hemograma'] },
      { data: '2024-12-01', examesRealizados: 10, tipos: ['Tomografia'] },
      { data: '2025-05-01', examesRealizados: 20, tipos: ['Ressonância Magnética', 'Ecocardiograma', 'Endoscopia'] },
    ]
  },
];

const getMedalColor = (rank) => {
  if (rank === 0) return "text-yellow-500"; // Ouro
  if (rank === 1) return "text-gray-400";   // Prata
  if (rank === 2) return "text-orange-400"; // Bronze
  return "text-transparent"; // Sem medalha visível, mas mantém o espaço se necessário
};

export default function PacientesMaisExamesPage() {
  const [filtroNome, setFiltroNome] = useState('');
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null);

  const pacientesOrdenados = useMemo(() => {
    return [...pacientesExamesMock]
      .filter(p => p.nome.toLowerCase().includes(filtroNome.toLowerCase()))
      .sort((a, b) => b.totalExames - a.totalExames);
  }, [filtroNome]);

  const dadosGraficoPaciente = useMemo(() => {
    if (!pacienteSelecionado) return [];
    return pacienteSelecionado.historicoVisitas.map(visita => ({
      name: format(parseISO(visita.data), 'dd/MM/yy'),
      Exames: visita.examesRealizados,
    }));
  }, [pacienteSelecionado]);

  const handleVerDetalhes = (paciente) => {
    setPacienteSelecionado(paciente);
  };

  const kpiData = useMemo(() => {
    const totalPacientesFiltrados = pacientesOrdenados.length;
    const totalExamesGeral = pacientesExamesMock.reduce((sum, p) => sum + p.totalExames, 0);
    const mediaExamesPorPaciente = totalPacientesFiltrados > 0 ? (pacientesOrdenados.reduce((sum, p) => sum + p.totalExames, 0) / totalPacientesFiltrados) : 0;

    return [
      { title: "Total de Pacientes (Filtro)", value: totalPacientesFiltrados, icon: Users, color: "text-blue-500" },
      { title: "Média de Exames por Paciente (Filtro)", value: mediaExamesPorPaciente.toFixed(1), icon: TrendingUp, color: "text-green-500" },
      { title: "Total Geral de Exames (Clínica)", value: totalExamesGeral.toLocaleString('pt-BR'), icon: Activity, color: "text-purple-500" },
    ];
  }, [pacientesOrdenados]);

  return (
    <div className="container mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
      <Card className="mb-6 shadow-lg">
        <CardHeader className="bg-gray-100 border-b">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-3xl font-bold text-gray-800 flex items-center">
                <Users className="mr-3 h-8 w-8 text-emerald-600" /> Pacientes com Mais Exames Realizados
              </CardTitle>
              <CardDescription className="text-md text-gray-600">Ranking de pacientes pelo total de exames realizados na clínica.</CardDescription>
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
              <CardTitle className="text-xl flex items-center"><Filter className="mr-2 h-5 w-5 text-gray-600"/>Filtros e Pesquisa</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                <div>
                  <label htmlFor="nomePaciente" className="block text-sm font-medium text-gray-700 mb-1">Pesquisar por Nome:</label>
                  <Input 
                    id="nomePaciente"
                    type="text" 
                    placeholder="Digite o nome do paciente..."
                    value={filtroNome}
                    onChange={(e) => setFiltroNome(e.target.value)}
                    className="bg-white"
                  />
                </div>
                {pacientesOrdenados.length > 0 && (
                    <p className="text-sm text-gray-600 md:mt-7">Exibindo {pacientesOrdenados.length} de {pacientesExamesMock.length} pacientes.</p>
                )}
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

          {pacientesOrdenados.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle className="text-xl text-emerald-700">Ranking de Pacientes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[50px]">Rank</TableHead>
                          <TableHead>Paciente</TableHead>
                          <TableHead className="text-right">Total de Exames</TableHead>
                          <TableHead className="text-center">Último Exame</TableHead>
                          <TableHead className="text-center">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pacientesOrdenados.map((paciente, index) => (
                          <TableRow key={paciente.id} className={`${pacienteSelecionado?.id === paciente.id ? 'bg-emerald-50' : ''}`}>
                            <TableCell className="font-medium text-center">
                              <div className="flex items-center justify-center">
                                <Award className={`h-6 w-6 mr-1 ${getMedalColor(index)}`} />
                                {index + 1}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium text-emerald-800">{paciente.nome}</div>
                              <div className="text-xs text-gray-500">{format(parseISO(paciente.dataNascimento), 'dd/MM/yyyy')} ({new Date().getFullYear() - parseISO(paciente.dataNascimento).getFullYear()} anos)</div>
                            </TableCell>
                            <TableCell className="text-right font-semibold text-lg text-emerald-600">{paciente.totalExames}</TableCell>
                            <TableCell className="text-center text-sm text-gray-600">{format(parseISO(paciente.ultimoExame), 'dd/MM/yyyy')}</TableCell>
                            <TableCell className="text-center">
                              <Button 
                                variant="outline"
                                size="sm"
                                className="border-emerald-500 text-emerald-600 hover:bg-emerald-100"
                                onClick={() => handleVerDetalhes(paciente)}
                              >
                                <UserSearch className="mr-2 h-4 w-4"/> Ver Detalhes
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>

              {/* Detalhes do Paciente Selecionado */} 
              <div className="lg:col-span-1">
                {pacienteSelecionado ? (
                  <Card className="shadow-lg sticky top-6">
                    <CardHeader className="bg-emerald-50">
                      <CardTitle className="text-xl text-emerald-800">Detalhes de {pacienteSelecionado.nome}</CardTitle>
                      <CardDescription>Histórico de exames por visita.</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="mb-6 h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={dadosGraficoPaciente} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" ángulo={-45} textAnchor="end" height={60} tick={{fontSize: 12}}/>
                            <YAxis allowDecimals={false} />
                            <Tooltip formatter={(value) => [value, 'Exames']}/>
                            <Legend formatter={(value) => `Nº de Exames`}/>
                            <Bar dataKey="Exames" fill="#059669" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      <h4 className="font-semibold text-md mb-2 text-emerald-700">Histórico de Visitas:</h4>
                      <div className="max-h-[300px] overflow-y-auto space-y-3 pr-2">
                        {pacienteSelecionado.historicoVisitas.sort((a,b) => parseISO(b.data) - parseISO(a.data)).map((visita, idx) => (
                          <div key={idx} className="p-3 border rounded-md bg-gray-50 hover:bg-gray-100">
                            <div className="flex justify-between items-center mb-1">
                               <p className="font-semibold text-emerald-700 flex items-center"><CalendarDays className="h-4 w-4 mr-1.5"/>{format(parseISO(visita.data), 'dd/MM/yyyy')}</p>
                               <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">{visita.examesRealizados} exame(s)</Badge>
                            </div>
                            <p className="text-xs text-gray-600">Tipos: {visita.tipos.join(', ')}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="shadow-md flex flex-col items-center justify-center h-full bg-gray-100 border-dashed">
                    <CardContent className="text-center">
                      <UserSearch className="h-16 w-16 text-gray-400 mb-4" />
                      <p className="text-lg font-semibold text-gray-700">Selecione um Paciente</p>
                      <p className="text-sm text-gray-500">Clique em "Ver Detalhes" na tabela para visualizar o histórico de exames do paciente aqui.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-10">
              <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-xl font-semibold text-gray-700">Nenhum paciente encontrado.</p>
              <p className="text-gray-500">Ajuste o filtro de nome ou verifique os cadastros.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
