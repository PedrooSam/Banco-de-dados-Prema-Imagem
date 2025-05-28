'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";
import { HomeIcon, Award, UserCheck, TrendingUp, Stethoscope } from 'lucide-react';
import Link from 'next/link';

// Mock de dados: Médicos e o total de exames que realizaram
const medicosPerformanceMock = [
  { id: 'med1', nome: 'Dr. Carlos Mendes', especialidade: 'Cardiologia', totalExames: 1850 },
  { id: 'med2', nome: 'Dra. Ana Souza', especialidade: 'Radiologia', totalExames: 2100 },
  { id: 'med3', nome: 'Dr. Paulo Ribeiro', especialidade: 'Ortopedia', totalExames: 1500 },
  { id: 'med4', nome: 'Dra. Carla Santos', especialidade: 'Neurologia', totalExames: 1700 },
  { id: 'med5', nome: 'Dr. Ricardo Almeida', especialidade: 'Endocrinologia', totalExames: 1200 },
  { id: 'med6', nome: 'Dra. Beatriz Lima', especialidade: 'Ginecologia', totalExames: 1950 },
];

export default function MedicosMaisExamesPage() {

  const medicosOrdenados = useMemo(() => {
    return [...medicosPerformanceMock].sort((a, b) => b.totalExames - a.totalExames);
  }, []);

  const getMedalColor = (rank) => {
    if (rank === 0) return "text-yellow-500"; // Ouro
    if (rank === 1) return "text-gray-400";   // Prata
    if (rank === 2) return "text-orange-400"; // Bronze
    return "text-gray-500";
  };

  return (
    <div className="container mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
      <Card className="mb-6 shadow-lg">
        <CardHeader className="bg-gray-100 border-b">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-3xl font-bold text-gray-800 flex items-center">
                <TrendingUp className="mr-3 h-8 w-8 text-red-600" /> Médicos com Mais Exames Realizados
              </CardTitle>
              <CardDescription className="text-md text-gray-600">Ranking de médicos pelo total de exames realizados durante sua jornada na clínica.</CardDescription>
            </div>
            <Link href="/" passHref>
              <Button variant="outline" className="bg-green-600 hover:bg-green-700 text-white">
                <HomeIcon className="mr-2 h-4 w-4" />
                Voltar para o Início
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {medicosOrdenados.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {medicosOrdenados.map((medico, index) => (
                <Card key={medico.id} className="shadow-md hover:shadow-lg transition-shadow flex flex-col">
                  <CardHeader className="flex-row items-start bg-slate-50 rounded-t-lg p-4">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold text-red-700 flex items-center">
                        {index < 3 && (
                          <Award className={`mr-2 h-5 w-5 ${getMedalColor(index)}`} strokeWidth={2.5}/>
                        )}
                        {medico.nome}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600 flex items-center mt-1">
                        <Stethoscope className="h-4 w-4 mr-1.5 text-red-500"/> 
                        {medico.especialidade}
                      </CardDescription>
                    </div>
                     <Badge 
                        variant="secondary"
                        className={`text-lg font-bold px-3 py-1 ${index < 3 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}
                      >
                        #{index + 1}
                      </Badge>
                  </CardHeader>
                  <CardContent className="pt-4 pb-4 flex-grow flex flex-col justify-center items-center bg-white rounded-b-lg">
                    <p className="text-sm text-gray-500 mb-1">Total de Exames Realizados</p>
                    <p className="text-4xl font-bold text-red-600">{medico.totalExames.toLocaleString('pt-BR')}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <UserCheck className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-xl font-semibold text-gray-700">Nenhum dado de performance de médicos encontrado.</p>
              <p className="text-gray-500">Não há informações disponíveis para exibir o ranking no momento.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
