'use client';

import { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { HomeIcon, CalendarClock, FilterIcon, AlertTriangle, CheckCircle2, ClockIcon } from 'lucide-react';
import Link from 'next/link';
import { format, getYear, getMonth, getDate, endOfMonth, setHours, setMinutes, isValid } from "date-fns";
import { ptBR } from 'date-fns/locale';

// Mock de dados de exames (simplificado para este dashboard)
const todosExamesAgendadosMock = [
  // Formato: { dataHora: Date, tipoExame: string, paciente: string }
  // Adicionar alguns exemplos para diferentes horários e dias
  { dataHora: setMinutes(setHours(new Date(2025, 4, 27), 9), 0), tipoExame: 'Ecocardiograma', paciente: 'Paciente A' },
  { dataHora: setMinutes(setHours(new Date(2025, 4, 27), 9), 30), tipoExame: 'Raio-X Tórax', paciente: 'Paciente B' },
  { dataHora: setMinutes(setHours(new Date(2025, 4, 27), 10), 0), tipoExame: 'Teste Ergométrico', paciente: 'Paciente C' },
  { dataHora: setMinutes(setHours(new Date(2025, 4, 27), 10), 0), tipoExame: 'Consulta Cardiológica', paciente: 'Paciente D' },
  { dataHora: setMinutes(setHours(new Date(2025, 4, 28), 14), 0), tipoExame: 'MAPA 24h', paciente: 'Paciente E' },
  { dataHora: setMinutes(setHours(new Date(2025, 4, 28), 14), 15), tipoExame: 'Holter 24h', paciente: 'Paciente F' },
  { dataHora: setMinutes(setHours(new Date(2025, 5, 10), 8), 0), tipoExame: 'Ultrassonografia Abdome', paciente: 'Paciente G' },
];

const gerarHorariosDisponiveis = () => {
  const horarios = [];
  for (let h = 7; h < 22; h++) { // Horários das 07:00 às 21:00
    horarios.push({ valor: h, nome: `${String(h).padStart(2, '0')}:00` });
    horarios.push({ valor: h + 0.5, nome: `${String(h).padStart(2, '0')}:30` });
  }
  return horarios;
};

const filtrarExamesPorHoraMock = (dia, mes, ano, horaSelecionada) => {
  if (!isValid(new Date(ano, mes, dia))) return [];
  const horaInicio = Math.floor(horaSelecionada);
  const minutoInicio = (horaSelecionada % 1) * 60;
  
  const dataHoraInicioFiltro = setMinutes(setHours(new Date(ano, mes, dia), horaInicio), minutoInicio);
  const dataHoraFimFiltro = setMinutes(dataHoraInicioFiltro, minutoInicio + 29); // Considera um intervalo de 30min para a hora selecionada

  return todosExamesAgendadosMock.filter(exame => {
    return exame.dataHora >= dataHoraInicioFiltro && exame.dataHora <= dataHoraFimFiltro;
  });
};

export default function ExamesAgendadosHoraPage() {
  const hoje = new Date();
  const [diaSelecionado, setDiaSelecionado] = useState(getDate(hoje));
  const [mesSelecionado, setMesSelecionado] = useState(getMonth(hoje));
  const [anoSelecionado, setAnoSelecionado] = useState(getYear(hoje));
  const [horaSelecionada, setHoraSelecionada] = useState(9); // Default 9:00

  const [examesFiltrados, setExamesFiltrados] = useState([]);

  const anosDisponiveis = useMemo(() => {
    const anoAtual = getYear(new Date());
    return Array.from({ length: 5 }, (_, i) => anoAtual - i);
  }, []);

  const mesesDisponiveis = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      valor: i,
      nome: format(new Date(0, i), 'MMMM', { locale: ptBR })
    }));
  }, []);

  const diasDisponiveis = useMemo(() => {
    if (!isValid(new Date(anoSelecionado, mesSelecionado, 1))) return [];
    const dataBase = new Date(anoSelecionado, mesSelecionado, 1);
    const ultimoDiaDoMes = getDate(endOfMonth(dataBase));
    return Array.from({ length: ultimoDiaDoMes }, (_, i) => i + 1);
  }, [anoSelecionado, mesSelecionado]);

  const horariosDisponiveis = useMemo(() => gerarHorariosDisponiveis(), []);

  useEffect(() => {
    // Ajustar dia se o mês/ano mudar e o dia se tornar inválido
    const ultimoDiaValido = getDate(endOfMonth(new Date(anoSelecionado, mesSelecionado, 1)));
    if (diaSelecionado > ultimoDiaValido) {
        setDiaSelecionado(ultimoDiaValido);
    }

    const agendamentos = filtrarExamesPorHoraMock(diaSelecionado, mesSelecionado, anoSelecionado, horaSelecionada);
    setExamesFiltrados(agendamentos);
  }, [diaSelecionado, mesSelecionado, anoSelecionado, horaSelecionada]);

  const dataFormatada = useMemo(() => {
    try {
      const data = new Date(anoSelecionado, mesSelecionado, diaSelecionado);
      if (!isValid(data)) return "Data inválida";
      return format(data, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch (error) {
      return "Data inválida";
    }
  }, [diaSelecionado, mesSelecionado, anoSelecionado]);

  const horaFormatada = useMemo(() => {
    const hora = Math.floor(horaSelecionada);
    const minuto = (horaSelecionada % 1) * 60;
    return `${String(hora).padStart(2, '0')}:${String(minuto).padStart(2, '0')}`;
  }, [horaSelecionada]);

  return (
    <div className="container mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
      <Card className="mb-6 shadow-lg">
        <CardHeader className="bg-gray-100 border-b">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-3xl font-bold text-gray-800 flex items-center">
                <CalendarClock className="mr-3 h-8 w-8 text-indigo-600" /> Exames Agendados por Hora
              </CardTitle>
              <CardDescription className="text-md text-gray-600">Consulte a quantidade de exames marcados para um dia e horário específicos.</CardDescription>
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
          <Card className="mb-6 border-indigo-200 border-t-4 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl text-indigo-700 flex items-center">
                <FilterIcon className="mr-2 h-5 w-5"/>
                Filtros de Pesquisa
                </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div>
                  <label htmlFor="ano" className="block text-sm font-medium text-gray-700 mb-1">Ano:</label>
                  <Select value={anoSelecionado.toString()} onValueChange={(value) => setAnoSelecionado(parseInt(value))}>
                    <SelectTrigger id="ano" className="w-full bg-white"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {anosDisponiveis.map(ano => <SelectItem key={ano} value={ano.toString()}>{ano}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="mes" className="block text-sm font-medium text-gray-700 mb-1">Mês:</label>
                  <Select value={mesSelecionado.toString()} onValueChange={(value) => setMesSelecionado(parseInt(value))}>
                    <SelectTrigger id="mes" className="w-full bg-white"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {mesesDisponiveis.map(mes => <SelectItem key={mes.valor} value={mes.valor.toString()}>{mes.nome}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="dia" className="block text-sm font-medium text-gray-700 mb-1">Dia:</label>
                  <Select value={diaSelecionado.toString()} onValueChange={(value) => setDiaSelecionado(parseInt(value))}>
                    <SelectTrigger id="dia" className="w-full bg-white" disabled={dataFormatada === "Data inválida"}><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {diasDisponiveis.map(dia => <SelectItem key={dia} value={dia.toString()}>{dia}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="hora" className="block text-sm font-medium text-gray-700 mb-1">Horário:</label>
                  <Select value={horaSelecionada.toString()} onValueChange={(value) => setHoraSelecionada(parseFloat(value))}>
                    <SelectTrigger id="hora" className="w-full bg-white"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {horariosDisponiveis.map(h => <SelectItem key={h.valor} value={h.valor.toString()}>{h.nome}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {dataFormatada === "Data inválida" ? (
            <Card className="shadow-md bg-red-50 border-red-500 border-l-4">
              <CardContent className="pt-6 pb-6 flex items-center">
                <AlertTriangle className="w-12 h-12 text-red-500 mr-4" />
                <div>
                  <p className="text-xl font-semibold text-red-700">Data Inválida</p>
                  <p className="text-red-600">Por favor, selecione uma combinação de ano, mês e dia válida para continuar.</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div>
              <Card className="mb-6 shadow-md bg-indigo-50">
                <CardHeader>
                  <CardTitle className="text-xl text-indigo-700 flex items-center">
                    <ClockIcon className="mr-2 h-6 w-6" />
                    Resultado para {dataFormatada} às {horaFormatada}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center py-8">
                  <p className="text-6xl font-bold text-indigo-600">{examesFiltrados.length}</p>
                  <p className="text-xl text-gray-600 mt-2">
                    {examesFiltrados.length === 1 ? "exame agendado" : "exames agendados"}
                  </p>
                </CardContent>
              </Card>

              {examesFiltrados.length > 0 && (
                <Card className="shadow-lg">
                  <CardHeader className="bg-gray-50 border-b">
                    <CardTitle className="text-lg font-semibold text-gray-700">Detalhes dos Exames Agendados</CardTitle>
                    <CardDescription>Lista de exames para {dataFormatada} às {horaFormatada}.</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="overflow-x-auto rounded-md border">
                      <Table>
                        <TableHeader className="bg-gray-100">
                          <TableRow>
                            <TableHead className="font-semibold text-gray-600">Horário Exato</TableHead>
                            <TableHead className="font-semibold text-gray-600">Tipo de Exame</TableHead>
                            <TableHead className="font-semibold text-gray-600">Paciente</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {examesFiltrados.map((exame, index) => (
                            <TableRow key={index} className="hover:bg-gray-50">
                              <TableCell className="font-medium text-gray-800">{format(exame.dataHora, 'HH:mm')}</TableCell>
                              <TableCell className="text-gray-700">
                                <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">{exame.tipoExame}</Badge>
                              </TableCell>
                              <TableCell className="text-gray-700">{exame.paciente}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              )}

              {examesFiltrados.length === 0 && dataFormatada !== "Data inválida" && (
                 <Card className="shadow-md bg-green-50 border-green-500 border-l-4">
                    <CardContent className="pt-8 pb-8 flex flex-col items-center justify-center text-center">
                    <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                    <p className="text-xl font-semibold text-gray-700 mb-2">
                        Nenhum exame encontrado para esta data e horário.
                    </p>
                    <p className="text-gray-500">
                        Não há agendamentos correspondentes aos filtros selecionados.
                    </p>
                    </CardContent>
                </Card>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
