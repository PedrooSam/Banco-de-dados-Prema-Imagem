"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Home,
  Calendar,
  Users,
  UserCheck,
  Plus,
  Clock,
  CalendarDays,
  UserPlus,
  Stethoscope,
  FileText,
  CreditCard,
  Package,
  DollarSign,
  BarChart3,
  ClipboardList,
  TrendingDown,
  AlertTriangle,
  ShoppingCart,
  Archive,
  Filter,
  PieChart,
  UsersRound,
  Gift,
  Warehouse,
  Truck,
} from "lucide-react"
import Link from "next/link"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const dashboardCards = [
  {
    title: "Agendamentos Hoje",
    value: "24",
    change: "+8% em relação à semana passada",
    borderColor: "border-l-green-500",
    bgColor: "bg-green-50",
    href: "agendamentos",
  },
  {
    title: "Exames Realizados",
    value: "18",
    change: "+12% em relação à semana passada",
    borderColor: "border-l-yellow-500",
    bgColor: "bg-yellow-50",
    href: "exames",
  },
  {
    title: "Novos Pacientes",
    value: "7",
    change: "+3% em relação à semana passada",
    borderColor: "border-l-green-500",
    bgColor: "bg-green-50",
    href: "pacientes",
  },
  {
    title: "Faturamento Diário",
    value: "R$ 4.250",
    change: "+5% em relação à semana passada",
    borderColor: "border-l-yellow-500",
    bgColor: "bg-yellow-50",
    href: "faturamento",
  },
  {
    title: "Exames por Período do Dia",
    value: "16",
    change: "Análise detalhada por período",
    borderColor: "border-l-blue-500",
    bgColor: "bg-blue-50",
    href: "/dashboard/exames-periodo",
  },
  {
    title: "Contagem Exames Mês/Ano",
    value: "Verificar",
    change: "Contagem de exames por mês e ano",
    borderColor: "border-l-purple-500",
    bgColor: "bg-purple-50",
    href: "/dashboard/contagem-exames-mes-ano",
  },
  {
    title: "Médicos com Mais Atendimentos",
    value: "Top 3", // Placeholder
    change: "Performance mensal dos médicos",
    borderColor: "border-l-teal-500",
    bgColor: "bg-teal-50",
    href: "/dashboard/medicos-mais-atendimentos",
  },
  {
    title: "Exames por Faixa Etária",
    value: "Detalhes", 
    change: "Contagem de exames por faixa etária",
    borderColor: "border-l-orange-500",
    bgColor: "bg-orange-50",
    href: "/dashboard/exames-faixa-etaria",
  },
  {
    title: "Total de Exames Agendados por Dia",
    value: "Consultar", 
    change: "Contagem diária de tipos de exame",
    borderColor: "border-l-cyan-500",
    bgColor: "bg-cyan-50",
    href: "/dashboard/total-exames-dia",
  },
  {
    title: "Média de Exames por Paciente",
    value: "Analisar", 
    change: "Número médio de exames por agendamento do paciente",
    borderColor: "border-l-pink-500",
    bgColor: "bg-pink-50",
    href: "/dashboard/media-exames-paciente",
  },
  {
    title: "Exames Agendados por Hora",
    value: "Verificar", 
    change: "Contagem de exames por hora em um dia específico",
    borderColor: "border-l-indigo-500",
    bgColor: "bg-indigo-50",
    href: "/dashboard/exames-agendados-hora",
  },
  {
    title: "Médicos com Mais Exames Realizados",
    value: "Ranking", 
    change: "Total de exames realizados por médico",
    borderColor: "border-l-red-500",
    bgColor: "bg-red-50",
    href: "/dashboard/medicos-mais-exames",
  },
  {
    title: "Percentual de Exames por Médico",
    value: "Analisar", 
    change: "Percentual de participação nos exames totais",
    borderColor: "border-l-lime-500",
    bgColor: "bg-lime-50",
    href: "/dashboard/percentual-exames-medico",
  },
  {
    title: "Pacientes com Mais Exames Realizados",
    value: "Ranking", 
    change: "Total de exames realizados por paciente",
    borderColor: "border-l-emerald-500",
    bgColor: "bg-emerald-50",
    href: "/dashboard/pacientes-mais-exames",
  },
  {
    title: "Pacientes que Indicam", // Ajustado para melhor visualização no card
    value: "Verificar", 
    change: "Pacientes que trouxeram novos pacientes",
    borderColor: "border-l-sky-500", // Nova cor
    bgColor: "bg-sky-50",
    href: "/dashboard/pacientes-indicacoes",
  },
  {
    title: "Produtos Mais Utilizados",
    value: "Ranking", 
    change: "Itens mais consumidos pela clínica",
    borderColor: "border-l-amber-500",
    bgColor: "bg-amber-50",
    href: "/dashboard/produtos-mais-utilizados",
  },
  {
    title: "Quantidade de Produtos",
    value: "Consultar", 
    change: "Visão geral do inventário de produtos",
    borderColor: "border-l-indigo-500",
    bgColor: "bg-indigo-50",
    href: "/dashboard/quantidade-produtos",
  },
]

