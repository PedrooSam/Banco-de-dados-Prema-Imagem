'use client';

import { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, TrendingUp, Users, Activity, AlertTriangle, CheckCircle2, HomeIcon } from 'lucide-react'; // Adicionado HomeIcon
import { format, getYear, getMonth, getDate, subDays, startOfMonth, endOfMonth } from "date-fns";
import { ptBR } from 'date-fns/locale';
import Link from 'next/link'; // Adicionado Link do Next.js

// Mock de dados de exames
const todosExamesMock = [
  { id: 'eco', nome: 'Ecocardiograma', tipo: 'Cardiológico', duracaoMedia: 30, preparo: 'Nenhum', precoMedio: 250 },
  { id: 'erg', nome: 'Teste Ergométrico', tipo: 'Cardiológico', duracaoMedia: 45, preparo: 'Roupa esportiva, jejum 2h', precoMedio: 350 },
  { id: 'mapa', nome: 'MAPA 24h', tipo: 'Cardiológico', duracaoMedia: 1440, preparo: 'Banho antes, camisa larga', precoMedio: 400 },
  { id: 'holter', nome: 'Holter 24h', tipo: 'Cardiológico', duracaoMedia: 1440, preparo: 'Banho antes, camisa larga', precoMedio: 400 },
  { id: 'eletro', nome: 'Eletrocardiograma', tipo: 'Cardiológico', duracaoMedia: 15, preparo: 'Nenhum', precoMedio: 100 },
  { id: 'doppler', nome: 'Doppler Arterial', tipo: 'Vascular', duracaoMedia: 40, preparo: 'Nenhum', precoMedio: 300 },
  { id: 'consulta', nome: 'Consulta Cardiológica', tipo: 'Clínico', duracaoMedia: 60, preparo: 'Levar exames anteriores', precoMedio: 200 },
  { id: 'usg_abd', nome: 'Ultrassonografia Abdome', tipo: 'Imagem', duracaoMedia: 20, preparo: 'Jejum 6h, bexiga cheia', precoMedio: 180 },
  { id: 'raiox_torax', nome: 'Raio-X Tórax', tipo: 'Imagem', duracaoMedia: 10, preparo: 'Nenhum', precoMedio: 80 },
  { id: 'endo', nome: 'Endoscopia Digestiva Alta', tipo: 'Gastroenterologia', duracaoMedia: 30, preparo: 'Jejum 8h, acompanhante', precoMedio: 500 },
];

const gerarAgendamentosDiaMock = (dia, mes, ano) => {
  const dataSelecionada = new Date(ano, mes, dia);
  const seed = getDate(dataSelecionada) + getMonth(dataSelecionada) + getYear(dataSelecionada);
  const random = (multiplier, max) => Math.floor(Math.abs(Math.sin(seed * multiplier)) * max) + 1;

  let agendamentos = [];
  todosExamesMock.forEach(exame => {
    const quantidade = random(todosExamesMock.findIndex(e => e.id === exame.id) + 1, 5) * (Math.random() > 0.2 ? 1 : 0);
    if (quantidade > 0) {
      agendamentos.push({ ...exame, quantidade });
    }
  });
  return agendamentos;
};

const gerarHistoricoSemanalMock = (dia, mes, ano) => {
  let historico = [];
  for (let i = 6; i >= 0; i--) {
    const data = subDays(new Date(ano, mes, dia), i);
    const agendamentosDoDia = gerarAgendamentosDiaMock(getDate(data), getMonth(data), getYear(data));
    historico.push({
      name: format(data, 'dd/MM'),
      totalExames: agendamentosDoDia.reduce((sum, ex) => sum + ex.quantidade, 0)
    });
  }
  return historico;
}

const PIE_CHART_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1919', '#1976D2'];

