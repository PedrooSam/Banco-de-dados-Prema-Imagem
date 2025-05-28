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
  DollarSign,
  TrendingUp,
  CreditCard,
  PieChart,
  FileText,
} from "lucide-react"
import Link from "next/link"

export default function DashboardFaturamentoPage() {
  const transacoesHoje = [
    {
      id: 1,
      paciente: "Maria Silva",
      exame: "Ultrassonografia",
      valor: "R$ 150,00",
      formaPagamento: "Cartão de Crédito",
      horario: "08:30",
      status: "Pago",
    },
    {
      id: 2,
      paciente: "João Pereira",
      exame: "Raio-X Tórax",
      valor: "R$ 80,00",
      formaPagamento: "Dinheiro",
      horario: "09:45",
      status: "Pago",
    },
    {
      id: 3,
      paciente: "Ana Costa",
      exame: "Ressonância Magnética",
      valor: "R$ 450,00",
      formaPagamento: "PIX",
      horario: "10:15",
      status: "Pago",
    },
    {
      id: 4,
      paciente: "Pedro Santos",
      exame: "Tomografia",
      valor: "R$ 300,00",
      formaPagamento: "Cartão de Débito",
      horario: "11:00",
      status: "Pendente",
    },
  ]

  const estatisticas = [
    {
      titulo: "Faturamento Hoje",
      valor: "R$ 4.250",
      icone: DollarSign,
      cor: "text-green-600",
      bgCor: "bg-green-50",
    },
    {
      titulo: "Transações",
      valor: "24",
      icone: CreditCard,
      cor: "text-blue-600",
      bgCor: "bg-blue-50",
    },
    {
      titulo: "Ticket Médio",
      valor: "R$ 177",
      icone: TrendingUp,
      cor: "text-purple-600",
      bgCor: "bg-purple-50",
    },
    {
      titulo: "Pendentes",
      valor: "R$ 320",
      icone: PieChart,
      cor: "text-yellow-600",
      bgCor: "bg-yellow-50",
    },
  ]

  const formasPagamento = [
    { forma: "Cartão de Crédito", valor: 1680, porcentagem: 40 },
    { forma: "PIX", valor: 1275, porcentagem: 30 },
    { forma: "Cartão de Débito", valor: 850, porcentagem: 20 },
    { forma: "Dinheiro", valor: 425, porcentagem: 10 },
  ]

  const examePorValor = [
    { exame: "Ressonância Magnética", valor: "R$ 450,00", quantidade: 3 },
    { exame: "Tomografia", valor: "R$ 300,00", quantidade: 4 },
    { exame: "Ultrassonografia", valor: "R$ 150,00", quantidade: 8 },
    { exame: "Raio-X", valor: "R$ 80,00", quantidade: 9 },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "Pago":
        return "bg-green-100 text-green-800"
      case "Pendente":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
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
            <h1 className="text-3xl font-bold text-gray-900">Dashboard - Faturamento Diário</h1>
            <p className="text-gray-600">Visão detalhada do faturamento de hoje</p>
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
          {/* Transações Hoje */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Transações de Hoje</CardTitle>
              <CardDescription>Pagamentos recebidos e pendentes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transacoesHoje.map((transacao) => (
                  <div
                    key={transacao.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{transacao.paciente}</h4>
                      <p className="text-sm text-gray-600">{transacao.exame}</p>
                      <p className="text-xs text-gray-500">
                        {transacao.formaPagamento} - {transacao.horario}
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="font-bold text-green-600">{transacao.valor}</p>
                      <Badge className={getStatusColor(transacao.status)}>{transacao.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Formas de Pagamento */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Formas de Pagamento</CardTitle>
              <CardDescription>Distribuição do faturamento por forma de pagamento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {formasPagamento.map((forma, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-900">{forma.forma}</span>
                        <span className="text-sm text-gray-600">R$ {forma.valor}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: `${forma.porcentagem}%` }}></div>
                      </div>
                    </div>
                    <span className="ml-4 text-sm font-medium text-gray-600">{forma.porcentagem}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Faturamento por Exame */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Faturamento por Tipo de Exame</CardTitle>
            <CardDescription>Receita gerada por cada tipo de exame</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {examePorValor.map((item, index) => (
                <div key={index} className="text-center p-4 border rounded-lg">
                  <h3 className="font-semibold text-gray-900 text-sm">{item.exame}</h3>
                  <p className="text-xl font-bold text-green-600">{item.valor}</p>
                  <p className="text-sm text-gray-600">{item.quantidade} realizados</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-center space-x-4">
          <Button variant="outline">Relatório Completo</Button>
          <Button variant="outline">Exportar Dados</Button>
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
