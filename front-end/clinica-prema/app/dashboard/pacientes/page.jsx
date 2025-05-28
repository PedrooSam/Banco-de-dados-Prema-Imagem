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
  UserPlus,
  TrendingUp,
  Activity,
  FileText,
} from "lucide-react"
import Link from "next/link"

export default function DashboardPacientesPage() {
  const novosPacientes = [
    {
      id: 1,
      nome: "Carlos Eduardo Silva",
      dataCadastro: "2024-01-15",
      telefone: "(11) 99999-1111",
      primeiroExame: "Ultrassonografia",
      status: "Ativo",
    },
    {
      id: 2,
      nome: "Fernanda Costa Santos",
      dataCadastro: "2024-01-15",
      telefone: "(11) 88888-2222",
      primeiroExame: "Raio-X Tórax",
      status: "Ativo",
    },
    {
      id: 3,
      nome: "Roberto Almeida",
      dataCadastro: "2024-01-15",
      telefone: "(11) 77777-3333",
      primeiroExame: "Ressonância",
      status: "Ativo",
    },
    {
      id: 4,
      nome: "Juliana Pereira",
      dataCadastro: "2024-01-15",
      telefone: "(11) 66666-4444",
      primeiroExame: "Tomografia",
      status: "Ativo",
    },
  ]

  const estatisticas = [
    {
      titulo: "Novos Pacientes",
      valor: "7",
      icone: UserPlus,
      cor: "text-blue-600",
      bgCor: "bg-blue-50",
    },
    {
      titulo: "Total de Pacientes",
      valor: "1,247",
      icone: Users,
      cor: "text-green-600",
      bgCor: "bg-green-50",
    },
    {
      titulo: "Pacientes Ativos",
      valor: "1,198",
      icone: TrendingUp,
      cor: "text-yellow-600",
      bgCor: "bg-yellow-50",
    },
    {
      titulo: "Retornos Hoje",
      valor: "12",
      icone: Activity,
      cor: "text-purple-600",
      bgCor: "bg-purple-50",
    },
  ]

  const faixasEtarias = [
    { faixa: "0-18 anos", quantidade: 89, porcentagem: 7 },
    { faixa: "19-35 anos", quantidade: 312, porcentagem: 25 },
    { faixa: "36-50 anos", quantidade: 436, porcentagem: 35 },
    { faixa: "51-65 anos", quantidade: 287, porcentagem: 23 },
    { faixa: "65+ anos", quantidade: 123, porcentagem: 10 },
  ]

  const exameMaisComum = [
    { exame: "Ultrassonografia", pacientes: 156 },
    { exame: "Raio-X", pacientes: 134 },
    { exame: "Ressonância", pacientes: 98 },
    { exame: "Tomografia", pacientes: 87 },
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
              <Link href="/pacientes/novo">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Paciente
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
            <h1 className="text-3xl font-bold text-gray-900">Dashboard - Novos Pacientes</h1>
            <p className="text-gray-600">Visão detalhada dos pacientes cadastrados hoje</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Novos Pacientes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Pacientes Cadastrados Hoje</CardTitle>
              <CardDescription>Lista dos novos pacientes cadastrados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {novosPacientes.map((paciente) => (
                  <div
                    key={paciente.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{paciente.nome}</h4>
                      <p className="text-sm text-gray-600">{paciente.telefone}</p>
                      <p className="text-xs text-gray-500">Primeiro exame: {paciente.primeiroExame}</p>
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-gray-600">
                        {new Date(paciente.dataCadastro).toLocaleDateString("pt-BR")}
                      </p>
                      <Badge className="bg-green-100 text-green-800">{paciente.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Faixas Etárias */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Distribuição por Idade</CardTitle>
              <CardDescription>Faixas etárias dos pacientes cadastrados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {faixasEtarias.map((faixa, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-900">{faixa.faixa}</span>
                        <span className="text-sm text-gray-600">{faixa.quantidade} pacientes</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${faixa.porcentagem}%` }}></div>
                      </div>
                    </div>
                    <span className="ml-4 text-sm font-medium text-gray-600">{faixa.porcentagem}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Exames Mais Comuns */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Exames Mais Solicitados</CardTitle>
            <CardDescription>Tipos de exames mais comuns entre os pacientes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {exameMaisComum.map((item, index) => (
                <div key={index} className="text-center p-4 border rounded-lg">
                  <h3 className="font-semibold text-gray-900">{item.exame}</h3>
                  <p className="text-2xl font-bold text-green-600">{item.pacientes}</p>
                  <p className="text-sm text-gray-600">pacientes</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-center space-x-4">
          <Link href="/pacientes">
            <Button variant="outline">Ver Todos os Pacientes</Button>
          </Link>
          <Link href="/pacientes/novo">
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Novo Paciente
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
