"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  Home,
  Calendar as CalendarIcon,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// Mock data simulating API response for examesPorPeriodoParaDataEspecifica
const mockExamesPorPeriodo = [
  { periodo: "Manhã", total_exames: 15 },
  { periodo: "Tarde", total_exames: 25 },
  { periodo: "Noite", total_exames: 10 },
  { periodo: "Madrugada", total_exames: 5 },
];

export default function ExamesPeriodoPage() {
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [dadosGrafico, setDadosGrafico] = useState([]);

  useEffect(() => {
    // Simulate fetching data when dataSelecionada changes
    // In a real scenario, this would be an API call
    console.log(`Buscando dados para ${format(dataSelecionada, "PPP", { locale: ptBR })}`);
    // For now, we'll just use the mock data regardless of the date
    setDadosGrafico(mockExamesPorPeriodo);
  }, [dataSelecionada]);

  const handleDateSelect = (date) => {
    if (date) {
      setDataSelecionada(date);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-xl font-semibold">Exames por Período do Dia</h1>
        </div>
        <Button variant="outline" asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Voltar para o Início
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtrar por Data</CardTitle>
          <CardDescription>
            Selecione uma data para ver a distribuição de exames por período.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="w-[280px] justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dataSelecionada ? (
                    format(dataSelecionada, "PPP", { locale: ptBR })
                  ) : (
                    <span>Escolha uma data</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dataSelecionada}
                  onSelect={handleDateSelect}
                  initialFocus
                  locale={ptBR}
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Distribuição de Exames por Período</CardTitle>
          <CardDescription>
            Total de exames realizados em {format(dataSelecionada, "PPP", { locale: ptBR })} por período do dia.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {dadosGrafico.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={dadosGrafico}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="periodo" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="total_exames" fill="#8884d8" name="Total de Exames" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-500">
              Nenhum dado disponível para a data selecionada.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
