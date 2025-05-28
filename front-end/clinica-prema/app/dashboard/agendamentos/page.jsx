import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, Home, Calendar, Users, UserCheck, Plus, Clock, TrendingUp, FileText } from "lucide-react"
import Link from "next/link"

export default function DashboardAgendamentosPage() {
  const agendamentosHoje = [
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
  ]

  const estatisticas = [
    {
      titulo: "Total Agendado",
      valor: "24",
      icone: Calendar,
      cor: "text-blue-600",
      bgCor: "bg-blue-50",
    },
    {
      titulo: "Confirmados",
      valor: "18",
      icone: TrendingUp,
      cor: "text-green-600",
      bgCor: "bg-green-50",
    },
    {
      titulo: "Aguardando",
      valor: "4",
      icone: Clock,
      cor: "text-yellow-600",
      bgCor: "bg-yellow-50",
    },
    {
      titulo: "Cancelados",
      valor: "2",
      icone: FileText,
      cor: "text-red-600",
      bgCor: "bg-red-50",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-green-600">PremaImagem</span>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Buscar..." className="pl-10 w-full" />
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex items-center space-x-6">
              <Link href="/" className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                <Home className="h-4 w-4" />
                <span>Início</span>
              </Link>
              <Link href="/agendamentos" className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                <Calendar className="h-4 w-4" />
                <span>Agendamentos</span>
              </Link>
              <Link href="/pacientes" className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                <Users className="h-4 w-4" />
                <span>Pacientes</span>
              </Link>
              <Link href="/medicos" className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                <UserCheck className="h-4 w-4" />
                <span>Médicos</span>
              </Link>
              <Link href="/agendamentos/novo">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Agendamento
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="flex items-center space-x-4 mb-6">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard - Agendamentos Hoje</h1>
            <p className="text-gray-600">Visão detalhada dos agendamentos do dia</p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {estatisticas.map((stat, index) => {
            const Icon = stat.icone
            return (
              <Card key={index} className={`${stat.bgCor} border-l-4 border-l-current`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">{stat.titulo}</CardTitle>
                  <Icon className={`h-4 w-4 ${stat.cor}`} />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${stat.cor}`}>{stat.valor}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Agendamentos da Manhã */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Agendamentos da Manhã</CardTitle>
              <CardDescription>Período: 08:00 - 12:00</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {agendamentosHoje.slice(0, 3).map((agendamento) => (
                  <div
                    key={agendamento.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                        <Clock className="h-4 w-4 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{agendamento.paciente}</h4>
                        <p className="text-sm text-gray-600">{agendamento.exame}</p>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="font-semibold text-gray-900">{agendamento.horario}</p>
                      <p className="text-sm text-gray-600">{agendamento.medico}</p>
                    </div>

                    <Badge className={agendamento.statusColor}>{agendamento.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Agendamentos da Tarde */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Agendamentos da Tarde</CardTitle>
              <CardDescription>Período: 13:00 - 18:00</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {agendamentosHoje.slice(3, 6).map((agendamento) => (
                  <div
                    key={agendamento.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                        <Clock className="h-4 w-4 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{agendamento.paciente}</h4>
                        <p className="text-sm text-gray-600">{agendamento.exame}</p>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="font-semibold text-gray-900">{agendamento.horario}</p>
                      <p className="text-sm text-gray-600">{agendamento.medico}</p>
                    </div>

                    <Badge className={agendamento.statusColor}>{agendamento.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-center space-x-4">
          <Link href="/agendamentos">
            <Button variant="outline">Ver Todos os Agendamentos</Button>
          </Link>
          <Link href="/agendamentos/novo">
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Novo Agendamento
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
