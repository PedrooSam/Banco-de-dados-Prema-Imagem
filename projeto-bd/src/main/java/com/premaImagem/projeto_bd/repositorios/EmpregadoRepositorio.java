package com.premaImagem.projeto_bd.repositorios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import com.premaImagem.projeto_bd.entidades.Exames;

//TODO FUDIDO ESSE AQUI

@Repository
public class ExameRepositorio{

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ExameRepositorio(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Exames> buscarLista(){
        String sql = "SELECT * FROM Exame";
        List<Exames> exames = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Exames.class));
        return exames;
    }

    public Exames buscar(long nomeExame){
        String sql = "SELECT * FROM Exame WHERE Exame.nome = ?";
        return jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(Exames.class), nomeExame);
    }

    public int criar(Exames exame){
        String sql = "INSERT INTO Exame (nome, preparo, preco) VALUES (?,?,?)";
        return jdbcTemplate.update(sql, exame.getNome(), exame.getPreparo(), exame.getPreco());
    }

    public int editar(Exames exame){
        String sql = "UPDATE Exame SET Exame.nome = ?, Exame.preparo = ?, Exame.preco = ? WHERE id = ?";
        return jdbcTemplate.update(sql, exame.getNome(), exame.getPreparo(), exame.getPreco(), exame.getId());
    }

    public int deletar(long id){
        String sql = "DELETE FROM Exame WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }

}