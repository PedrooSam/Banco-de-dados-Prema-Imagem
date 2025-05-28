import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Home, Calendar, Users, UserCheck, Plus, Filter, Eye, Edit, Trash2, FileText } from "lucide-react"
import Link from "next/link"

export default function ExamesPage() {
  const exames = [
    {
      id: 1,
      nome: "Ultrassonografia Abdominal",
      preco: "R$ 150,00",
      preparo: "Jejum de 8 horas",
      duracao: "30 minutos",
      status: "Ativo",
    },
    {
      id: 2,
      nome: "Raio-X Tórax",
      preco: "R$ 80,00",
      preparo: "Não necessário",
      duracao: "15 minutos",
      status: "Ativo",
    },
    {
      id: 3,
      nome: "Ressonância Magnética",
      preco: "R$ 450,00",
      preparo: "Retirar objetos metálicos",
      duracao: "45 minutos",
      status: "Ativo",
    },
    {
      id: 4,
      nome: "Tomografia Computadorizada",
      preco: "R$ 300,00",
      preparo: "Jejum de 4 horas",
      duracao: "20 minutos",
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
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Exames</h1>
          <p className="text-gray-600">Gerenciar tipos de exames disponíveis</p>
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
                <Input placeholder="Buscar por nome do exame..." className="pl-10" />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtros Avançados
              </Button>
              <Button variant="outline">Exportar Lista</Button>
            </div>
          </CardContent>
        </Card>

        {/* Exams List */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Exames</CardTitle>
            <CardDescription>Total de {exames.length} tipos de exames cadastrados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {exames.map((exame) => (
                <div key={exame.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold">{exame.nome}</h3>
                        <Badge variant={exame.status === "Ativo" ? "default" : "secondary"}>{exame.status}</Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div>
                          <p>
                            <strong>Preço:</strong> {exame.preco}
                          </p>
                          <p>
                            <strong>Duração:</strong> {exame.duracao}
                          </p>
                        </div>
                        <div className="md:col-span-2">
                          <p>
                            <strong>Preparo:</strong> {exame.preparo}
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
