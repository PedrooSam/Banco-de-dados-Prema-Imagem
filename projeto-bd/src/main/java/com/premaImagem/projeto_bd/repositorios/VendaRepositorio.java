package com.premaImagem.projeto_bd.repositorios;

import com.premaImagem.projeto_bd.entidades.Venda;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;
import java.time.LocalDateTime;

@Repository
public class VendaRepositorio{

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public VendaRepositorio(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Venda> buscarLista(){
        String sqlVenda = "SELECT * FROM Venda";
        return jdbcTemplate.query(sqlVenda, new BeanPropertyRowMapper<>(Venda.class));
    }

    public List<Venda> buscarPorDataHora(LocalDateTime dataHoraVenda){
        String sqlVenda = "SELECT * FROM Venda WHERE dataHoraVenda = ?";
        List<Venda> venda = jdbcTemplate.query(sqlVenda, new BeanPropertyRowMapper<>(Venda.class), dataHoraVenda);
        return venda;
    }

    //buscar por produto
    public List<Venda> buscarPorProduto(String nome){
        String sqlVenda = "SELECT v.dataHoraVenda, v.quantidade, v.idFornecedor, v.idProduto, v.idSocio FROM Venda v INNER JOIN Produto p ON v.idProduto = p.id WHERE p.nome = ?";
        return jdbcTemplate.query(sqlVenda, new BeanPropertyRowMapper<>(Venda.class), nome);
    }

    public int criar(Venda venda){
        String sql = "INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES (?, ?, ?, ?, ?)";
        return jdbcTemplate.update(sql,Timestamp.valueOf(venda.getDataHoraVenda()), venda.getQuantidade(), venda.getIdFornecedor(), venda.getIdProduto(), venda.getIdSocio());
    }

    public int atualizar (Venda venda){
        String sql = "UPDATE Venda SET quantidade = ?, idFornecedor = ?, idProduto = ?, idSocio = ? WHERE dataHoraVenda = ?";
        return jdbcTemplate.update(sql,  venda.getQuantidade(), venda.getIdFornecedor(), venda.getIdProduto(), venda.getIdSocio(), Timestamp.valueOf(venda.getDataHoraVenda()));
    }

    public int deletar (LocalDateTime dataHoraVenda){
        String sql = "DELETE FROM Venda WHERE dataHoraVenda = ?";
        return jdbcTemplate.update(sql, Timestamp.valueOf(dataHoraVenda));
    }

}
