package com.premaImagem.projeto_bd.repositorios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.premaImagem.projeto_bd.entidades.Colaborador;

@Repository
public class ColaboradorRepositorio {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ColaboradorRepositorio(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Colaborador> buscarLista() {
        String sql = "SELECT * FROM Colaborador";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Colaborador.class));
    }

    public Colaborador buscar(String id) {
        String sql = "SELECT * FROM Colaborador WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(Colaborador.class), id);
    }

    public int criar(Colaborador colaborador) {
        String sql = "INSERT INTO Colaborador (id, cpf, nome) VALUES (?, ?, ?)";
        return jdbcTemplate.update(sql, colaborador.getId(), colaborador.getCpf(), colaborador.getNome());
    }

    public int editar(Colaborador colaborador) {
        String sql = "UPDATE Colaborador SET cpf = ?, nome = ? WHERE id = ?";
        return jdbcTemplate.update(sql, colaborador.getCpf(), colaborador.getNome(), colaborador.getId());
    }

    public int deletar(String id) {
        String sql = "DELETE FROM Colaborador WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }
}
