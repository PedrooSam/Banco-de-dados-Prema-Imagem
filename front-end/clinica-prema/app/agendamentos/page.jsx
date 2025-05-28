import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Home, Calendar, Users, UserCheck, Plus, Filter, Eye, Edit, Clock, FileText } from "lucide-react"
import Link from "next/link"

export default function AgendamentosPage() {
  const agendamentos = [
    {
      id: 1,
      paciente: "Maria Silva Santos",
      exame: "Ultrassom Abdominal",
      medico: "Dr. João Cardiologista",
      data: "2024-01-15",
      horario: "14:30",
      status: "Confirmado",
      valor: "R$ 150,00",
      formaPagamento: "Cartão de Crédito",
      observacoes: "Paciente em jejum",
    },
    {
      id: 2,
      paciente: "João Carlos Oliveira",
      exame: "Raio-X Tórax",
      medico: "Dr. Ana Pneumologista",
      data: "2024-01-15",
      horario: "15:00",
      status: "Aguardando",
      valor: "R$ 80,00",
      formaPagamento: "Dinheiro",
      observacoes: "Primeira consulta",
    },
    {
      id: 3,
      paciente: "Ana Costa Ferreira",
      exame: "Ressonância Magnética",
      medico: "Dr. Carlos Neurologista",
      data: "2024-01-16",
      horario: "09:00",
      status: "Confirmado",
      valor: "R$ 450,00",
      formaPagamento: "PIX",
      observacoes: "Retirar objetos metálicos",
    },
    {
      id: 4,
      paciente: "Pedro Santos Lima",
      exame: "Ecocardiograma",
      medico: "Dr. João Cardiologista",
      data: "2024-01-16",
      horario: "10:30",
      status: "Cancelado",
      valor: "R$ 200,00",
      formaPagamento: "Cartão de Débito",
      observacoes: "Cancelado pelo paciente",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmado":
        return "bg-green-100 text-green-800"
      case "Aguardando":
        return "bg-yellow-100 text-yellow-800"
      case "Cancelado":
        return "bg-red-100 text-red-800"
      case "Realizado":
        return "bg-blue-100 text-blue-800"
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
              <Link href="/agendamentos" className="flex items-center space-x-1 text-green-600 font-medium">
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
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Novo Agendamento
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Agendamentos</h1>
          <p className="text-gray-600">Gerenciar agendamentos de exames</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filtros de Busca</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input placeholder="Buscar paciente..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="confirmado">Confirmado</SelectItem>
                  <SelectItem value="aguardando">Aguardando</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                  <SelectItem value="realizado">Realizado</SelectItem>
                </SelectContent>
              </Select>
              <Input type="date" placeholder="Data" />
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtros Avançados
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Appointments List */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Agendamentos</CardTitle>
            <CardDescription>Total de {agendamentos.length} agendamentos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {agendamentos.map((agendamento) => (
                <div key={agendamento.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-lg font-semibold">{agendamento.paciente}</h3>
                        <Badge className={getStatusColor(agendamento.status)}>{agendamento.status}</Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div>
                          <p className="flex items-center mb-1">
                            <Calendar className="h-4 w-4 mr-2" />
                            <strong>Data:</strong> {new Date(agendamento.data).toLocaleDateString("pt-BR")}
                          </p>
                          <p className="flex items-center mb-1">
                            <Clock className="h-4 w-4 mr-2" />
                            <strong>Horário:</strong> {agendamento.horario}
                          </p>
                          <p>
                            <strong>Exame:</strong> {agendamento.exame}
                          </p>
                        </div>
                        <div>
                          <p>
                            <strong>Médico:</strong> {agendamento.medico}
                          </p>
                          <p>
                            <strong>Valor:</strong> {agendamento.valor}
                          </p>
                          <p>
                            <strong>Pagamento:</strong> {agendamento.formaPagamento}
                          </p>
                        </div>
                        <div>
                          <p>
                            <strong>Observações:</strong>
                          </p>
                          <p className="text-xs">{agendamento.observacoes}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      {agendamento.status === "Confirmado" && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Realizar
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
