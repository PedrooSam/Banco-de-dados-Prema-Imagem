package com.premaImagem.projeto_bd.repositorios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import com.premaImagem.projeto_bd.entidades.Exames;
@Repository
public class MedicoRepositorio{

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public MedicoRepositorio(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Medicos> buscarLista(){
        String sql = "SELECT * FROM Medico";
        List<Medicos> medicos = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Medicos.class));
        return medicos;
    }

    public Colaborador buscar(long nome){
        String sql = "SELECT * FROM Colaborador WHERE Colaborador.nome = ?";
        return jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(Colaborador.class), nome);
    }

    public int criar(Colaborador colaborador, Medicos medico){
        String sql = "INSERT INTO Colaborador (id, cpf, nome) VALUES (?,?,?), Medico (crm, especialidade) VALUES (?,?)";
        return jdbcTemplate.update(sql, colaborador.getId(), colaborador.getCpf(), colaborador.getNome(), medico.getCrm(), medico.getEspecialidade());
    }

    public int editar(Colaborador colaborador, Medico medico){
        String sql = "UPDATE Colaborador SET Colaborador.nome = ?, Medico.especialidade = ? WHERE id = ?";
        return jdbcTemplate.update(sql, colaborador.getNome(), Medico.Especialidade(), colaborador.getId());
    }

    public int deletar(long id){
        String sql = "DELETE FROM Colaborador WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }

}