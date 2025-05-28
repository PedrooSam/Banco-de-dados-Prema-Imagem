'use client';

import { useState, useEffect, useMemo } from 'react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { CalendarIcon, TrendingUp, Users, Activity, AlertTriangle, CheckCircle2, HomeIcon, BarChart2 } from 'lucide-react'; // Adicionado HomeIcon e BarChart2
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format, getYear, getMonth, getDate, subDays, startOfMonth, endOfMonth } from "date-fns";
import { ptBR } from 'date-fns/locale';
import Link from 'next/link'; // Adicionado Link do Next.js

// Mock de dados de exames - Simplificado, pois o foco será na contagem total do dia
// A função gerarAgendamentosDiaMock agora só precisa retornar uma contagem para simular o back-end
const gerarContagemExamesDiaMock = (dia, mes, ano) => {
  const dataSelecionada = new Date(ano, mes, dia);
  const seed = getDate(dataSelecionada) + getMonth(dataSelecionada) + getYear(dataSelecionada);
  // Simula uma contagem aleatória de exames para o dia
  const totalExames = Math.floor(Math.abs(Math.sin(seed)) * 50) + 5; // Entre 5 e 55 exames
  return totalExames;
};

const gerarHistoricoSemanalMock = (dia, mes, ano) => {
  let historico = [];
  for (let i = 6; i >= 0; i--) {
    const data = subDays(new Date(ano, mes, dia), i);
    // Usa a função de contagem mockada para o histórico também
    const totalExamesDoDia = gerarContagemExamesDiaMock(getDate(data), getMonth(data), getYear(data));
    historico.push({
      name: format(data, 'dd/MM'),
      totalExames: totalExamesDoDia
    });
  }
  return historico;
}

export default function TotalExamesDiaPage() {
  const hoje = new Date();
  const [diaSelecionado, setDiaSelecionado] = useState(getDate(hoje));
  const [mesSelecionado, setMesSelecionado] = useState(getMonth(hoje));
  const [anoSelecionado, setAnoSelecionado] = useState(getYear(hoje));

  const [totalExamesNoDia, setTotalExamesNoDia] = useState(0); // Estado para a contagem total de exames
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
    // Simula a busca da contagem de exames para o dia selecionado
    const contagemExames = gerarContagemExamesDiaMock(diaSelecionado, mesSelecionado, anoSelecionado);
    setTotalExamesNoDia(contagemExames);

    const historico = gerarHistoricoSemanalMock(diaSelecionado, mesSelecionado, anoSelecionado);
    setHistoricoSemanal(historico);
  }, [diaSelecionado, mesSelecionado, anoSelecionado]);

  const dataFormatada = useMemo(() => {
    try {
      return format(new Date(anoSelecionado, mesSelecionado, diaSelecionado), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch (error) {
      return "Data inválida";
    }
  }, [diaSelecionado, mesSelecionado, anoSelecionado]);

  const kpiData = useMemo(() => {
    // Simplificado para mostrar apenas o total de exames
    return [
      { title: "Total de Exames Agendados", value: totalExamesNoDia, icon: Activity, color: "text-blue-500" },
    ];
  }, [totalExamesNoDia]);

  return (
    <div className="container mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
      <Card className="mb-6 shadow-lg">
        <CardHeader className="bg-gray-100 border-b">
          <CardTitle className="text-3xl font-bold text-gray-800">Total de Exames Agendados por Dia</CardTitle>
          <CardDescription className="text-md text-gray-600">Contagem de exames agendados para o dia selecionado.</CardDescription>
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
              <Card key={index} className="shadow-md hover:shadow-lg transition-shadow lg:col-span-2"> {/* Ajustado para ocupar mais espaço se for o único KPI */}
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

      {/* Exibe a contagem total e o histórico semanal */}
      {dataFormatada !== "Data inválida" ? (
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6"> {/* Alterado para lg:grid-cols-1 pois só temos um gráfico principal agora */}
          <Card className="lg:col-span-1 shadow-lg"> {/* Alterado para lg:col-span-1 */}
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-xl font-semibold text-gray-700 flex items-center">
                <BarChart2 className="mr-2 h-6 w-6 text-green-600" />
                Total de Exames em {dataFormatada}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 text-center">
              <p className="text-6xl font-bold text-green-600">{totalExamesNoDia}</p>
              <p className="text-gray-600 mt-2">exames agendados</p>
            </CardContent>
          </Card>

          {/* Histórico Semanal continua como estava, usando mock data */}
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
                  <Tooltip formatter={(value, name) => [value, "Total de Exames"]}/>
                  <Legend wrapperStyle={{fontSize: "12px"}}/>
                  <Line type="monotone" dataKey="totalExames" name="Total de Exames" stroke="#16a34a" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
              ) : <p className="text-center text-gray-500">Sem dados para exibir o histórico.</p>}
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card className="shadow-lg">
          <CardContent className="pt-10 pb-10 flex flex-col items-center justify-center">
            <CalendarIcon className="w-16 h-16 text-gray-400 mb-4" />
            <p className="text-xl font-semibold text-gray-700 mb-2">
              {dataFormatada === "Data inválida" ? "Por favor, selecione uma data válida."
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
