package com.premaImagem.projeto_bd.repositorios;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import com.premaImagem.projeto_bd.entidades.Colaborador;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import com.premaImagem.projeto_bd.entidades.Medico;
import org.springframework.transaction.annotation.Transactional;



@Repository
public class MedicoRepositorio{

    private final JdbcTemplate jdbcTemplate;


    @Autowired
    public MedicoRepositorio(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Medico> buscarLista(){
        String sqlMedico = "SELECT c.id, c.nome, c.cpf, m.crm, m.especialidade FROM Colaborador c INNER JOIN Medico m ON c.id = m.id";
        return jdbcTemplate.query(sqlMedico, new BeanPropertyRowMapper<>(Medico.class));
    }

    public List<Medico> buscarPorNome(String nome){
        String sqlMedico = "SELECT c.id, c.nome, c.cpf, m.crm, m.especialidade FROM Colaborador c INNER JOIN Medico m ON c.id = m.id WHERE c.nome = ?";
        return jdbcTemplate.query(sqlMedico, new BeanPropertyRowMapper<>(Medico.class), nome);
    }

    //buscar por id
    public List<Medico> buscarPorId(long id){
        String sqlMedico = "SELECT c.id, c.nome, c.cpf, m.crm, m.especialidade FROM Colaborador c INNER JOIN Medico m ON c.id = m.id WHERE c.id = ?";
        List<Medico> medico = jdbcTemplate.query(sqlMedico, new BeanPropertyRowMapper<>(Medico.class), id);
        return medico;
    }

    @Transactional
    public int criar(Medico medico) {
        // Primeiro tenta buscar colaborador pelo CPF
        Colaborador colaboradorExistente = null;
        try {
            String sqlBuscaColaborador = "SELECT * FROM Colaborador WHERE cpf = ?";
            colaboradorExistente = jdbcTemplate.queryForObject(
                    sqlBuscaColaborador,
                    new BeanPropertyRowMapper<>(Colaborador.class),
                    medico.getCpf()
            );
        } catch (Exception e) {
            // Se não encontrar, ignora o erro e segue com a criação
        }

        long id;

        if (colaboradorExistente != null) {
            // Colaborador já existe, usa o ID dele
            id = colaboradorExistente.getId();
        } else {
            // Cria novo colaborador
            String sqlColaborador = "INSERT INTO Colaborador (cpf, nome) VALUES (?, ?)";
            jdbcTemplate.update(sqlColaborador, medico.getCpf(), medico.getNome());

            // Pega o ID recém-gerado
            Number idNumber = jdbcTemplate.queryForObject("SELECT LAST_INSERT_ID()", Number.class);
            id = idNumber.longValue();
        }

        // Define o ID no médico
        medico.setId(id);

        // Agora insere o médico
        String sqlMedico = "INSERT INTO Medico (id, crm, especialidade) VALUES (?, ?, ?)";
        return jdbcTemplate.update(sqlMedico, medico.getId(), medico.getCrm(), medico.getEspecialidade());
    }

    @Transactional
    public void transferirVinculosMedico(long idAntigo, long idNovo) {
        // 1. Buscar todos os agendamentos do médico antigo
        String selectAgendas = "SELECT * FROM AgendaExame WHERE idMedico = ?";
        List<Map<String, Object>> agendas = jdbcTemplate.queryForList(selectAgendas, idAntigo);

        for (Map<String, Object> agenda : agendas) {
            // Pegando os campos da agenda antiga
            LocalDateTime dataHoraRealizacao = (LocalDateTime) agenda.get("dataHoraRealizacao");
            Long idPaciente = ((Number) agenda.get("idPaciente")).longValue();
            Long idExame = ((Number) agenda.get("idExame")).longValue();
            String medicoRequisitante = (String) agenda.get("medicoRequisitante");
            String laudo = (String) agenda.get("laudo");
            String status = (String) agenda.get("status");

            // 2. Inserir novo agendamento com idMedico novo
            String insertAgenda = "INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) " +
                    "VALUES (?, ?, ?, ?, ?, ?, ?)";
            jdbcTemplate.update(insertAgenda,
                    dataHoraRealizacao,
                    medicoRequisitante,
                    laudo,
                    status,
                    idPaciente,
                    idNovo,
                    idExame
            );

            // 3. Atualizar pagamentos apontando para o novo agendamento
            String updatePagamento = "UPDATE Pagamento SET agendaExameMedico = ? " +
                    "WHERE agendaExameDataHora = ? AND agendaExamePaciente = ? AND agendaExameMedico = ? AND agendaExameExame = ?";
            jdbcTemplate.update(updatePagamento,
                    idNovo,
                    dataHoraRealizacao,
                    idPaciente,
                    idAntigo,
                    idExame
            );

            // 4. Deletar agendamento antigo
            String deleteAgenda = "DELETE FROM AgendaExame WHERE dataHoraRealizacao = ? AND idPaciente = ? AND idMedico = ? AND idExame = ?";
            jdbcTemplate.update(deleteAgenda,
                    dataHoraRealizacao,
                    idPaciente,
                    idAntigo,
                    idExame
            );
        }
    }

    @Transactional
    public int atualizar(Medico medico){
        String sqlColaborador = "UPDATE Colaborador SET Colaborador.nome = ?, Colaborador.cpf = ? WHERE id = ?";
        jdbcTemplate.update(sqlColaborador, medico.getNome(), medico.getCpf(), medico.getId());


        String sqlMedico = "UPDATE Medico SET Medico.crm = ?, Medico.especialidade = ? Where Medico.id = ?";
        return jdbcTemplate.update(sqlMedico, medico.getCrm(), medico.getEspecialidade(), medico.getId());
    }

    @Transactional
    public int deletar(long id){
        String sqlMedico = "DELETE FROM Medico WHERE id = ?";
        jdbcTemplate.update(sqlMedico, id);

        String sqlColaborador = "DELETE FROM Colaborador Where id = ?";
        return jdbcTemplate.update(sqlColaborador, id);
    }

}