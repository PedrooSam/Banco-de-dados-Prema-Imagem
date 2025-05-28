'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Search, Home, Calendar, Users, UserCheck, FileText, AlertCircle, Loader2 } from "lucide-react";

// Helper to get today's date in YYYY-MM-DD format
const getTodayDateString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};


export default function NovoAgendamentoPage() {
  const router = useRouter();

  // Data states for dropdowns
  const [pacientes, setPacientes] = useState([]);
  const [exames, setExames] = useState([]);
  const [medicos, setMedicos] = useState([]);

  // Loading states for dropdown data
  const [loadingPacientes, setLoadingPacientes] = useState(true);
  const [loadingExames, setLoadingExames] = useState(true);
  const [loadingMedicos, setLoadingMedicos] = useState(true);

  // Error states for individual fetches
  const [errorPacientesData, setErrorPacientesData] = useState(null);
  const [errorExamesData, setErrorExamesData] = useState(null);
  const [errorMedicosData, setErrorMedicosData] = useState(null);


  // Form state
  const [formData, setFormData] = useState({
    idPaciente: "",
    idExame: "",
    dataExame: getTodayDateString(),
    horarioExame: "08:00",
    idMedicoSolicitante: "",
    valor: "",
    formaPagamento: "", 
    parcelas: "1",
    observacoes: "" 
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fetchError, setFetchError] = useState(null); // General error for display
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  // Fetch data for Select dropdowns
  useEffect(() => {
    const fetchData = async (url, setData, setLoading, setErrorState, type) => {
      setLoading(true);
      setErrorState(null); 
      try {
        const response = await fetch(`http://localhost:8080${url}`);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status} - ${errorText} ao buscar ${type}`);
        }
        const result = await response.json();
        setData(Array.isArray(result) ? result : []);
      } catch (e) {
        setErrorState(e.message); 
        setData([]);
        console.error(`Failed to fetch ${type}:`, e);
      } finally {
        setLoading(false);
      }
    };

    fetchData('/pacientes', setPacientes, setLoadingPacientes, setErrorPacientesData, 'pacientes');
    fetchData('/exames', setExames, setLoadingExames, setErrorExamesData, 'tipos de exame');
    fetchData('/medicos', setMedicos, setLoadingMedicos, setErrorMedicosData, 'médicos');
  }, []);

  // Effect to set a general fetch error message if any dropdown load fails
  useEffect(() => {
    // Corrected: Use the actual state variable names for errors
    if (errorPacientesData || errorExamesData || errorMedicosData) {
        setFetchError("Erro ao carregar dados necessários para o formulário. Verifique a conexão ou tente mais tarde.");
    } else {
        setFetchError(null);
    }
  }, [errorPacientesData, errorExamesData, errorMedicosData]); // Corrected dependencies


  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id, value) => {
    if (id === "formaPagamento" && value === "nenhuma_pgto_selecionada") {
        setFormData(prev => ({ ...prev, formaPagamento: "" }));
    } else {
        setFormData(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' }); 

    if (!formData.idPaciente || !formData.idExame || !formData.dataExame || !formData.horarioExame || !formData.idMedicoSolicitante) {
      setSubmitStatus({ type: 'error', message: "Por favor, preencha todos os campos obrigatórios de agendamento (*)." });
      setIsSubmitting(false);
      return;
    }

    const dataHoraRealizacao = `${formData.dataExame}T${formData.horarioExame}:00`;
    const selectedMedico = medicos.find(m => m.id.toString() === formData.idMedicoSolicitante);

    const agendamentoPayload = {
      dataHoraRealizacao: dataHoraRealizacao,
      medicoRequisitante: selectedMedico ? selectedMedico.nome : "Não especificado",
      laudo: formData.observacoes || "Laudo pendente.",
      status: "agendado",
      paciente: { id: parseInt(formData.idPaciente) },
      medico: { id: parseInt(formData.idMedicoSolicitante) },
      exame: { id: parseInt(formData.idExame) }
    };

    try {
      const response = await fetch('http://localhost:8080/agenda-exames', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(agendamentoPayload),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorData}`);
      }
      setSubmitStatus({ type: 'success', message: "Agendamento salvo com sucesso!" });
      setTimeout(() => router.push('/dashboard/agendamentos'), 2000);
    } catch (error) {
      console.error("Erro ao salvar agendamento:", error);
      setSubmitStatus({ type: 'error', message: `Erro ao salvar: ${error.message}` });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const anyLoading = loadingPacientes || loadingExames || loadingMedicos;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-green-600 dark:text-green-400" />
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">PremaImagem</span>
            </Link>
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Buscar..." className="pl-10 w-full rounded-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-green-500 focus:border-green-500" />
              </div>
            </div>
            <nav className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                <Home className="h-4 w-4" />
                <span className="text-sm">Início</span>
              </Link>
              <Link href="/dashboard/agendamentos" className="flex items-center space-x-1 text-green-600 dark:text-green-400 font-medium">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Agendamentos</span>
              </Link>
              <Link href="/pacientes" className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                <Users className="h-4 w-4" />
                <span className="text-sm">Pacientes</span>
              </Link>
               <Button 
                onClick={handleSubmit} 
                disabled={isSubmitting || anyLoading}
                className="bg-green-600 hover:bg-green-700 text-white text-sm"
              >
                {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                Salvar Agendamento
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4 mb-6">
          <Link href="/dashboard/agendamentos" passHref>
            <Button variant="outline" size="sm" className="dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">Novo Agendamento</h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Agendar novo exame para paciente</p>
          </div>
        </div>

        {submitStatus.message && (
          <div className={`mb-4 p-3 rounded-md text-sm ${submitStatus.type === 'success' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'}`}>
            {submitStatus.message}
          </div>
        )}

        {fetchError && (
           <Card className="mb-6 bg-red-50 dark:bg-red-900/30 border-red-500 dark:border-red-700">
            <CardHeader className="flex flex-row items-center gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                <CardTitle className="text-red-700 dark:text-red-300 text-base">Erro ao Carregar Dados</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-red-600 dark:text-red-400">{fetchError}</p>
            </CardContent>
           </Card>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="shadow-lg rounded-xl bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800 dark:text-gray-100">Dados do Agendamento</CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-400">Informações principais do agendamento</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="idPaciente" className="text-sm font-medium text-gray-700 dark:text-gray-300">Paciente *</Label>
                  <Select 
                    value={formData.idPaciente} 
                    onValueChange={(value) => handleSelectChange("idPaciente", value)}
                    disabled={loadingPacientes}
                  >
                    <SelectTrigger id="idPaciente" className="w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                      <SelectValue placeholder={loadingPacientes ? "Carregando..." : "Selecione o paciente"} />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800">
                      {!loadingPacientes && pacientes.length > 0 && pacientes.map(p => <SelectItem key={p.id} value={p.id.toString()}>{p.nome}</SelectItem>)}
                      {!loadingPacientes && pacientes.length === 0 && <SelectItem value="no_data_placeholder_pacientes" disabled>Nenhum paciente encontrado</SelectItem>}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="idExame" className="text-sm font-medium text-gray-700 dark:text-gray-300">Tipo de Exame *</Label>
                  <Select 
                    value={formData.idExame} 
                    onValueChange={(value) => handleSelectChange("idExame", value)}
                    disabled={loadingExames}
                  >
                    <SelectTrigger id="idExame" className="w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                      <SelectValue placeholder={loadingExames ? "Carregando..." : "Selecione o exame"} />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800">
                      {!loadingExames && exames.length > 0 && exames.map(ex => <SelectItem key={ex.id} value={ex.id.toString()}>{ex.nome}</SelectItem>)}
                       {!loadingExames && exames.length === 0 && <SelectItem value="no_data_placeholder_exames" disabled>Nenhum tipo de exame encontrado</SelectItem>}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="dataExame" className="text-sm font-medium text-gray-700 dark:text-gray-300">Data do Exame *</Label>
                  <Input id="dataExame" type="date" value={formData.dataExame} onChange={handleInputChange} required className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="horarioExame" className="text-sm font-medium text-gray-700 dark:text-gray-300">Horário *</Label>
                  <Input id="horarioExame" type="time" value={formData.horarioExame} onChange={handleInputChange} required className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="idMedicoSolicitante" className="text-sm font-medium text-gray-700 dark:text-gray-300">Médico Solicitante *</Label>
                <Select 
                  value={formData.idMedicoSolicitante} 
                  onValueChange={(value) => handleSelectChange("idMedicoSolicitante", value)}
                  disabled={loadingMedicos}
                >
                  <SelectTrigger id="idMedicoSolicitante" className="w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                    <SelectValue placeholder={loadingMedicos ? "Carregando..." : "Selecione o médico"} />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800">
                     {!loadingMedicos && medicos.length > 0 && medicos.map(m => <SelectItem key={m.id} value={m.id.toString()}>{m.nome}</SelectItem>)}
                     {!loadingMedicos && medicos.length === 0 && <SelectItem value="no_data_placeholder_medicos" disabled>Nenhum médico encontrado</SelectItem>}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-xl bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800 dark:text-gray-100">Dados de Pagamento (Opcional)</CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-400">Informações sobre o pagamento do exame (se aplicável)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="valor" className="text-sm font-medium text-gray-700 dark:text-gray-300">Valor</Label>
                  <Input id="valor" placeholder="R$ 0,00" value={formData.valor} onChange={handleInputChange} type="number" step="0.01" className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="formaPagamento" className="text-sm font-medium text-gray-700 dark:text-gray-300">Forma de Pagamento</Label>
                  <Select value={formData.formaPagamento} onValueChange={(value) => handleSelectChange("formaPagamento", value)}>
                    <SelectTrigger id="formaPagamento" className="w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                      <SelectValue placeholder="Selecione (opcional)" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800">
                      <SelectItem value="dinheiro">Dinheiro</SelectItem>
                      <SelectItem value="cartao-credito">Cartão de Crédito</SelectItem>
                      <SelectItem value="cartao-debito">Cartão de Débito</SelectItem>
                      <SelectItem value="pix">PIX</SelectItem>
                      <SelectItem value="convenio">Convênio</SelectItem>
                      <SelectItem value="nenhuma_pgto_selecionada">Nenhuma (Limpar)</SelectItem> 
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="parcelas" className="text-sm font-medium text-gray-700 dark:text-gray-300">Parcelas</Label>
                  <Select value={formData.parcelas} onValueChange={(value) => handleSelectChange("parcelas", value)}>
                    <SelectTrigger id="parcelas" className="w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                      <SelectValue placeholder="À vista" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800">
                      <SelectItem value="1">À vista</SelectItem>
                      {[2,3,4,5,6,7,8,9,10,11,12].map(p => <SelectItem key={p} value={p.toString()}>{p}x</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-xl bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800 dark:text-gray-100">Observações</CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-400">Informações adicionais (serão incluídas no laudo inicial)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1.5">
                <Label htmlFor="observacoes" className="text-sm font-medium text-gray-700 dark:text-gray-300">Observações Gerais</Label>
                <Textarea
                  id="observacoes"
                  placeholder="Digite observações importantes sobre o agendamento..."
                  rows={4}
                  value={formData.observacoes}
                  onChange={handleInputChange}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4 pt-2">
            <Link href="/dashboard/agendamentos" passHref>
              <Button variant="outline" type="button" className="dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">Cancelar</Button>
            </Link>
            <Button type="submit" disabled={isSubmitting || anyLoading} className="bg-green-600 hover:bg-green-700 text-white">
              {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
              Salvar Agendamento
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
