package com.premaImagem.projeto_bd.repositorios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import com.premaImagem.projeto_bd.entidades.AgendaExame;

@Repository
public class AgendaExameRepositorio {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public AgendaExameRepositorio(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<AgendaExame> buscarLista() {
        String sql = "SELECT * FROM AgendaExame";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(AgendaExame.class));
    }

    public AgendaExame buscar(long idExame) {
        String sql = "SELECT * FROM AgendaExame WHERE idExame = ?";
        return jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(AgendaExame.class), idExame);
    }

    public int criar(AgendaExame agendaExame) {
        String sql = "INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) " +
                     "VALUES (?, ?, ?, ?, ?, ?, ?)";
        return jdbcTemplate.update(sql,
            agendaExame.getDataHoraRealizacao(),
            agendaExame.getMedicoRequisitante(),
            agendaExame.getLaudo(),
            agendaExame.getStatus(),
            agendaExame.getIdPaciente(),
            agendaExame.getIdMedico(),
            agendaExame.getIdExame()
        );
    }

    public int atualizar(AgendaExame agendaExame) {
        String sql = "UPDATE AgendaExame SET dataHoraRealizacao = ?, medicoRequisitante = ?, laudo = ?, status = ?, " +
                     "idPaciente = ?, idMedico = ? WHERE idExame = ?";
        return jdbcTemplate.update(sql,
            agendaExame.getDataHoraRealizacao(),
            agendaExame.getMedicoRequisitante(),
            agendaExame.getLaudo(),
            agendaExame.getStatus(),
            agendaExame.getIdPaciente(),
            agendaExame.getIdMedico(),
            agendaExame.getIdExame()
        );
    }

    public int deletar(long idExame) {
        String sql = "DELETE FROM AgendaExame WHERE idExame = ?";
        return jdbcTemplate.update(sql, idExame);
    }
}
