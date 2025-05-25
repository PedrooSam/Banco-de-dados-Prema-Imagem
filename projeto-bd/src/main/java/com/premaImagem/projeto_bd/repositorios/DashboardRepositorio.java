package com.premaImagem.projeto_bd.repositorios;

import com.premaImagem.projeto_bd.dto.ExamesPorMedicoDTO;
import com.premaImagem.projeto_bd.dto.ExamesPorMesAnoDTO;
import com.premaImagem.projeto_bd.entidades.AgendaExame;
import com.premaImagem.projeto_bd.dto.ExameMaisRealizadoDTO;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DashboardRepositorio extends JpaRepository<AgendaExame, Long> {

    //dashboard para medico que mais realizou exame
    @Query("SELECT new com.premaImagem.projeto_bd.dto.ExameMaisRealizadoDTO(e.nome, COUNT(a)) " +
            "FROM AgendaExame a JOIN a.exame e " +
            "WHERE a.status = 'realizado' " +
            "GROUP BY e.nome " +
            "ORDER BY COUNT(a) DESC")
    List<ExameMaisRealizadoDTO> top10ExamesMaisRealizados(Pageable pageable);

    // dashboard para exames por medico
    @Query("SELECT new com.premaImagem.projeto_bd.dto.ExamesPorMedicoDTO(m.id, c.nome, COUNT(a)) " +
            "FROM AgendaExame a " +
            "JOIN a.medico m " +
            "JOIN m.colaborador c " +
            "WHERE a.status = 'realizado' " +
            "GROUP BY m.id, c.nome " +
            "ORDER BY COUNT(a) DESC")
    List<ExamesPorMedicoDTO> examesPorMedico();

    //dashboard para exames por periodo do dia
    @Query(value =
            "SELECT " +
                    "CASE " +
                    "  WHEN HOUR(data_hora_realizacao) BETWEEN 6 AND 11 THEN 'Manhã' " +
                    "  WHEN HOUR(data_hora_realizacao) BETWEEN 12 AND 17 THEN 'Tarde' " +
                    "  WHEN HOUR(data_hora_realizacao) BETWEEN 18 AND 23 THEN 'Noite' " +
                    "  ELSE 'Madrugada' END AS periodo, " +
                    "COUNT(*) AS total_exames " +
                    "FROM agenda_exame " +
                    "WHERE status = 'realizado' " +
                    "GROUP BY periodo", nativeQuery = true)
    List<Object[]> examesPorPeriodo();

    //dashboard para exame por mes ou ano
    @Query("SELECT new com.premaImagem.projeto_bd.dto.ExamesPorMesAnoDTO(" +
            "YEAR(a.dataHoraRealizacao), MONTH(a.dataHoraRealizacao), COUNT(a)) " +
            "FROM AgendaExame a " +
            "WHERE a.status = 'realizado' " +
            "GROUP BY YEAR(a.dataHoraRealizacao), MONTH(a.dataHoraRealizacao) " +
            "ORDER BY YEAR(a.dataHoraRealizacao), MONTH(a.dataHoraRealizacao)")
    List<ExamesPorMesAnoDTO> totalExamesPorMesAno();

    //percentual de exames por medico
    @Query(value =
            "SELECT c.nome, " +
                    "       (COUNT(*) * 100.0 / (SELECT COUNT(*) FROM agenda_exame WHERE status = 'realizado')) AS percentual " +
                    "FROM agenda_exame a " +
                    "JOIN medico m ON a.id_medico = m.id " +
                    "JOIN colaborador c ON m.id = c.id " +
                    "WHERE a.status = 'realizado' " +
                    "GROUP BY c.nome " +
                    "ORDER BY percentual DESC",
            nativeQuery = true)
    List<Object[]> percentualExamesPorMedico();

    //medico com mais exames em determinado mes
    @Query(value =
            "SELECT c.nome, COUNT(*) AS atendimentos " +
                    "FROM agenda_exame a " +
                    "JOIN medico m ON a.id_medico = m.id " +
                    "JOIN colaborador c ON m.id = c.id " +
                    "WHERE a.status = 'realizado' " +
                    "AND YEAR(a.data_hora_realizacao) = YEAR(CURDATE()) " +
                    "AND MONTH(a.data_hora_realizacao) = MONTH(CURDATE()) " +
                    "GROUP BY c.nome " +
                    "ORDER BY atendimentos DESC " +
                    "LIMIT 5",
            nativeQuery = true)
    List<Object[]> top5MedicosAtendimentosMesAtual();

    //pacientes com mais exames realizados
    @Query(value =
            "SELECT p.nome, COUNT(*) AS total_exames " +
                    "FROM agenda_exame a " +
                    "JOIN paciente p ON a.id_paciente = p.id " +
                    "WHERE a.status = 'realizado' " +
                    "GROUP BY p.id, p.nome " +
                    "ORDER BY total_exames DESC " +
                    "LIMIT 10",
            nativeQuery = true)
    List<Object[]> top10PacientesMaisExames();

    //exames por faixa etaria dos pacientes
    @Query(value =
            "SELECT " +
                    "  CASE " +
                    "    WHEN TIMESTAMPDIFF(YEAR, p.data_nascimento, CURDATE()) < 18 THEN '<18' " +
                    "    WHEN TIMESTAMPDIFF(YEAR, p.data_nascimento, CURDATE()) BETWEEN 18 AND 35 THEN '18-35' " +
                    "    WHEN TIMESTAMPDIFF(YEAR, p.data_nascimento, CURDATE()) BETWEEN 36 AND 60 THEN '36-60' " +
                    "    ELSE '>60' END AS faixa_etaria, " +
                    "  COUNT(*) AS total_exames " +
                    "FROM agenda_exame a " +
                    "JOIN paciente p ON a.id_paciente = p.id " +
                    "WHERE a.status = 'realizado' " +
                    "GROUP BY faixa_etaria " +
                    "ORDER BY faixa_etaria",
            nativeQuery = true)
    List<Object[]> examesPorFaixaEtaria();

    //pacientes que indicaram outros pacientes
    @Query(value =
            "SELECT p1.nome AS paciente, COUNT(p2.id) AS indicados " +
                    "FROM paciente p1 " +
                    "LEFT JOIN paciente p2 ON p2.paciente_indicador = p1.id " +
                    "GROUP BY p1.id, p1.nome " +
                    "ORDER BY indicados DESC " +
                    "LIMIT 10",
            nativeQuery = true)
    List<Object[]> top10PacientesIndicadores();

    //Produtos mais utilizados
    @Query(value =
            "SELECT p.nome AS produto, " +
                    "COUNT(v.data_hora_venda) AS vezes_vendido, " +
                    "SUM(v.quantidade) AS quantidade_vendida " +
                    "FROM venda v " +
                    "JOIN produto p ON v.id_produto = p.id " +
                    "GROUP BY p.id, p.nome " +
                    "ORDER BY quantidade_vendida DESC " +
                    "LIMIT 10",
            nativeQuery = true)
    List<Object[]> top10ProdutosMaisUtilizados();

    //quantidade de produtos

    @Query(value =
            "SELECT nome, quantidade " +
                    "FROM produto " +
                    "ORDER BY quantidade DESC",
            nativeQuery = true)
    List<Object[]> quantidadeProdutos();

    //comrpas por fornecedor
    @Query(value =
            "SELECT f.nome AS fornecedor, SUM(v.quantidade) AS total_vendido " +
                    "FROM venda v " +
                    "JOIN fornecedor f ON v.id_fornecedor = f.id " +
                    "GROUP BY f.id, f.nome " +
                    "ORDER BY total_vendido DESC",
            nativeQuery = true)
    List<Object[]> comprasPorFornecedor();

    //Total de exames agendados por dia
    @Query(value =
            "SELECT DATE(data_hora_realizacao) AS dia, COUNT(*) AS total_exames " +
                    "FROM agenda_exame " +
                    "GROUP BY dia " +
                    "ORDER BY dia",
            nativeQuery = true)
    List<Object[]> examesAgendadosPorDia();

    //Número médio de exames que um paciente faz por agendamento
    @Query(value =
            "SELECT AVG(qtd_exames) AS media_exames_por_agendamento " +
                    "FROM ( " +
                    "  SELECT id_paciente, data_hora_realizacao, COUNT(*) AS qtd_exames " +
                    "  FROM agenda_exame " +
                    "  GROUP BY id_paciente, data_hora_realizacao " +
                    ") sub",
            nativeQuery = true)
    Double mediaExamesPorAgendamento();

    //Quantos exames agendados por hora do dia
    @Query(value =
            "SELECT HOUR(data_hora_realizacao) AS hora, COUNT(*) AS total_exames " +
                    "FROM agenda_exame " +
                    "GROUP BY hora " +
                    "ORDER BY total_exames DESC",
            nativeQuery = true)
    List<Object[]> examesPorHora();
}
