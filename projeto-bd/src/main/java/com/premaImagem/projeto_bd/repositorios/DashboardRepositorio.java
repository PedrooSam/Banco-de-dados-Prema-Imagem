package com.premaImagem.projeto_bd.repositorios;

import com.premaImagem.projeto_bd.dto.ExamesPorFaixaEtariaDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSetMetaData;
import java.time.LocalDate;
import java.util.List;


@Repository
public class DashboardRepositorio {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public DashboardRepositorio(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // RowMapper genérico para converter ResultSet em Object[]
    private final RowMapper<Object[]> objectArrayRowMapper = (rs, rowNum) -> {
        ResultSetMetaData metaData = rs.getMetaData();
        int columnCount = metaData.getColumnCount();
        Object[] row = new Object[columnCount];
        for (int i = 1; i <= columnCount; i++) {
            row[i - 1] = rs.getObject(i);
        }
        return row;
    };

    // 1. Top 10 exames mais realizados
    public List<Object[]> top10ExamesMaisRealizados() {
        String sql = "SELECT ex.nome, COUNT(ae.idExame) AS quantidade " +
                "FROM AgendaExame ae JOIN Exame ex ON ae.idExame = ex.id " +
                "WHERE ae.status = 'realizado' " +
                "GROUP BY ex.nome " +
                "ORDER BY quantidade DESC LIMIT 10";
        return jdbcTemplate.query(sql, objectArrayRowMapper);
    }

    // 2. Número de exames por médico
    public List<Object[]> examesPorMedico() {
        String sql = "SELECT m.id, col.nome, COUNT(ae.idMedico) AS total_exames " +
                "FROM AgendaExame ae " +
                "JOIN Medico m ON ae.idMedico = m.id " +
                "JOIN Colaborador col ON m.id = col.id " +
                "WHERE ae.status = 'realizado' " + // Corrigido de 'pago' para 'realizado'
                "GROUP BY m.id, col.nome " +
                "ORDER BY total_exames DESC";
        return jdbcTemplate.query(sql, objectArrayRowMapper);
    }

    // 3. Distribuição dos exames por período do dia
    public List<Object[]> examesPorPeriodoParaDataEspecifica(LocalDate dataEspecifica) {
        String sql = "SELECT " +
                "CASE " +
                "  WHEN HOUR(dataHoraRealizacao) < 6 OR HOUR(dataHoraRealizacao) >= 22 THEN 'Madrugada' " +
                "  WHEN HOUR(dataHoraRealizacao) >= 6 AND HOUR(dataHoraRealizacao) < 12 THEN 'Manhã' " +
                "  WHEN HOUR(dataHoraRealizacao) >= 12 AND HOUR(dataHoraRealizacao) < 18 THEN 'Tarde' " +
                "  WHEN HOUR(dataHoraRealizacao) >= 18 AND HOUR(dataHoraRealizacao) < 22 THEN 'Noite' " +
                "END AS periodo, " +
                "COUNT(*) AS total_exames " +
                "FROM AgendaExame " +
                "WHERE status = \'realizado\' " + // Corrigido de volta para 'realizado'
                "  AND DATE(dataHoraRealizacao) = ? " +
                "GROUP BY periodo";

        return jdbcTemplate.query(sql, objectArrayRowMapper, java.sql.Date.valueOf(dataEspecifica));
    }

    // 4. Total de exames realizados no mês/ano
    public Long getContagemExamesRealizadosPorMesAno(int ano, int mes) {
        String sql = "SELECT COUNT(*) AS total_exames " +
                "FROM AgendaExame " +
                "WHERE status = 'realizado' " + // Corrigido de 'pago' para 'realizado'
                "  AND YEAR(dataHoraRealizacao) = ? " +
                "  AND MONTH(dataHoraRealizacao) = ?";

        return jdbcTemplate.queryForObject(sql, Long.class, ano, mes);
    }

    // 5. % de exames realizados por médico
    public List<Object[]> percentualExamesPorMedico() {
        String sql = "SELECT c.nome, " +
                "       (COUNT(*) * 100.0 / (SELECT COUNT(*) FROM AgendaExame WHERE status = 'realizado')) AS percentual " +
                "FROM AgendaExame a " + // Nome da tabela como no BD
                "JOIN Medico m ON a.idMedico = m.id " +
                "JOIN Colaborador c ON m.id = c.id " +
                "WHERE a.status = 'realizado' " +
                "GROUP BY c.nome " +
                "ORDER BY percentual DESC";
        return jdbcTemplate.query(sql, objectArrayRowMapper);
    }

    // 6. Médicos com mais atendimentos no mês atual
    public List<Object[]> top5MedicosAtendimentosPorMesAno(int ano, int mes) {
        String sql = "SELECT c.nome, COUNT(*) AS atendimentos " +
                "FROM AgendaExame a " +
                "JOIN Medico m ON a.idMedico = m.id " +
                "JOIN Colaborador c ON m.id = c.id " +
                "WHERE a.status = 'realizado' " +
                "  AND YEAR(a.dataHoraRealizacao) = ? " +
                "  AND MONTH(a.dataHoraRealizacao) = ? " +
                "GROUP BY c.nome " +
                "ORDER BY atendimentos DESC " +
                "LIMIT 5";

        return jdbcTemplate.query(sql, objectArrayRowMapper, ano, mes);
    }

    // 7. Pacientes com mais exames realizados
    public List<Object[]> top10PacientesMaisExames() {
        String sql = "SELECT p.nome, COUNT(*) AS total_exames " +
                "FROM AgendaExame a " +
                "JOIN Paciente p ON a.idPaciente = p.id " +
                "WHERE a.status = 'realizado' " +
                "GROUP BY p.id, p.nome " +
                "ORDER BY total_exames DESC " +
                "LIMIT 10";
        return jdbcTemplate.query(sql, objectArrayRowMapper);
    }

    // 8. Exames por faixa etária dos pacientes
    public ExamesPorFaixaEtariaDTO getExamesPorFaixaEtariaEspecifica(String faixaEtariaDesejada) {
        String sql = "WITH ExamesComFaixaEtaria AS ( " +
                "    SELECT " +
                "        CASE " +
                "            WHEN TIMESTAMPDIFF(YEAR, p.dataNascimento, CURDATE()) < 18 THEN '<18' " +
                "            WHEN TIMESTAMPDIFF(YEAR, p.dataNascimento, CURDATE()) BETWEEN 18 AND 35 THEN '18-35' " +
                "            WHEN TIMESTAMPDIFF(YEAR, p.dataNascimento, CURDATE()) BETWEEN 36 AND 60 THEN '36-60' " +
                "            ELSE '>60' " +
                "        END AS faixa_calculada " +
                "    FROM AgendaExame a " +
                "    JOIN Paciente p ON a.idPaciente = p.id " +
                "    WHERE a.status = 'realizado' " +
                ") " +
                "SELECT ? AS faixa_etaria_param, COUNT(*) AS total_exames " +
                "FROM ExamesComFaixaEtaria " +
                "WHERE faixa_calculada = ?";

        try {
            // Usamos queryForObject porque esperamos uma única linha de resultado (a faixa e sua contagem)
            return jdbcTemplate.queryForObject(sql, (rs, rowNum) -> new ExamesPorFaixaEtariaDTO(
                    rs.getString("faixa_etaria_param"),
                    rs.getLong("total_exames")
            ), faixaEtariaDesejada, faixaEtariaDesejada);
        } catch (org.springframework.dao.EmptyResultDataAccessException e) {

            return new ExamesPorFaixaEtariaDTO(faixaEtariaDesejada, 0L);
        }
    }

    // 9. Pacientes que indicaram outro paciente
    public List<Object[]> top10PacientesIndicadores() {
        String sql = "SELECT p1.nome AS paciente, COUNT(p2.id) AS indicados " +
                "FROM Paciente p1 " + // Nome da tabela como no BD
                "LEFT JOIN Paciente p2 ON p2.pacienteIndicador = p1.id " +
                "GROUP BY p1.id, p1.nome " +
                "ORDER BY indicados DESC " +
                "LIMIT 10";
        return jdbcTemplate.query(sql, objectArrayRowMapper);
    }

    // 10. Produtos mais utilizados
    public List<Object[]> top10ProdutosMaisUtilizados() {
        String sql = "SELECT p.nome AS produto, " +
                "COUNT(v.dataHoraVenda) AS vezes_vendido, " +
                "SUM(v.quantidade) AS quantidade_vendida " +
                "FROM Venda v " + // Nome da tabela como no BD
                "JOIN Produto p ON v.idProduto = p.id " +
                "GROUP BY p.id, p.nome " +
                "ORDER BY quantidade_vendida DESC " +
                "LIMIT 10";
        return jdbcTemplate.query(sql, objectArrayRowMapper);
    }

    // 11. Quantidade de produtos
    public List<Object[]> quantidadeProdutos() {
        String sql = "SELECT nome, quantidade " +
                "FROM Produto " +
                "ORDER BY quantidade DESC";
        return jdbcTemplate.query(sql, objectArrayRowMapper);
    }

    // 12. Compras por fornecedor
    public List<Object[]> comprasPorFornecedor() {
        String sql = "SELECT f.nome AS fornecedor, SUM(v.quantidade) AS total_vendido " +
                "FROM Venda v " +
                "JOIN Fornecedor f ON v.idFornecedor = f.id " +
                "GROUP BY f.id, f.nome " +
                "ORDER BY total_vendido DESC";
        return jdbcTemplate.query(sql, objectArrayRowMapper);
    }

    // 13. Total de exames agendados por dia
    public Long getContagemExamesParaDataEspecifica(LocalDate dataEspecifica) {
        String sql = "SELECT COUNT(*) AS total_exames " +
                "FROM AgendaExame " +
                "WHERE DATE(dataHoraRealizacao) = ?";

        return jdbcTemplate.queryForObject(sql, Long.class, java.sql.Date.valueOf(dataEspecifica));
    }

    // 14. Número médio de exames que um paciente faz por agendamento
    public Double mediaExamesPorAgendamentoParaPaciente(long idPaciente) {
        String sql = "SELECT AVG(qtd_exames) AS media_exames_por_agendamento " +
                "FROM ( " +
                "  SELECT idPaciente, dataHoraRealizacao, COUNT(*) AS qtd_exames " +
                "  FROM AgendaExame " +
                "  WHERE idPaciente = ? " + // Filtra pelo idPaciente específico
                "  GROUP BY idPaciente, dataHoraRealizacao " +
                ") sub";

        // queryForObject é usado para retornar um único valor esperado.
        // Se o paciente não tiver exames, a subconsulta será vazia, e AVG(conjunto_vazio) no MySQL retorna NULL.
        // O jdbcTemplate.queryForObject retornará null nesse caso para o tipo Double.
        try {
            return jdbcTemplate.queryForObject(sql, Double.class, idPaciente);
        } catch (org.springframework.dao.EmptyResultDataAccessException e) {

            return null;
        }
    }

    // 15. Quantos exames agendados por hora do dia
    public Long getContagemExamesParaDataHoraEspecifica(int ano, int mes, int dia, int hora) {
        String sql = "SELECT COUNT(*) AS total_exames " +
                "FROM AgendaExame " +
                "WHERE YEAR(dataHoraRealizacao) = ? " +   // Filtra pelo ano
                "  AND MONTH(dataHoraRealizacao) = ? " +  // Filtra pelo mês
                "  AND DAY(dataHoraRealizacao) = ? " +    // Filtra pelo dia
                "  AND HOUR(dataHoraRealizacao) = ?";    // Filtra pela hora específica

        // queryForObject é usado para retornar um único valor esperado (neste caso, Long).
        // COUNT(*) sempre retornará um valor (0 se não houver correspondências),
        // então não deve lançar EmptyResultDataAccessException.
        return jdbcTemplate.queryForObject(sql, Long.class, ano, mes, dia, hora);
    }
}