export default function HomePage() {
  const [periodoSelecionado, setPeriodoSelecionado] = useState("manha")
  const [mostrarTodos, setMostrarTodos] = useState(false)
  const stats = [
    {
      title: "Agendamentos Hoje",
      value: "24",
      change: "+8% em relação à semana passada",
      borderColor: "border-l-green-500",
      bgColor: "bg-green-50",
      href: "agendamentos",
    },
    {
      title: "Exames Realizados",
      value: "18",
      change: "+12% em relação à semana passada",
      borderColor: "border-l-yellow-500",
      bgColor: "bg-yellow-50",
      href: "exames",
    },
    {
      title: "Exames por Período do Dia",
      value: "16",
      change: "Análise detalhada por período",
      borderColor: "border-l-blue-500",
      bgColor: "bg-blue-50",
      href: "/dashboard/exames-periodo",
    },
    {
      title: "Contagem Exames Mês/Ano",
      value: "Verificar",
      change: "Contagem de exames por mês e ano",
      borderColor: "border-l-purple-500",
      bgColor: "bg-purple-50",
      href: "/dashboard/contagem-exames-mes-ano",
    },
    {
      title: "Médicos com Mais Atendimentos",
      value: "Top 3", // Placeholder
      change: "Performance mensal dos médicos",
      borderColor: "border-l-teal-500",
      bgColor: "bg-teal-50",
      href: "/dashboard/medicos-mais-atendimentos",
    },
    {
      title: "Exames por Faixa Etária",
      value: "Detalhes", 
      change: "Contagem de exames por faixa etária",
      borderColor: "border-l-orange-500",
      bgColor: "bg-orange-50",
      href: "/dashboard/exames-faixa-etaria",
    },
    {
      title: "Total de Exames Agendados por Dia",
      value: "Consultar", 
      change: "Contagem diária de tipos de exame",
      borderColor: "border-l-cyan-500",
      bgColor: "bg-cyan-50",
      href: "/dashboard/total-exames-dia",
    },
    {
      title: "Média de Exames por Paciente",
      value: "Analisar", 
      change: "Número médio de exames por agendamento do paciente",
      borderColor: "border-l-pink-500",
      bgColor: "bg-pink-50",
      href: "/dashboard/media-exames-paciente",
    },
    {
      title: "Exames Agendados por Hora",
      value: "Verificar", 
      change: "Contagem de exames por hora em um dia específico",
      borderColor: "border-l-indigo-500",
      bgColor: "bg-indigo-50",
      href: "/dashboard/exames-agendados-hora",
    },
    {
      title: "Médicos com Mais Exames Realizados",
      value: "Ranking", 
      change: "Total de exames realizados por médico",
      borderColor: "border-l-red-500",
      bgColor: "bg-red-50",
      href: "/dashboard/medicos-mais-exames",
    },
    {
      title: "Percentual de Exames por Médico",
      value: "Analisar", 
      change: "Percentual de participação nos exames totais",
      borderColor: "border-l-lime-500",
      bgColor: "bg-lime-50",
      href: "/dashboard/percentual-exames-medico",
    },
    {
      title: "Pacientes com Mais Exames Realizados",
      value: "Ranking", 
      change: "Total de exames realizados por paciente",
      borderColor: "border-l-emerald-500",
      bgColor: "bg-emerald-50",
      href: "/dashboard/pacientes-mais-exames",
    },
    {
      title: "Pacientes que Indicam", // Ajustado para melhor visualização no card
      value: "Verificar", 
      change: "Pacientes que trouxeram novos pacientes",
      borderColor: "border-l-sky-500", // Nova cor
      bgColor: "bg-sky-50",
      href: "/dashboard/pacientes-indicacoes",
    },
    {
      title: "Produtos Mais Utilizados",
      value: "Ranking", 
      change: "Itens mais consumidos pela clínica",
      borderColor: "border-l-amber-500",
      bgColor: "bg-amber-50",
      href: "/dashboard/produtos-mais-utilizados",
    },
    {
      title: "Quantidade de Produtos",
      value: "Consultar", 
      change: "Visão geral do inventário de produtos",
      borderColor: "border-l-indigo-500",
      bgColor: "bg-indigo-50",
      href: "/dashboard/quantidade-produtos",
    },
    {
      title: "Compras por Fornecedor",
      value: "Analisar", 
      change: "Total vendido por cada fornecedor",
      borderColor: "border-l-orange-500",
      bgColor: "bg-orange-50",
      href: "/dashboard/compras-fornecedor",
    },
  ]

  const agendamentosManha = [
    {
      id: 1,
      paciente: "Maria Silva",
      exame: "Ultrassonografia",
      horario: "08:00",
      medico: "Dr. Carlos Mendes",
      status: "Confirmado",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 2,
      paciente: "João Pereira",
      exame: "Raio-X",
      horario: "09:15",
      medico: "Dra. Ana Souza",
      status: "Aguardando",
      statusColor: "bg-yellow-100 text-yellow-800",
    },
    {
      id: 3,
      paciente: "Luiza Costa",
      exame: "Ressonância Magnética",
      horario: "10:30",
      medico: "Dr. Paulo Ribeiro",
      status: "Confirmado",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 4,
      paciente: "Roberto Alves",
      exame: "Tomografia",
      horario: "11:45",
      medico: "Dra. Carla Santos",
      status: "Cancelado",
      statusColor: "bg-red-100 text-red-800",
    },
  ]

  const agendamentosTarde = [
    {
      id: 5,
      paciente: "Ana Beatriz",
      exame: "Ecocardiograma",
      horario: "14:00",
      medico: "Dr. Carlos Mendes",
      status: "Confirmado",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 6,
      paciente: "Pedro Santos",
      exame: "Mamografia",
      horario: "15:30",
      medico: "Dra. Ana Souza",
      status: "Aguardando",
      statusColor: "bg-yellow-100 text-yellow-800",
    },
    {
      id: 7,
      paciente: "Carla Mendes",
      exame: "Ultrassom Doppler",
      horario: "16:15",
      medico: "Dr. Paulo Ribeiro",
      status: "Confirmado",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 8,
      paciente: "Fernando Lima",
      exame: "TC Abdomen",
      horario: "17:00",
      medico: "Dra. Carla Santos",
      status: "Aguardando",
      statusColor: "bg-yellow-100 text-yellow-800",
    },
  ]

  const agendamentosNoite = [
    {
      id: 9,
      paciente: "Mariana Oliveira",
      exame: "Eletrocardiograma",
      horario: "18:30",
      medico: "Dr. Carlos Mendes",
      status: "Confirmado",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 10,
      paciente: "Rafael Costa",
      exame: "Ultrassonografia",
      horario: "19:45",
      medico: "Dra. Ana Souza",
      status: "Aguardando",
      statusColor: "bg-yellow-100 text-yellow-800",
    },
    {
      id: 11,
      paciente: "Juliana Ferreira",
      exame: "Raio-X Tórax",
      horario: "20:15",
      medico: "Dr. Paulo Ribeiro",
      status: "Confirmado",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 12,
      paciente: "Carlos Eduardo",
      exame: "Endoscopia",
      horario: "21:30",
      medico: "Dra. Carla Santos",
      status: "Cancelado",
      statusColor: "bg-red-100 text-red-800",
    },
  ]

  const agendamentosMadrugada = [
    {
      id: 13,
      paciente: "Beatriz Silva",
      exame: "TC Crânio",
      horario: "00:30",
      medico: "Dr. Carlos Mendes",
      status: "Confirmado",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 14,
      paciente: "Lucas Martins",
      exame: "Ressonância Joelho",
      horario: "02:15",
      medico: "Dra. Ana Souza",
      status: "Aguardando",
      statusColor: "bg-yellow-100 text-yellow-800",
    },
    {
      id: 15,
      paciente: "Patricia Lima",
      exame: "Ultrassom Abdominal",
      horario: "03:45",
      medico: "Dr. Paulo Ribeiro",
      status: "Confirmado",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 16,
      paciente: "Rodrigo Santos",
      exame: "Mamografia",
      horario: "05:00",
      medico: "Dra. Carla Santos",
      status: "Aguardando",
      statusColor: "bg-yellow-100 text-yellow-800",
    },
  ]

  const agendamentosAtivos = () => {
    if (mostrarTodos) {
      // Adiciona a classificação de período a cada agendamento
      const agendamentosComPeriodo = [
        ...agendamentosManha.map(ag => ({ ...ag, periodo: "Manhã", periodoColor: "bg-yellow-100 text-yellow-800" })),
        ...agendamentosTarde.map(ag => ({ ...ag, periodo: "Tarde", periodoColor: "bg-orange-100 text-orange-800" })),
        ...agendamentosNoite.map(ag => ({ ...ag, periodo: "Noite", periodoColor: "bg-blue-100 text-blue-800" })),
        ...agendamentosMadrugada.map(ag => ({ ...ag, periodo: "Madrugada", periodoColor: "bg-purple-100 text-purple-800" }))
      ]
      // Ordena por horário
      return agendamentosComPeriodo.sort((a, b) => a.horario.localeCompare(b.horario))
    }
    
    switch (periodoSelecionado) {
      case "manha":
        return agendamentosManha
      case "tarde":
        return agendamentosTarde
      case "noite":
        return agendamentosNoite
      case "madrugada":
        return agendamentosMadrugada
      default:
        return agendamentosManha
    }
  }

  const acessoRapido = [
    {
      title: "Agendamento de Exames",
      icon: CalendarDays,
      href: "/agendamentos/novo",
    },
    {
      title: "Cadastro de Pacientes",
      icon: UserPlus,
      href: "/pacientes/novo",
    },
    {
      title: "Cadastro de Médicos",
      icon: UserCheck,
      href: "/medicos/novo",
    },
    {
      title: "Cadastro de Exames",
      icon: Stethoscope,
      href: "/exames/novo",
    },
    {
      title: "Gestão de Pagamentos",
      icon: CreditCard,
      href: "/pagamentos",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  PremaImagem
                </span>
                <p className="text-xs text-gray-500 dark:text-gray-400">Sistema de Gestão</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Buscar pacientes, exames, médicos..." 
                  className="pl-12 pr-4 py-3 w-full rounded-full border-0 bg-gray-100 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 focus:ring-2 focus:ring-green-500 transition-all duration-200 shadow-sm"
                />
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 font-medium hover:bg-green-200 dark:hover:bg-green-800 transition-colors">
                <Home className="h-4 w-4" />
                <span className="hidden md:inline">Início</span>
              </Link>
              <Link href="/agendamentos" className="flex items-center space-x-2 px-4 py-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <Calendar className="h-4 w-4" />
                <span className="hidden md:inline">Agendamentos</span>
              </Link>
              <Link href="/pacientes" className="flex items-center space-x-2 px-4 py-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <Users className="h-4 w-4" />
                <span className="hidden md:inline">Pacientes</span>
              </Link>
              <Link href="/medicos" className="flex items-center space-x-2 px-4 py-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <UserCheck className="h-4 w-4" />
                <span className="hidden md:inline">Médicos</span>
              </Link>
              <Button className="ml-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200">
                <Plus className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Novo Agendamento</span>
                <span className="sm:hidden">Novo</span>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        {/* Stats Cards Carousel */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Painel de Controle</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Métricas e indicadores principais da clínica</p>
            </div>
          </div>
          
          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {stats.map((stat, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <Link href={stat.href} className="block h-full group">
                    <Card
                      className={`${stat.borderColor} border-l-4 ${stat.bgColor} dark:bg-gray-800 h-full cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 rounded-xl overflow-hidden group-hover:border-l-6`}
                    >
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                          {stat.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                          {stat.value}
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                          {stat.change}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex hover:bg-green-50 hover:border-green-200 transition-colors" />
            <CarouselNext className="hidden sm:flex hover:bg-green-50 hover:border-green-200 transition-colors" />
          </Carousel>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Agendamentos do Dia */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl rounded-2xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 space-y-4 sm:space-y-0">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
                    <CalendarDays className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Agendamentos do Dia</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400 text-sm">Visualize e gerencie os exames agendados para hoje</CardDescription>
                  </div>
                </div>
                <Button 
                  onClick={() => {
                    setMostrarTodos(!mostrarTodos)
                    if (!mostrarTodos) {
                      setPeriodoSelecionado("todos")
                    } else {
                      setPeriodoSelecionado("manha")
                    }
                  }}
                  variant="outline" 
                  className="rounded-full border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 dark:border-green-700 dark:text-green-400 dark:hover:bg-green-900 transition-all duration-200 shadow-sm"
                >
                  {mostrarTodos ? "Ver por Período" : "Ver Todos"}
                </Button>
              </CardHeader>
              <CardContent className="pt-0">
                {/* Tabs - ocultar quando mostrar todos */}
                {!mostrarTodos && (
                  <div className="grid grid-cols-2 lg:flex lg:space-x-3 gap-2 lg:gap-0 mb-8 p-2 bg-gray-50 dark:bg-gray-700 rounded-2xl">
                    <Button 
                      onClick={() => setPeriodoSelecionado("manha")}
                      className={`lg:flex-1 rounded-xl py-3 px-2 lg:px-4 font-medium transition-all duration-200 text-xs sm:text-sm ${
                        periodoSelecionado === "manha" 
                          ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-lg transform scale-105" 
                          : "text-gray-600 dark:text-gray-300 bg-transparent hover:bg-white dark:hover:bg-gray-600 shadow-sm"
                      }`}
                    >
                      🌅 Manhã
                    </Button>
                    <Button 
                      onClick={() => setPeriodoSelecionado("tarde")}
                      className={`lg:flex-1 rounded-xl py-3 px-2 lg:px-4 font-medium transition-all duration-200 text-xs sm:text-sm ${
                        periodoSelecionado === "tarde" 
                          ? "bg-gradient-to-r from-orange-400 to-red-400 text-white shadow-lg transform scale-105" 
                          : "text-gray-600 dark:text-gray-300 bg-transparent hover:bg-white dark:hover:bg-gray-600 shadow-sm"
                      }`}
                    >
                      ☀️ Tarde
                    </Button>
                    <Button 
                      onClick={() => setPeriodoSelecionado("noite")}
                      className={`lg:flex-1 rounded-xl py-3 px-2 lg:px-4 font-medium transition-all duration-200 text-xs sm:text-sm ${
                        periodoSelecionado === "noite" 
                          ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105" 
                          : "text-gray-600 dark:text-gray-300 bg-transparent hover:bg-white dark:hover:bg-gray-600 shadow-sm"
                      }`}
                    >
                      🌙 Noite
                    </Button>
                    <Button 
                      onClick={() => setPeriodoSelecionado("madrugada")}
                      className={`lg:flex-1 rounded-xl py-3 px-2 lg:px-4 font-medium transition-all duration-200 text-xs sm:text-sm ${
                        periodoSelecionado === "madrugada" 
                          ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg transform scale-105" 
                          : "text-gray-600 dark:text-gray-300 bg-transparent hover:bg-white dark:hover:bg-gray-600 shadow-sm"
                      }`}
                    >
                      🌌 Madrugada
                    </Button>
                  </div>
                )}

                {/* Título da seção quando mostrar todos */}
                {mostrarTodos && (
                  <div className="mb-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl border border-blue-100 dark:border-gray-600">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      Todos os Agendamentos do Dia
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Total de <span className="font-semibold text-blue-600 dark:text-blue-400">{agendamentosAtivos().length} agendamentos</span> programados
                    </p>
                  </div>
                )}

                {/* Appointments List */}
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  {agendamentosAtivos().map((agendamento) => (
                    <div
                      key={agendamento.id}
                      className="flex items-center justify-between p-5 border border-gray-100 dark:border-gray-700 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                          <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {agendamento.paciente}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{agendamento.exame}</p>
                        </div>
                      </div>

                      <div className="text-center">
                        <p className="font-bold text-gray-900 dark:text-white text-lg">{agendamento.horario}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{agendamento.medico}</p>
                        {/* Classificação por período quando mostrar todos */}
                        {mostrarTodos && agendamento.periodo && (
                          <Badge className={`text-xs mt-2 ${agendamento.periodoColor} rounded-full px-3 py-1`}>
                            {agendamento.periodo}
                          </Badge>
                        )}
                      </div>

                      <Badge className={`${agendamento.statusColor} rounded-full px-4 py-2 font-medium shadow-sm`}>
                        {agendamento.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Acesso Rápido */}
          <div>
            <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-0 shadow-xl">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg shadow-md">
                    <Plus className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      Acesso Rápido
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Acesse as principais funcionalidades do sistema
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {acessoRapido.map((item, index) => {
                    const Icon = item.icon
                    return (
                      <Link key={index} href={item.href}>
                        <Button
                          variant="outline"
                          className="w-full justify-start h-14 text-left bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 dark:hover:from-green-900/20 dark:hover:to-emerald-900/20 hover:border-green-300 dark:hover:border-green-600 hover:shadow-md transition-all duration-300 group"
                        >
                          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors duration-300">
                            {item.title}
                          </span>
                        </Button>
                      </Link>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Logo e Descrição */}
            <div className="space-y-4 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    PremaImagem
                  </span>
                  <p className="text-xs text-gray-300">Sistema de Gestão</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Sistema completo de gestão para clínicas de exames médicos, 
                oferecendo controle total sobre agendamentos, pacientes e relatórios.
              </p>
            </div>

            {/* Links Rápidos */}
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-white">Links Rápidos</h3>
              <div className="space-y-2">
                <Link href="/agendamentos" className="block text-gray-300 hover:text-green-400 transition-colors duration-300 text-sm">
                  Agendamentos
                </Link>
                <Link href="/pacientes" className="block text-gray-300 hover:text-green-400 transition-colors duration-300 text-sm">
                  Pacientes
                </Link>
                <Link href="/medicos" className="block text-gray-300 hover:text-green-400 transition-colors duration-300 text-sm">
                  Médicos
                </Link>
                <Link href="/exames" className="block text-gray-300 hover:text-green-400 transition-colors duration-300 text-sm">
                  Exames
                </Link>
                <Link href="/relatorios" className="block text-gray-300 hover:text-green-400 transition-colors duration-300 text-sm">
                  Relatórios
                </Link>
              </div>
            </div>

            {/* Informações de Suporte */}
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-white">Suporte</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2 text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Sistema Online</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Suporte 24/7</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Atualizações Automáticas</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-4 sm:pt-6">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
              <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
                © 2024 PremaImagem. Todos os direitos reservados.
              </p>
              <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-6 text-center sm:text-right">
                <span className="text-gray-400 text-xs sm:text-sm">Versão 1.0.0</span>
                <span className="text-gray-400 text-xs sm:text-sm hidden sm:inline">•</span>
                <span className="text-gray-400 text-xs sm:text-sm">Sistema de Gestão Clínica</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
