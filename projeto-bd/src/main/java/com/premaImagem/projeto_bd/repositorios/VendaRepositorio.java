package com.premaImagem.projeto_bd.repositorios;

import com.premaImagem.projeto_bd.entidades.Venda;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.time.LocalDateTime;

@Repository
class VendaRepositorio{

    private final JdbcTemplate jdbcTemplate;

    @Autorwired
    public VendaRepositorio(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Venda> buscarLista(){
        String sqlVenda = "SELECT * FROM Venda";
        return jdbcTemplate.query(sqlVenda, new BeanPropertyRowMapper<>(Venda.class));
    }

    public Venda buscarPorDataHora(LocalDateTime dataHoraVenda){
        String sqlVenda = "SELECT * FROM Venda WHERE dataHoraVenda = ?";
        return jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(Venda.class), dataHoraVenda);
    }

    //buscar por produto
    public Venda buscarPorProduto(String produto){
        String sqlVenda = "SELECT v.dataHoraVenda, v.quantidade, p.nome, p.preco, p.quantidade, p.idProduto FROM Venda v INNER JOIN Produto p ON v.dataHoraVenda = p.idProduto";
        return jdbcTemplate.query(sqlVenda, new BeanPropertyRowMapper<>(Venda.class));
    }

    public int criar(Venda venda){
        String sql = "INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES (?, ?, ?, ?, ?)";
        return jdbcTemplate.update(sql,venda.getDataHoraVenda(), venda.getQuantidade(), venda.getIdFornecedor(), venda.getIdProduto(), venda.getIdSocio());
    }

    public int atualizar (Venda venda){
        String sql = "UPDATE Venda SET quantidade = ?, idFornecedor = ?, idProduto = ?, idSocio = ? WHERE dataHoraVenda = ?";
        return jdbcTemplate.update(sql,  venda.getQuantidade(), venda.getIdFornecedor(), venda.getIdProduto(), venda.getIdSocio(), venda.getDataHoraVenda());
    }

    public int deletar (Venda dataHoraVenda){
        String sql = "DELETE FROM Venda WHERE dataHoraVenda = ?";
        return jdbcTemplate.update(sql, dataHoraVenda);
    }

}
