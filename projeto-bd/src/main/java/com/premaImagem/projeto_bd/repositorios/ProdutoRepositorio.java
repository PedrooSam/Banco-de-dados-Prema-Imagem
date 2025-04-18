package com.premaImagem.projeto_bd.repositorios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.jdbc.core.BeanPropertyRowMapper;

import com.premaImagem.projeto_bd.entidades.Produto;

@Repository
public class ProdutoRepositorio {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ProdutoRepositorio(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Produto> buscarLista(){
        String sql = "SELECT * FROM Produto";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Produto.class));
    }

    public Produto buscarPorNome(String nome){
        String sql = "SELECT * FROM Produto WHERE Produto.nome = ?";
        return jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(Produto.class), nome);
    }

    public Produto buscarPorId(long id){
        String sql = "SELECT * FROM Produto WHERE Produto.id = ?";
        return jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(Produto.class), id);
    }

    public int criar(Produto produto){
        String sql = "INSERT INTO Produto (id, nome, preco) VALUES (?, ?, ?)";
        return jdbcTemplate.update(sql, produto.getId(), produto.getNome(), produto.getPreco());
    }

    public int atualizar(Produto produto){
        String sql = "UPDATE Produto SET nome = ?, preco = ? WHERE Produto.id = ?";
        return jdbcTemplate.update(sql, produto.getNome(), produto.getPreco(), produto.getId());
    }

    public int deletar(long id){
        String sql = "DELETE FROM Produto WHERE Produto.id = ?";
        return jdbcTemplate.update(sql, id);
    }
}
