import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save, Search, Home, Calendar, Users, UserCheck, FileText } from "lucide-react"
import Link from "next/link"

export default function NovoExamePage() {
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
              <Button className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Salvar Exame
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="flex items-center space-x-4 mb-6">
          <Link href="/exames">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Novo Exame</h1>
            <p className="text-gray-600">Cadastrar novo tipo de exame no sistema</p>
          </div>
        </div>

        <form className="space-y-6">
          {/* Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
              <CardDescription>Dados principais do exame</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome do Exame *</Label>
                <Input id="nome" placeholder="Digite o nome do exame" required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="preco">Preço *</Label>
                  <Input id="preco" placeholder="R$ 0,00" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duracao">Duração Estimada</Label>
                  <Input id="duracao" placeholder="Ex: 30 minutos" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preparo e Instruções */}
          <Card>
            <CardHeader>
              <CardTitle>Preparo e Instruções</CardTitle>
              <CardDescription>Orientações para o paciente</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="preparo">Preparo Necessário</Label>
                <Textarea
                  id="preparo"
                  placeholder="Descreva o preparo necessário para o exame (ex: jejum, medicações, etc.)"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instrucoes">Instruções Adicionais</Label>
                <Textarea id="instrucoes" placeholder="Instruções adicionais para o paciente" rows={3} />
              </div>
            </CardContent>
          </Card>

          {/* Observações */}
          <Card>
            <CardHeader>
              <CardTitle>Observações</CardTitle>
              <CardDescription>Informações adicionais sobre o exame</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações Gerais</Label>
                <Textarea id="observacoes" placeholder="Digite observações importantes sobre o exame..." rows={4} />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end space-x-4">
            <Link href="/exames">
              <Button variant="outline">Cancelar</Button>
            </Link>
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              Salvar Exame
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
