import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Home, Calendar, Users, UserCheck, Plus, Filter, Eye, Edit, Trash2, FileText } from "lucide-react"
import Link from "next/link"

export default function PacientesPage() {
  const pacientes = [
    {
      id: 1,
      nome: "Maria Silva Santos",
      nomeSocial: "Maria Silva",
      cpf: "123.456.789-00",
      rg: "12.345.678-9",
      dataNascimento: "15/03/1985",
      telefone: "(11) 99999-9999",
      email: "maria.silva@email.com",
      nomeMae: "Ana Santos Silva",
      endereco: "Rua das Flores, 123 - São Paulo/SP",
      status: "Ativo",
    },
    {
      id: 2,
      nome: "João Carlos Oliveira",
      nomeSocial: "João Carlos",
      cpf: "987.654.321-00",
      rg: "98.765.432-1",
      dataNascimento: "22/07/1978",
      telefone: "(11) 88888-8888",
      email: "joao.carlos@email.com",
      nomeMae: "Carmen Oliveira",
      endereco: "Av. Paulista, 456 - São Paulo/SP",
      status: "Ativo",
    },
    {
      id: 3,
      nome: "Ana Costa Ferreira",
      nomeSocial: "Ana Costa",
      cpf: "456.789.123-00",
      rg: "45.678.912-3",
      dataNascimento: "10/12/1992",
      telefone: "(11) 77777-7777",
      email: "ana.costa@email.com",
      nomeMae: "Lucia Ferreira Costa",
      endereco: "Rua Augusta, 789 - São Paulo/SP",
      status: "Inativo",
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
              <Link href="/pacientes" className="flex items-center space-x-1 text-green-600 font-medium">
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
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Pacientes</h1>
          <p className="text-gray-600">Gerenciar cadastro de pacientes</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filtros de Busca</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input placeholder="Buscar por nome, CPF ou email..." className="pl-10" />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtros Avançados
              </Button>
              <Button variant="outline">Exportar Lista</Button>
            </div>
          </CardContent>
        </Card>

        {/* Patients List */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Pacientes</CardTitle>
            <CardDescription>Total de {pacientes.length} pacientes cadastrados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pacientes.map((paciente) => (
                <div key={paciente.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold">{paciente.nome}</h3>
                        <Badge variant={paciente.status === "Ativo" ? "default" : "secondary"}>{paciente.status}</Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div>
                          <p>
                            <strong>Nome Social:</strong> {paciente.nomeSocial}
                          </p>
                          <p>
                            <strong>CPF:</strong> {paciente.cpf}
                          </p>
                          <p>
                            <strong>RG:</strong> {paciente.rg}
                          </p>
                        </div>
                        <div>
                          <p>
                            <strong>Data Nascimento:</strong> {paciente.dataNascimento}
                          </p>
                          <p>
                            <strong>Telefone:</strong> {paciente.telefone}
                          </p>
                          <p>
                            <strong>Email:</strong> {paciente.email}
                          </p>
                        </div>
                        <div>
                          <p>
                            <strong>Nome da Mãe:</strong> {paciente.nomeMae}
                          </p>
                          <p>
                            <strong>Endereço:</strong> {paciente.endereco}
                          </p>
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
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
