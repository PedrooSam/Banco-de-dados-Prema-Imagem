package com.premaImagem.projeto_bd.repositorios;

import com.premaImagem.projeto_bd.entidades.Pagamento;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public class PagamentoRepositorio{

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public PagamentoRepositorio(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Pagamento> buscarLista(){
        String sqlPagamento = "SELECT * FROM PAGAMENTO";
        return jdbcTemplate.query(sqlPagamento, new BeanPropertyRowMapper<>(Pagamento.class));
    }

    public List<Pagamento> buscarPorId(long id){
        String sqlPagamento = "SELECT * FROM Pagamento WHERE id = ?";
        return jdbcTemplate.query(sqlPagamento, new BeanPropertyRowMapper<>(Pagamento.class), id);
    }

    public int criar(Pagamento pagamento){
        String sqlPagamento = "INSERT INTO Pagamento (formaPagamento, valorPago, parcelas, notaFiscal, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        return jdbcTemplate.update(sqlPagamento, pagamento.getFormaPagamento(), pagamento.getValorPago(), pagamento.getParcelas(), pagamento.getNotaFiscal(), Timestamp.valueOf(pagamento.getDataPagamento()), Timestamp.valueOf(pagamento.getAgendaExameDataHora()), pagamento.getAgendaExamePaciente(), pagamento.getAgendaExameMedico(), pagamento.getAgendaExameExame());
    }

    public int atualizar(Pagamento pagamento){
        String sqlPagamento = "UPDATE Pagamento SET formaPagamento = ?, valorPago = ?, parcelas = ?, notaFiscal = ?, dataPagamento = ? WHERE id = ?";
        return jdbcTemplate.update(sqlPagamento, pagamento.getFormaPagamento(), pagamento.getValorPago(), pagamento.getParcelas(), pagamento.getNotaFiscal(), Timestamp.valueOf(pagamento.getDataPagamento()), pagamento.getId());
    }

    public int deletar(long id){
        String sqlPagamento = "DELETE FROM Pagamento WHERE id = ?";
        return jdbcTemplate.update(sqlPagamento, id);
    }
}