import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Search,
  Home,
  Calendar,
  Users,
  UserCheck,
  Plus,
  Activity,
  CheckCircle,
  Clock,
  FileText,
} from "lucide-react"
import Link from "next/link"

export default function DashboardExamesPage() {
  const examesRealizados = [
    {
      id: 1,
      paciente: "Maria Silva",
      exame: "Ultrassonografia Abdominal",
      medico: "Dr. Carlos Mendes",
      horario: "08:30",
      status: "Concluído",
      resultado: "Normal",
    },
    {
      id: 2,
      paciente: "João Pereira",
      exame: "Raio-X Tórax",
      medico: "Dra. Ana Souza",
      horario: "09:45",
      status: "Concluído",
      resultado: "Normal",
    },
    {
      id: 3,
      paciente: "Ana Costa",
      exame: "Ressonância Magnética",
      medico: "Dr. Paulo Ribeiro",
      horario: "10:15",
      status: "Em Análise",
      resultado: "Aguardando",
    },
    {
      id: 4,
      paciente: "Pedro Santos",
      exame: "Tomografia",
      medico: "Dra. Carla Santos",
      horario: "11:00",
      status: "Concluído",
      resultado: "Alterado",
    },
  ]

  const estatisticas = [
    {
      titulo: "Exames Realizados",
      valor: "18",
      icone: Activity,
      cor: "text-blue-600",
      bgCor: "bg-blue-50",
    },
    {
      titulo: "Resultados Normais",
      valor: "14",
      icone: CheckCircle,
      cor: "text-green-600",
      bgCor: "bg-green-50",
    },
    {
      titulo: "Em Análise",
      valor: "3",
      icone: Clock,
      cor: "text-yellow-600",
      bgCor: "bg-yellow-50",
    },
    {
      titulo: "Alterados",
      valor: "1",
      icone: FileText,
      cor: "text-red-600",
      bgCor: "bg-red-50",
    },
  ]

  const tiposExames = [
    { tipo: "Ultrassonografia", quantidade: 6, porcentagem: 33 },
    { tipo: "Raio-X", quantidade: 5, porcentagem: 28 },
    { tipo: "Ressonância", quantidade: 4, porcentagem: 22 },
    { tipo: "Tomografia", quantidade: 3, porcentagem: 17 },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "Concluído":
        return "bg-green-100 text-green-800"
      case "Em Análise":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getResultadoColor = (resultado) => {
    switch (resultado) {
      case "Normal":
        return "text-green-600"
      case "Alterado":
        return "text-red-600"
      case "Aguardando":
        return "text-yellow-600"
      default:
        return "text-gray-600"
    }
  }

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
              <Link href="/exames/novo">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Exame
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
            <h1 className="text-3xl font-bold text-gray-900">Dashboard - Exames Realizados</h1>
            <p className="text-gray-600">Visão detalhada dos exames realizados hoje</p>
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
          {/* Exames Realizados */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Exames Realizados Hoje</CardTitle>
              <CardDescription>Lista dos exames concluídos e em análise</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {examesRealizados.map((exame) => (
                  <div
                    key={exame.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{exame.paciente}</h4>
                      <p className="text-sm text-gray-600">{exame.exame}</p>
                      <p className="text-xs text-gray-500">
                        {exame.medico} - {exame.horario}
                      </p>
                    </div>

                    <div className="text-center mr-4">
                      <Badge className={getStatusColor(exame.status)}>{exame.status}</Badge>
                      <p className={`text-sm font-medium ${getResultadoColor(exame.resultado)}`}>{exame.resultado}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tipos de Exames */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Distribuição por Tipo</CardTitle>
              <CardDescription>Quantidade de exames por tipo realizado hoje</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tiposExames.map((tipo, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-900">{tipo.tipo}</span>
                        <span className="text-sm text-gray-600">{tipo.quantidade} exames</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: `${tipo.porcentagem}%` }}></div>
                      </div>
                    </div>
                    <span className="ml-4 text-sm font-medium text-gray-600">{tipo.porcentagem}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-center space-x-4">
          <Link href="/exames">
            <Button variant="outline">Ver Todos os Exames</Button>
          </Link>
          <Link href="/agendamentos/novo">
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Agendar Exame
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
