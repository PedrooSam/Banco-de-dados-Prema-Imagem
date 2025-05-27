"use client"

import { useState, useEffect, useTransition, Suspense } from "react"
import {
  Edit,
  FileText,
  Home,
  Menu,
  Plus,
  Search,
  Trash2,
  User,
  Users,
  Calendar,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  PieChart,
} from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"

// Componente de loading para a lista de pacientes
function PacientesListSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="animate-pulse">
          <CardHeader>
            <div className="h-5 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Componente de formulário para edição/criação de paciente
function PacienteForm({ paciente, onSave, onCancel, isEditing = false }) {
  const [isPending, startTransition] = useTransition()
  const [formData, setFormData] = useState(
    paciente || {
      nome: "",
      nomeSocial: "",
      cpf: "",
      rg: "",
      dataNascimento: "",
      cep: "",
      numeroEndereco: "",
      complementoEndereco: "",
      telefone1: "",
      telefone2: "",
      email: "",
      nomeMae: "",
    },
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    startTransition(async () => {
      try {
        const url = isEditing ? `http://localhost:8080/pacientes/${paciente.id}` : "http://localhost:8080/pacientes"

        const method = isEditing ? "PUT" : "POST"

        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })

        if (response.ok) {
          const savedPaciente = await response.json()
          onSave(savedPaciente)
        } else {
          throw new Error("Erro ao salvar paciente")
        }
      } catch (error) {
        console.error("Erro:", error)
        alert("Erro ao salvar paciente. Tente novamente.")
      }
    })
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="nome">Nome Completo *</Label>
          <Input id="nome" value={formData.nome} onChange={(e) => handleChange("nome", e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="nomeSocial">Nome Social</Label>
          <Input
            id="nomeSocial"
            value={formData.nomeSocial}
            onChange={(e) => handleChange("nomeSocial", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cpf">CPF *</Label>
          <Input
            id="cpf"
            value={formData.cpf}
            onChange={(e) => handleChange("cpf", e.target.value)}
            placeholder="000.000.000-00"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rg">RG</Label>
          <Input id="rg" value={formData.rg} onChange={(e) => handleChange("rg", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dataNascimento">Data de Nascimento *</Label>
          <Input
            id="dataNascimento"
            type="date"
            value={formData.dataNascimento}
            onChange={(e) => handleChange("dataNascimento", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="telefone1">Telefone Principal *</Label>
          <Input
            id="telefone1"
            value={formData.telefone1}
            onChange={(e) => handleChange("telefone1", e.target.value)}
            placeholder="(00) 00000-0000"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="telefone2">Telefone Secundário</Label>
          <Input
            id="telefone2"
            value={formData.telefone2}
            onChange={(e) => handleChange("telefone2", e.target.value)}
            placeholder="(00) 00000-0000"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cep">CEP</Label>
          <Input
            id="cep"
            value={formData.cep}
            onChange={(e) => handleChange("cep", e.target.value)}
            placeholder="00000-000"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="numeroEndereco">Número</Label>
          <Input
            id="numeroEndereco"
            value={formData.numeroEndereco}
            onChange={(e) => handleChange("numeroEndereco", e.target.value)}
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="complementoEndereco">Complemento</Label>
          <Input
            id="complementoEndereco"
            value={formData.complementoEndereco}
            onChange={(e) => handleChange("complementoEndereco", e.target.value)}
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="nomeMae">Nome da Mãe</Label>
          <Input id="nomeMae" value={formData.nomeMae} onChange={(e) => handleChange("nomeMae", e.target.value)} />
        </div>
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel} disabled={isPending}>
          Cancelar
        </Button>
        <Button type="submit" className="bg-[#1e8a5e] hover:bg-[#156e49]" disabled={isPending}>
          {isPending ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              Salvando...
            </>
          ) : (
            <>Salvar</>
          )}
        </Button>
      </DialogFooter>
    </form>
  )
}

// Componente principal da lista de pacientes
function PacientesList() {
  const [pacientes, setPacientes] = useState([])
  const [filteredPacientes, setFilteredPacientes] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [selectedPaciente, setSelectedPaciente] = useState(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  // Carregar pacientes da API
  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await fetch("http://localhost:8080/pacientes")
        if (response.ok) {
          const data = await response.json()
          setPacientes(data)
          setFilteredPacientes(data)
        } else {
          throw new Error("Erro ao carregar pacientes")
        }
      } catch (error) {
        console.error("Erro:", error)
        alert("Erro ao carregar pacientes. Verifique se o servidor está rodando.")
      } finally {
        setLoading(false)
      }
    }

    fetchPacientes()
  }, [])

  // Filtrar pacientes baseado na busca
  useEffect(() => {
    const filtered = pacientes.filter(
      (paciente) =>
        paciente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paciente.cpf.includes(searchTerm) ||
        paciente.email.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredPacientes(filtered)
  }, [searchTerm, pacientes])

  // Deletar paciente
  const handleDelete = async (pacienteId) => {
    startTransition(async () => {
      try {
        const response = await fetch(`http://localhost:8080/pacientes/${pacienteId}`, {
          method: "DELETE",
        })

        if (response.ok) {
          setPacientes((prev) => prev.filter((p) => p.id !== pacienteId))
          alert("Paciente excluído com sucesso!")
        } else {
          throw new Error("Erro ao excluir paciente")
        }
      } catch (error) {
        console.error("Erro:", error)
        alert("Erro ao excluir paciente. Tente novamente.")
      }
    })
  }

  // Salvar paciente (criar ou editar)
  const handleSave = (savedPaciente) => {
    if (selectedPaciente) {
      // Editando
      setPacientes((prev) => prev.map((p) => (p.id === savedPaciente.id ? savedPaciente : p)))
    } else {
      // Criando
      setPacientes((prev) => [...prev, savedPaciente])
    }
    setIsEditDialogOpen(false)
    setIsCreateDialogOpen(false)
    setSelectedPaciente(null)
    alert("Paciente salvo com sucesso!")
  }

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy", { locale: ptBR })
    } catch {
      return dateString
    }
  }

  const formatPhone = (phone) => {
    if (!phone) return ""
    const cleaned = phone.replace(/\D/g, "")
    if (cleaned.length === 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`
    }
    return phone
  }

  const formatCPF = (cpf) => {
    if (!cpf) return ""
    const cleaned = cpf.replace(/\D/g, "")
    if (cleaned.length === 11) {
      return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9)}`
    }
    return cpf
  }

  if (loading) {
    return <PacientesListSkeleton />
  }

  return (
    <div className="space-y-6">
      {/* Header com busca e botão de adicionar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, CPF ou e-mail..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#1e8a5e] hover:bg-[#156e49]">
              <Plus className="mr-2 h-4 w-4" />
              Novo Paciente
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Paciente</DialogTitle>
              <DialogDescription>Preencha os dados do novo paciente.</DialogDescription>
            </DialogHeader>
            <PacienteForm onSave={handleSave} onCancel={() => setIsCreateDialogOpen(false)} isEditing={false} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de pacientes */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredPacientes.map((paciente) => (
          <Card key={paciente.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{paciente.nome}</CardTitle>
                  {paciente.nomeSocial && (
                    <Badge variant="secondary" className="text-xs">
                      {paciente.nomeSocial}
                    </Badge>
                  )}
                </div>
                <div className="flex gap-1">
                  <Dialog
                    open={isEditDialogOpen && selectedPaciente?.id === paciente.id}
                    onOpenChange={(open) => {
                      setIsEditDialogOpen(open)
                      if (!open) setSelectedPaciente(null)
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedPaciente(paciente)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Editar Paciente</DialogTitle>
                        <DialogDescription>Altere os dados do paciente.</DialogDescription>
                      </DialogHeader>
                      <PacienteForm
                        paciente={selectedPaciente}
                        onSave={handleSave}
                        onCancel={() => {
                          setIsEditDialogOpen(false)
                          setSelectedPaciente(null)
                        }}
                        isEditing={true}
                      />
                    </DialogContent>
                  </Dialog>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja excluir o paciente <strong>{paciente.nome}</strong>? Esta ação não pode
                          ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(paciente.id)}
                          className="bg-red-600 hover:bg-red-700"
                          disabled={isPending}
                        >
                          {isPending ? "Excluindo..." : "Excluir"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span>{formatCPF(paciente.cpf)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{formatDate(paciente.dataNascimento)}</span>
                </div>
                {paciente.telefone1 && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{formatPhone(paciente.telefone1)}</span>
                  </div>
                )}
                {paciente.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{paciente.email}</span>
                  </div>
                )}
                {paciente.cep && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>
                      CEP: {paciente.cep}
                      {paciente.numeroEndereco && `, ${paciente.numeroEndereco}`}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPacientes.length === 0 && !loading && (
        <div className="text-center py-12">
          <User className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">Nenhum paciente encontrado</h3>
          <p className="text-muted-foreground">
            {searchTerm ? "Tente ajustar os termos de busca." : "Comece cadastrando um novo paciente."}
          </p>
        </div>
      )}
    </div>
  )
}

export default function PacientesPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-[#1e8a5e]">
            <nav className="grid gap-6 text-lg font-medium text-white">
              <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-white">
                <FileText className="h-6 w-6" />
                <span>MediClinic</span>
              </Link>
              <Link href="/" className="flex items-center gap-2 text-white hover:text-[#f0d878]">
                <Home className="h-5 w-5" />
                <span>Início</span>
              </Link>
              <Link href="/agendamento" className="flex items-center gap-2 text-white hover:text-[#f0d878]">
                <Calendar className="h-5 w-5" />
                <span>Agendamentos</span>
              </Link>
              <Link href="/pacientes" className="flex items-center gap-2 text-white hover:text-[#f0d878]">
                <User className="h-5 w-5" />
                <span>Pacientes</span>
              </Link>
              <Link href="#" className="flex items-center gap-2 text-white hover:text-[#f0d878]">
                <Users className="h-5 w-5" />
                <span>Médicos</span>
              </Link>
              <Link href="#" className="flex items-center gap-2 text-white hover:text-[#f0d878]">
                <FileText className="h-5 w-5" />
                <span>Exames</span>
              </Link>
              <Link href="#" className="flex items-center gap-2 text-white hover:text-[#f0d878]">
                <CreditCard className="h-5 w-5" />
                <span>Pagamentos</span>
              </Link>
              <Link href="#" className="flex items-center gap-2 text-white hover:text-[#f0d878]">
                <PieChart className="h-5 w-5" />
                <span>Relatórios</span>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-[#1e8a5e] md:text-xl">
          <FileText className="h-6 w-6" />
          <span>MediClinic</span>
        </Link>
        <nav className="hidden gap-6 md:flex">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-[#1e8a5e]"
          >
            <Home className="h-4 w-4" />
            <span>Início</span>
          </Link>
          <Link
            href="/agendamento"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-[#1e8a5e]"
          >
            <Calendar className="h-4 w-4" />
            <span>Agendamentos</span>
          </Link>
          <Link
            href="/pacientes"
            className="flex items-center gap-2 text-sm font-medium text-[#1e8a5e] hover:text-[#156e49]"
          >
            <User className="h-4 w-4" />
            <span>Pacientes</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-[#1e8a5e]"
          >
            <Users className="h-4 w-4" />
            <span>Médicos</span>
          </Link>
        </nav>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Pacientes</h1>
            <p className="text-muted-foreground">Gerencie os pacientes cadastrados no sistema</p>
          </div>
        </div>
        <Suspense fallback={<PacientesListSkeleton />}>
          <PacientesList />
        </Suspense>
      </main>
    </div>
  )
}