export default function TotalExamesDiaPage() {
  const hoje = new Date();
  const [diaSelecionado, setDiaSelecionado] = useState(getDate(hoje));
  const [mesSelecionado, setMesSelecionado] = useState(getMonth(hoje));
  const [anoSelecionado, setAnoSelecionado] = useState(getYear(hoje));

  const [dadosExamesDia, setDadosExamesDia] = useState([]);
  const [historicoSemanal, setHistoricoSemanal] = useState([]);

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
    const dataBase = new Date(anoSelecionado, mesSelecionado, 1);
    const ultimoDiaDoMes = getDate(endOfMonth(dataBase));
    return Array.from({ length: ultimoDiaDoMes }, (_, i) => i + 1);
  }, [anoSelecionado, mesSelecionado]);

  useEffect(() => {
    if (diaSelecionado > getDate(endOfMonth(new Date(anoSelecionado, mesSelecionado, 1)))) {
        setDiaSelecionado(getDate(endOfMonth(new Date(anoSelecionado, mesSelecionado, 1))));
    }
    const agendamentos = gerarAgendamentosDiaMock(diaSelecionado, mesSelecionado, anoSelecionado);
    setDadosExamesDia(agendamentos);
    const historico = gerarHistoricoSemanalMock(diaSelecionado, mesSelecionado, anoSelecionado);
    setHistoricoSemanal(historico);
  }, [diaSelecionado, mesSelecionado, anoSelecionado]);

  const totalExamesNoDia = useMemo(() => {
    return dadosExamesDia.reduce((acc, exame) => acc + exame.quantidade, 0);
  }, [dadosExamesDia]);

  const dataFormatada = useMemo(() => {
    try {
      return format(new Date(anoSelecionado, mesSelecionado, diaSelecionado), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch (error) {
      return "Data inválida";
    }
  }, [diaSelecionado, mesSelecionado, anoSelecionado]);

  const kpiData = useMemo(() => {
    const totalTiposExames = new Set(dadosExamesDia.map(ex => ex.tipo)).size;
    const exameMaisRealizado = dadosExamesDia.length > 0 ? dadosExamesDia.reduce((max, ex) => ex.quantidade > max.quantidade ? ex : max, dadosExamesDia[0]) : null;
    const mediaDuracao = dadosExamesDia.length > 0 ? (dadosExamesDia.reduce((sum, ex) => sum + (ex.duracaoMedia * ex.quantidade), 0) / totalExamesNoDia).toFixed(0) : 0;
    return [
      { title: "Total de Exames", value: totalExamesNoDia, icon: Activity, color: "text-blue-500" },
      { title: "Tipos de Exame Diferentes", value: totalTiposExames, icon: Users, color: "text-green-500" },
      { title: "Exame Mais Popular", value: exameMaisRealizado ? `${exameMaisRealizado.nome} (${exameMaisRealizado.quantidade})` : 'N/A', icon: TrendingUp, color: "text-purple-500" },
      { title: "Tempo Médio por Exame", value: `${mediaDuracao} min`, icon: AlertTriangle, color: "text-orange-500" },
    ];
  }, [dadosExamesDia, totalExamesNoDia]);

  const dadosGraficoPizza = useMemo(() => {
    if (dadosExamesDia.length === 0) return [];
    const agrupadoPorTipo = dadosExamesDia.reduce((acc, curr) => {
      acc[curr.tipo] = (acc[curr.tipo] || 0) + curr.quantidade;
      return acc;
    }, {});
    return Object.keys(agrupadoPorTipo).map(tipo => ({
      name: tipo,
      value: agrupadoPorTipo[tipo]
    }));
  }, [dadosExamesDia]);

  return (
    <div className="container mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
      <Card className="mb-6 shadow-lg">
        <CardHeader className="bg-gray-100 border-b">
          <CardTitle className="text-3xl font-bold text-gray-800">Dashboard de Análise Diária de Exames</CardTitle>
          <CardDescription className="text-md text-gray-600">Análise detalhada dos exames agendados para o dia selecionado.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 pb-6 border-b">
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
                <SelectTrigger id="dia" className="w-full bg-white"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {diasDisponiveis.map(dia => <SelectItem key={dia} value={dia.toString()}>{dia}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-start mb-6">
            <Link href="/" passHref>
              <Button variant="outline" className="bg-green-600 hover:bg-green-700 text-white">
                <HomeIcon className="mr-2 h-4 w-4" />
                Voltar para o Início
              </Button>
            </Link>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-700">
              Exames para: <span className="text-green-600">{dataFormatada}</span>
            </h2>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
        </CardContent>
      </Card>

      {dadosExamesDia.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Gráfico de Barras e Tabela */}
          <Card className="lg:col-span-2 shadow-lg">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-xl font-semibold text-gray-700">Distribuição dos Exames no Dia</CardTitle>
              <CardDescription>Quantidade de cada exame realizado em {dataFormatada}.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={dadosExamesDia} margin={{ top: 5, right: 20, left: -10, bottom: 70 }} barSize={25}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="nome" angle={-45} textAnchor="end" interval={0} height={80} tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                  <Tooltip
                    formatter={(value, name, props) => [`${value} ${props.payload.nome}`, 'Quantidade']}
                    labelFormatter={(label) => ``}
                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', border: '1px solid #ddd', borderRadius: '4px' }}
                    itemStyle={{ color: '#333' }}
                    cursor={{ fill: 'rgba(200, 200, 200, 0.2)' }}
                  />
                  <Legend formatter={(value) => <span className="text-gray-700 text-sm">{value}</span>} verticalAlign="top" wrapperStyle={{paddingBottom: '10px'}}/>
                  <Bar dataKey="quantidade" name="Quantidade" fill="#22c55e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-3 text-gray-700">Lista Detalhada de Exames:</h3>
                <div className="overflow-x-auto rounded-md border">
                  <Table>
                    <TableHeader className="bg-gray-100">
                      <TableRow>
                        <TableHead className="font-semibold text-gray-600">Exame</TableHead>
                        <TableHead className="text-center font-semibold text-gray-600">Quantidade</TableHead>
                        <TableHead className="text-center font-semibold text-gray-600">Tipo</TableHead>
                        <TableHead className="text-right font-semibold text-gray-600">Preparo</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dadosExamesDia.map(exame => (
                        <TableRow key={exame.id} className="hover:bg-gray-50">
                          <TableCell className="font-medium text-gray-800">{exame.nome}</TableCell>
                          <TableCell className="text-center text-gray-700">{exame.quantidade}</TableCell>
                          <TableCell className="text-center">
                            <Badge variant={exame.tipo === 'Cardiológico' ? "default" : "secondary"}
                                   className={exame.tipo === 'Cardiológico' ? 'bg-blue-100 text-blue-700' :
                                              exame.tipo === 'Vascular' ? 'bg-purple-100 text-purple-700' :
                                              exame.tipo === 'Imagem' ? 'bg-green-100 text-green-700' :
                                              exame.tipo === 'Gastroenterologia' ? 'bg-orange-100 text-orange-700' :
                                              'bg-gray-100 text-gray-700'}
                            >{exame.tipo}</Badge>
                          </TableCell>
                          <TableCell className="text-right text-sm text-gray-600">{exame.preparo}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gráficos Adicionais e Histórico */}
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="text-xl font-semibold text-gray-700">Proporção por Tipo de Exame</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {dadosGraficoPizza.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={dadosGraficoPizza}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                      >
                        {dadosGraficoPizza.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name) => [value, name]} />
                      <Legend wrapperStyle={{fontSize: "12px"}}/>
                    </PieChart>
                  </ResponsiveContainer>
                ) : <p className="text-center text-gray-500">Sem dados para exibir o gráfico.</p>}
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="text-xl font-semibold text-gray-700">Histórico Semanal de Exames</CardTitle>
                <CardDescription>Total de exames nos últimos 7 dias (incluindo o dia selecionado).</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {historicoSemanal.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={historicoSemanal} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 12 }}/>
                    <Tooltip />
                    <Legend wrapperStyle={{fontSize: "12px"}}/>
                    <Line type="monotone" dataKey="totalExames" name="Total de Exames" stroke="#16a34a" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
                ) : <p className="text-center text-gray-500">Sem dados para exibir o histórico.</p>}
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <Card className="shadow-lg">
          <CardContent className="pt-10 pb-10 flex flex-col items-center justify-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
            <p className="text-xl font-semibold text-gray-700 mb-2">
              {totalExamesNoDia === 0 && dataFormatada !== "Data inválida" ? "Nenhum exame encontrado para esta data."
               : dataFormatada === "Data inválida" ? "Por favor, selecione uma data válida."
               : "Selecione os filtros para carregar os dados."}
            </p>
            <p className="text-gray-500">
              Tente ajustar os filtros de data para encontrar os agendamentos desejados.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
