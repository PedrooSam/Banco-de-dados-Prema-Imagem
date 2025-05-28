"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Users, BarChart as BarChartIcon, Activity, Info } from "lucide-react"
import Link from "next/link"

// Faixas etárias como definidas no backend
const FAIXAS_ETARIAS_BACKEND = [
  { valor: "<18", nome: "Menores de 18 anos" },
  { valor: "18-35", nome: "18-35 anos" },
  { valor: "36-60", nome: "36-60 anos" },
  { valor: ">60", nome: "Maiores de 60 anos" },
];

export default function ExamesPorFaixaEtariaPage() {
  const [faixaEtariaSelecionada, setFaixaEtariaSelecionada] = useState(FAIXAS_ETARIAS_BACKEND[0].valor);
  const [totalExames, setTotalExames] = useState(null);
  const [loadingDados, setLoadingDados] = useState(false);

  useEffect(() => {
    if (faixaEtariaSelecionada) {
      setLoadingDados(true);
      // Simula a busca de dados mockados
      setTimeout(() => {
        // Mock: Gera um número aleatório de exames para a faixa selecionada
        const mockTotal = Math.floor(Math.random() * 200) + 50;
        setTotalExames(mockTotal);
        setLoadingDados(false);
      }, 700);
    }
  }, [faixaEtariaSelecionada]);

  const handleFaixaEtariaChange = (novaFaixa) => {
    setFaixaEtariaSelecionada(novaFaixa);
    setTotalExames(null); // Limpa o total anterior ao mudar a seleção
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Exames por Faixa Etária</h1>
            <p className="text-gray-500 mt-1">Visualize o total de exames realizados para uma faixa etária específica.</p>
          </div>
          <Link href="/">
            <Button variant="outline" className="flex items-center space-x-2 hover:bg-gray-100">
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar para o Início</span>
            </Button>
          </Link>
        </div>

        <Card className="mb-8 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Users className="h-5 w-5 mr-2 text-primary" />
              Selecione a Faixa Etária
            </CardTitle>
            <CardDescription>Escolha uma faixa etária para ver o total de exames.</CardDescription>
          </CardHeader>
          <CardContent>
            <Select
              value={faixaEtariaSelecionada}
              onValueChange={handleFaixaEtariaChange}
            >
              <SelectTrigger id="faixa-etaria-select" className="w-full md:w-1/2 lg:w-1/3">
                <SelectValue placeholder="Selecione a Faixa Etária" />
              </SelectTrigger>
              <SelectContent>
                {FAIXAS_ETARIAS_BACKEND.map(faixa => (
                  <SelectItem key={faixa.valor} value={faixa.valor}>{faixa.nome}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {loadingDados ? (
          <div className="flex flex-col items-center justify-center h-60 bg-white rounded-lg shadow-md">
            <Activity className="h-12 w-12 text-primary animate-spin mb-4" />
            <p className="text-gray-600 text-lg">Buscando dados...</p>
          </div>
        ) : totalExames !== null && faixaEtariaSelecionada ? (
          <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl flex items-center text-indigo-600">
                <BarChartIcon className="h-6 w-6 mr-3" />
                Total de Exames para: {FAIXAS_ETARIAS_BACKEND.find(f => f.valor === faixaEtariaSelecionada)?.nome}
              </CardTitle>
              <CardDescription>Número total de exames realizados para a faixa etária selecionada.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-center py-10">
                <p className="text-6xl font-bold text-gray-800">{totalExames}</p>
                <p className="text-gray-500 mt-2">exames realizados</p>
              </div>
            </CardContent>
          </Card>
        ) : faixaEtariaSelecionada ? (
          <Card className="mt-8 shadow-md">
            <CardContent className="pt-6">
              <div className="text-center py-16">
                <Info className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <h3 className="mt-2 text-xl font-semibold text-gray-800">Nenhum Dado Encontrado</h3>
                <p className="mt-2 text-md text-gray-500">
                  Não foram encontrados registros de exames para a faixa etária selecionada.
                </p>
                <p className="mt-1 text-sm text-gray-500">Tente selecionar outra faixa etária ou verifique os dados.</p>
              </div>
            </CardContent>
          </Card>
        ) : null}
      </main>
    </div>
  )
}
