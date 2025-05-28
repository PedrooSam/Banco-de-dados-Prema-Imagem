"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Home,
  Calendar as CalendarIcon,
  Users,
  UserCheck,
  Plus,
  Clock,
  CalendarDays,
  UserPlus,
  Stethoscope,
  FileText,
  CreditCard,
  ArrowLeft,
  BarChart3,
  PieChart,
  TrendingUp as TrendingUpIcon, // Renomeado para evitar conflito e usado para Horários de Maior Movimento
  Filter, // Adicionado
  Users2, // Adicionado
  DollarSign, // Adicionado
  Activity, // Adicionado para Média por Paciente
  ListChecks, // Adicionado para Tipos de Exames
} from "lucide-react"
import Link from "next/link"
import { format, subDays } from "date-fns" // Adicionado subDays
import { ptBR } from "date-fns/locale"

export default function ExamesPeriodoPage() {
  const [dataSelecionada, setDataSelecionada] = useState(new Date())
  const [anoSelecionado, setAnoSelecionado] = useState(new Date().getFullYear().toString())
  const [mesSelecionado, setMesSelecionado] = useState((new Date().getMonth() + 1).toString().padStart(2, '0'))
  const [periodoSelecionado, setPeriodoSelecionado] = useState("todos")
  const [tipoVisualizacao, setTipoVisualizacao] = useState("lista")

  // Dados simulados de exames por período
  const examePorPeriodo = {
    madrugada: [
      { id: 1, paciente: "Beatriz Silva", exame: "TC Crânio", horario: "00:30", medico: "Dr. Carlos Mendes", status: "Realizado" },
      { id: 2, paciente: "Lucas Martins", exame: "Ressonância Joelho", horario: "02:15", medico: "Dra. Ana Souza", status: "Aguardando" },
      { id: 3, paciente: "Patricia Lima", exame: "Ultrassom Abdominal", horario: "03:45", medico: "Dr. Paulo Ribeiro", status: "Realizado" },
      { id: 4, paciente: "Rodrigo Santos", exame: "Mamografia", horario: "05:00", medico: "Dra. Carla Santos", status: "Em Andamento" },
    ],
    manha: [
      { id: 5, paciente: "Maria Silva", exame: "Ultrassonografia", horario: "08:00", medico: "Dr. Carlos Mendes", status: "Realizado" },
      { id: 6, paciente: "João Pereira", exame: "Raio-X", horario: "09:15", medico: "Dra. Ana Souza", status: "Realizado" },
      { id: 7, paciente: "Luiza Costa", exame: "Ressonância Magnética", horario: "10:30", medico: "Dr. Paulo Ribeiro", status: "Realizado" },
      { id: 8, paciente: "Roberto Alves", exame: "Tomografia", horario: "11:45", medico: "Dra. Carla Santos", status: "Cancelado" },
    ],
    tarde: [
      { id: 9, paciente: "Ana Beatriz", exame: "Ecocardiograma", horario: "14:00", medico: "Dr. Carlos Mendes", status: "Realizado" },
      { id: 10, paciente: "Pedro Santos", exame: "Mamografia", horario: "15:30", medico: "Dra. Ana Souza", status: "Realizado" },
      { id: 11, paciente: "Carla Mendes", exame: "Ultrassom Doppler", horario: "16:15", medico: "Dr. Paulo Ribeiro", status: "Em Andamento" },
      { id: 12, paciente: "Fernando Lima", exame: "TC Abdomen", horario: "17:00", medico: "Dra. Carla Santos", status: "Aguardando" },
    ],
    noite: [
      { id: 13, paciente: "Mariana Oliveira", exame: "Eletrocardiograma", horario: "18:30", medico: "Dr. Carlos Mendes", status: "Realizado" },
      { id: 14, paciente: "Rafael Costa", exame: "Ultrassonografia", horario: "19:45", medico: "Dra. Ana Souza", status: "Realizado" },
      { id: 15, paciente: "Juliana Ferreira", exame: "Raio-X Tórax", horario: "20:15", medico: "Dr. Paulo Ribeiro", status: "Realizado" },
      { id: 16, paciente: "Carlos Eduardo", exame: "Endoscopia", horario: "21:30", medico: "Dra. Carla Santos", status: "Cancelado" },
    ],
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Realizado":
        return "bg-green-100 text-green-800"
      case "Em Andamento":
        return "bg-blue-100 text-blue-800"
      case "Aguardando":
        return "bg-yellow-100 text-yellow-800"
      case "Cancelado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPeriodoStats = () => {
    const periodosData = {
      madrugada: {
        label: "Madrugada",
        horarioLabel: "00:01 - 05:59",
        exames: examePorPeriodo.madrugada.length,
        pacientes: Math.floor(examePorPeriodo.madrugada.length * 0.75), // Simulado
        receita: examePorPeriodo.madrugada.length * 225, // Simulado
        corBadge: "bg-purple-100 text-purple-800",
      },
      manha: {
        label: "Manhã",
        horarioLabel: "06:00 - 12:00",
        exames: examePorPeriodo.manha.length,
        pacientes: Math.floor(examePorPeriodo.manha.length * 0.88), // Simulado
        receita: examePorPeriodo.manha.length * 280, // Simulado
        corBadge: "bg-yellow-100 text-yellow-800",
      },
      tarde: {
        label: "Tarde",
        horarioLabel: "12:01 - 18:00",
        exames: examePorPeriodo.tarde.length,
        pacientes: Math.floor(examePorPeriodo.tarde.length * 0.82), // Simulado
        receita: examePorPeriodo.tarde.length * 260, // Simulado
        corBadge: "bg-orange-100 text-orange-800",
      },
      noite: {
        label: "Noite",
        horarioLabel: "18:01 - 00:00",
        exames: examePorPeriodo.noite.length,
        pacientes: Math.floor(examePorPeriodo.noite.length * 0.70), // Simulado
        receita: examePorPeriodo.noite.length * 190, // Simulado
        corBadge: "bg-blue-100 text-blue-800",
      },
    }

    const totalExames = Object.values(periodosData).reduce((acc, val) => acc + val.exames, 0)
    const totalPacientes = Object.values(periodosData).reduce((acc, val) => acc + val.pacientes, 0)
    const totalReceita = Object.values(periodosData).reduce((acc, val) => acc + val.receita, 0)

    const periodosComCalculos = Object.entries(periodosData).map(([key, data]) => ({
      ...data,
      id: key,
      percentualTotal: totalExames > 0 ? ((data.exames / totalExames) * 100) : 0,
      mediaPorPaciente: data.pacientes > 0 ? (data.receita / data.pacientes) : 0,
    }))

    return {
      periodos: periodosComCalculos,
      totalExames,
      totalPacientes,
      totalReceita,
      mediaGeralPorPaciente: totalPacientes > 0 ? (totalReceita / totalPacientes) : 0,
    }
  }

  const examesParaExibir = () => {
    if (periodoSelecionado === "todos") {
      return [
        ...examePorPeriodo.madrugada.map(ex => ({ ...ex, periodo: "Madrugada" })),
        ...examePorPeriodo.manha.map(ex => ({ ...ex, periodo: "Manhã" })),
        ...examePorPeriodo.tarde.map(ex => ({ ...ex, periodo: "Tarde" })),
        ...examePorPeriodo.noite.map(ex => ({ ...ex, periodo: "Noite" })),
      ].sort((a, b) => a.horario.localeCompare(b.horario))
    }
    return examePorPeriodo[periodoSelecionado] || []
  }

  const statsCalculados = getPeriodoStats()

  const handleHojeClick = () => {
    const hoje = new Date();
    setDataSelecionada(hoje);
    setAnoSelecionado(hoje.getFullYear().toString());
    setMesSelecionado((hoje.getMonth() + 1).toString().padStart(2, '0'));
  };

  const handleOntemClick = () => {
    const ontem = subDays(new Date(), 1);
    setDataSelecionada(ontem);
    setAnoSelecionado(ontem.getFullYear().toString());
    setMesSelecionado((ontem.getMonth() + 1).toString().padStart(2, '0'));
  };

  const handleAnoChange = (novoAno) => {
    setAnoSelecionado(novoAno);
    // Atualiza dataSelecionada para o primeiro dia do mês atual no novo ano
    // Preserva o dia se possível, senão vai para o último dia do novo mês/ano
    const diaAtual = dataSelecionada.getDate();
    let novaData = new Date(parseInt(novoAno), parseInt(mesSelecionado) - 1, diaAtual);
    if (novaData.getMonth() !== parseInt(mesSelecionado) -1) { // O dia não existe no novo mês (ex: 31 Fev)
        novaData = new Date(parseInt(novoAno), parseInt(mesSelecionado), 0); // Último dia do mês anterior
    }
    setDataSelecionada(novaData);
  };

  const handleMesChange = (novoMes) => {
    setMesSelecionado(novoMes);
    // Atualiza dataSelecionada para o primeiro dia do novo mês no ano atual
    // Preserva o dia se possível, senão vai para o último dia do novo mês/ano
    const diaAtual = dataSelecionada.getDate();
    let novaData = new Date(parseInt(anoSelecionado), parseInt(novoMes) - 1, diaAtual);
     if (novaData.getMonth() !== parseInt(novoMes) -1) { // O dia não existe no novo mês (ex: 31 Fev)
        novaData = new Date(parseInt(anoSelecionado), parseInt(novoMes), 0); // Último dia do mês anterior
    }
    setDataSelecionada(novaData);
  };

  const handleDateSelect = (date) => {
    if (date) {
      setDataSelecionada(date);
      setAnoSelecionado(date.getFullYear().toString());
      setMesSelecionado((date.getMonth() + 1).toString().padStart(2, '0'));
    }
  };


  const meses = [
    { value: "01", label: "Janeiro" },
    { value: "02", label: "Fevereiro" },
    { value: "03", label: "Março" },
    { value: "04", label: "Abril" },
    { value: "05", label: "Maio" },
    { value: "06", label: "Junho" },
    { value: "07", label: "Julho" },
    { value: "08", label: "Agosto" },
    { value: "09", label: "Setembro" },
    { value: "10", label: "Outubro" },
    { value: "11", label: "Novembro" },
    { value: "12", label: "Dezembro" },
  ];

  const anos = Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() - 5 + i).toString());

  // Dados simulados para os novos cards
  const tiposExamesMaisRealizados = [
    { id: 1, nome: "Ultrassonografia", quantidade: 35, percentual: 31 },
    { id: 2, nome: "Raio-X", quantidade: 28, percentual: 25 },
    { id: 3, nome: "Tomografia", quantidade: 23, percentual: 20 },
    { id: 4, nome: "Ressonância", quantidade: 17, percentual: 15 },
    { id: 5, nome: "Ecocardiograma", quantidade: 10, percentual: 9 },
  ];

  const horariosMaiorMovimento = [
    {
      id: 1, periodo: "Manhã", horario: "08:00 - 12:00", pacientes: 35, receita: 8500, exames: 45,
      corBg: "bg-green-50", corTexto: "text-green-700", corIcone: "text-green-600"
    },
    {
      id: 2, periodo: "Tarde", horario: "12:01 - 18:00", pacientes: 30, receita: 7200, exames: 38,
      corBg: "bg-blue-50", corTexto: "text-blue-700", corIcone: "text-blue-600"
    },
    {
      id: 3, periodo: "Noite", horario: "18:01 - 00:00", pacientes: 18, receita: 4100, exames: 22,
      corBg: "bg-orange-50", corTexto: "text-orange-700", corIcone: "text-orange-600"
    },
    {
      id: 4, periodo: "Madrugada", horario: "00:01 - 05:59", pacientes: 6, receita: 1800, exames: 8,
      corBg: "bg-purple-50", corTexto: "text-purple-700", corIcone: "text-purple-600"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100"> {/* Alterado para bg-gray-100 para melhor contraste como na imagem */}
      {/* Header (removido para simplificar e focar no conteúdo da página, pode ser um componente global) */}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8"> {/* Aumentado py */}
        {/* Título e Botão Voltar */}
        <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Exames por Período do Dia</h1>
              <p className="text-gray-500 mt-1">Análise detalhada dos exames realizados por período</p>
            </div>
            <Link href="/">
              <Button variant="outline" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Voltar</span>
              </Button>
            </Link>
          </div>

        {/* Filtros */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Filter className="h-5 w-5 mr-2 text-gray-600" />
              Filtrar por Data
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end">
            <div>
              <label htmlFor="ano" className="block text-sm font-medium text-gray-700 mb-1">Ano</label>
              <Select value={anoSelecionado} onValueChange={handleAnoChange}>
                <SelectTrigger id="ano">
                  <SelectValue placeholder="Selecione o Ano" />
                </SelectTrigger>
                <SelectContent>
                  {anos.map(ano => (
                    <SelectItem key={ano} value={ano}>{ano}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="mes" className="block text-sm font-medium text-gray-700 mb-1">Mês</label>
              <Select value={mesSelecionado} onValueChange={handleMesChange}>
                <SelectTrigger id="mes">
                  <SelectValue placeholder="Selecione o Mês" />
                </SelectTrigger>
                <SelectContent>
                  {meses.map(mes => (
                    <SelectItem key={mes.value} value={mes.value}>{mes.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="data" className="block text-sm font-medium text-gray-700 mb-1">Data Específica</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(dataSelecionada, "dd/MM/yyyy", { locale: ptBR })}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dataSelecionada}
                    onSelect={handleDateSelect}
                    initialFocus
                    locale={ptBR}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="md:col-span-1 lg:col-span-2 flex space-x-2 items-end">
              <Button onClick={handleHojeClick} className="w-full bg-blue-600 hover:bg-blue-700">Hoje</Button>
              <Button onClick={handleOntemClick} variant="outline" className="w-full">Ontem</Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Data Analisada e Status */}
        <Card className="mb-8 p-4 bg-blue-50 border-l-4 border-blue-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-blue-700">Data Analisada:</p>
              <p className="text-lg font-semibold text-blue-800">
                {format(dataSelecionada, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </p>
            </div>
            <div>
              <p className="text-sm text-blue-700">Período Selecionado:</p>
              <p className="text-lg font-semibold text-blue-800">
                {meses.find(m => m.value === mesSelecionado)?.label} de {anoSelecionado}
              </p>
            </div>
            <div>
                <Badge className="bg-green-500 text-white">
                  Status dos Dados: Atualizado
                </Badge>
            </div>
          </div>
        </Card>

        {/* Cards de Resumo Globais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total de Exames</CardTitle>
              <BarChart3 className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-800">{statsCalculados.totalExames}</div>
              <p className="text-xs text-gray-400">Exames realizados hoje</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total de Pacientes</CardTitle>
              <Users2 className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-800">{statsCalculados.totalPacientes}</div>
              <p className="text-xs text-gray-400">Pacientes atendidos</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Receita Total</CardTitle>
              <DollarSign className="h-5 w-5 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-800">
                {statsCalculados.totalReceita.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </div>
              <p className="text-xs text-gray-400">Faturamento do dia</p>
            </CardContent>
          </Card>
        </div>

        {/* Card de Distribuição de Exames por Período (Ajustado para usar statsCalculados) */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Distribuição de Exames por Período</CardTitle>
            <CardDescription>Quantidade de exames realizados em cada período do dia</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {statsCalculados.periodos.map((pData) => {
                const percentage = statsCalculados.totalExames > 0 ? ((pData.exames / statsCalculados.totalExames) * 100).toFixed(1) : 0;
                return (
                  <Card key={pData.id} className={`border-l-4 ${pData.corBadge.replace('text-', 'border-').replace('bg-', 'border-')} ${pData.corBadge.replace('text-', 'bg-')} shadow`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">{pData.label}</p>
                          <p className="text-2xl font-bold text-gray-900">{pData.exames}</p>
                          <p className="text-xs text-gray-500">
                            {percentage}% ({pData.exames} de {statsCalculados.totalExames})
                          </p>
                        </div>
                        <Clock className={`h-6 w-6 ${pData.corBadge.replace('bg-', 'text-').replace('-600', '-700')}`} />
                      </div>
                       <div className="mt-2 h-2 w-full bg-gray-200 rounded">
                        <div 
                          className={`h-2 rounded ${pData.corBadge.replace('text-', 'bg-').replace('-800', '-500')}`} 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </CardContent>
                  </Card>
                );
            })}
          </CardContent>
        </Card>
        

        {/* Tabela Detalhamento Completo por Período */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Detalhamento Completo por Período</CardTitle>
            <CardDescription>Resumo completo dos dados por período do dia</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Período</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Horário</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exames</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pacientes</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receita</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% do Total</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Média por Paciente</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {statsCalculados.periodos.map((p) => (
                    <tr key={p.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={p.corBadge}>{p.label}</Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.horarioLabel}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.exames}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.pacientes}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">{p.receita.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <div className="w-20 bg-gray-200 rounded-full h-2.5 mr-2">
                            <div className={`${p.corBadge.replace('text-','bg-').replace('-800','-500')} h-2.5 rounded-full`} style={{ width: `${p.percentualTotal.toFixed(0)}%` }}></div>
                          </div>
                          {p.percentualTotal.toFixed(1)}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-semibold">{p.mediaPorPaciente.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase">TOTAL</td>
                    <td className="px-6 py-3 text-left text-sm text-gray-500">24h</td>
                    <td className="px-6 py-3 text-left text-sm font-bold text-gray-900">{statsCalculados.totalExames}</td>
                    <td className="px-6 py-3 text-left text-sm font-bold text-gray-700">{statsCalculados.totalPacientes}</td>
                    <td className="px-6 py-3 text-left text-sm font-bold text-green-600">{statsCalculados.totalReceita.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td className="px-6 py-3 text-left text-sm font-bold text-gray-700">100%</td>
                    <td className="px-6 py-3 text-left text-sm font-bold text-blue-600">{statsCalculados.mediaGeralPorPaciente.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Tipos de Exames Mais Realizados e Horários de Maior Movimento */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <ListChecks className="h-6 w-6 mr-2 text-indigo-600" />
                Tipos de Exames Mais Realizados
              </CardTitle>
              <CardDescription>Ranking dos exames mais solicitados</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {tiposExamesMaisRealizados.map((exame, index) => (
                  <li key={exame.id} className="flex items-center justify-between p-3 rounded-md hover:bg-gray-50">
                    <div className="flex items-center">
                      <span className={`text-sm font-semibold ${index < 3 ? 'text-indigo-700' : 'text-gray-600'} w-6`}>{index + 1}°</span>
                      <span className={`ml-2 text-sm ${index < 3 ? 'font-semibold text-gray-800' : 'text-gray-700'}`}>{exame.nome}</span>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-bold ${index < 3 ? 'text-indigo-700' : 'text-gray-800'}`}>{exame.quantidade}</p>
                      <p className="text-xs text-gray-500">{exame.percentual}%</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <TrendingUpIcon className="h-6 w-6 mr-2 text-teal-600" />
                Horários de Maior Movimento
              </CardTitle>
              <CardDescription>Períodos com maior concentração de exames</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {horariosMaiorMovimento.map((horario) => (
                <div key={horario.id} className={`p-4 rounded-lg shadow-sm ${horario.corBg}`}>
                  <div className="flex justify-between items-start mb-1">
                    <h4 className={`text-md font-semibold ${horario.corTexto}`}>{horario.id}° - {horario.periodo}</h4>
                    <Badge className={`${horario.corIcone.replace('text-','bg-').replace('-600','-100')} ${horario.corIcone.replace('-600','-700')}`}>
                      {horario.exames} exames
                    </Badge>
                  </div>
                  <p className={`text-xs ${horario.corTexto.replace('-700','-500')} mb-2`}>Horário: {horario.horario}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center">
                      <Users className={`h-4 w-4 mr-1 ${horario.corIcone}`} /> 
                      <span className={horario.corTexto}>Pacientes: {horario.pacientes}</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className={`h-4 w-4 mr-1 ${horario.corIcone}`} /> 
                      <span className={horario.corTexto}>Receita: {horario.receita.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Lista de Exames Detalhada por Período (Opcional, pode ser removida se a tabela acima for suficiente) */}
        {/* <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Stethoscope className="h-5 w-5" />
              <span>
                {periodoSelecionado === "todos" 
                  ? "Todos os Exames" 
                  : `Exames - ${periodoSelecionado.charAt(0).toUpperCase() + periodoSelecionado.slice(1)}`
                }
              </span>
            </CardTitle>
            <CardDescription>
              Exames para {format(dataSelecionada, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {examesParaExibir().map((exame) => (
                <div
                  key={exame.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
                      <Stethoscope className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{exame.paciente}</h4>
                      <p className="text-sm text-gray-600">{exame.exame}</p>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="font-semibold text-gray-900">{exame.horario}</p>
                    <p className="text-sm text-gray-600">{exame.medico}</p>
                    {exame.periodo && (
                      <Badge className="text-xs mt-1 bg-gray-100 text-gray-800">
                        {exame.periodo}
                      </Badge>
                    )}
                  </div>

                  <Badge className={getStatusColor(exame.status)}>{exame.status}</Badge>
                </div>
              ))}
              
              {examesParaExibir().length === 0 && (
                <div className="text-center py-8">
                  <Stethoscope className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">Nenhum exame encontrado para o período selecionado.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card> */}
      </main>
    </div>
  )
}
