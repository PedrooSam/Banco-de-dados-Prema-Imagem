package com.premaImagem.projeto_bd.repositorios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import com.premaImagem.projeto_bd.entidades.Medico;
import org.springframework.transaction.annotation.Transactional;

//CORRIGIR PRA HERANÇA NOVA (NÃO SEI COMO FAZER AINDA)

@Repository
public class MedicoRepositorio{

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public MedicoRepositorio(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Medico> buscarLista(){
        String sqlMedico = "SELECT c.id, c.nome, c.cpf, m.crm, m.especialidade FROM Colaborador c INNER JOIN Medico m ON c.id = m.id";
        return jdbcTemplate.queryForObject(sqlMedico, new BeanPropertyRowMapper<>(Medico.class));
    }

    public Medico buscarPorNome(String nome){
        String sqlMedico = "SELECT c.id, c.nome, c.cpf, m.crm, m.especialidade FROM Colaborador c INNER JOIN Medico m ON c.id = m.id WHERE c.nome = ?";
        return jdbcTemplate.queryForObject(sqlMedico, new BeanPropertyRowMapper<>(Medico.class), nome);
    }

    //buscar por id
    public Medico buscarPorId(long id){
        String sqlMedico = "SELECT c.id, c.nome, c.cpf, m.crm, m.especialidade FROM Colaborador c INNER JOIN Medico m ON c.id = m.id WHERE c.id = ?";
        return jdbcTemplate.queryForObject(sqlMedico, new BeanPropertyRowMapper<>(Medico.class), id);
    }

    @Transactional
    public int criar(Medico medico){
        String sqlColaborador = "INSERT INTO Colaborador (cpf, nome) VALUES (?, ?)";
        jdbcTemplate.update(sqlColaborador, medico.getCpf(), medico.getNome());

        String sqlMedico = "INSERT INTO Medico (id, crm, especialidade) VALUES (?, ?, ?)";
        return jdbcTemplate.update(sqlMedico, medico.getId(),medico.getCrm(), medico.getEspecialidade());
    }

    @Transactional
    public int atualizar(Medico medico){
        String sqlColaborador = "UPDATE Colaborador SET Colaborador.nome = ?, Colaborador.cpf = ? WHERE id = ?";
        jdbcTemplate.update(sqlColaborador, medico.getNome(), medico.getCpf(), medico.getId());

        String sqlMedico = "UPDATE Medico SET Medico.crm = ?, Medico.especialidade = ? Where Medico.id = ?";
        return jdbcTemplate.update(sqlMedico, medico.getCrm(), medico.getEspecialidade, medico.getId());
    }

    @Transactional
    public int deletar(long id){
        String sqlMedico = "DELETE FROM Medico WHERE id = ?";
        jdbcTemplate.update(sqlMedico, id);

        String sqlColaborador = "DELETE FROM Colaborador Where id = ?";
        return jdbcTemplate.update(sqlColaborador, id);
    }

}