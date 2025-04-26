package com.premaImagem.projeto_bd.entidades;

import java.time.LocalDateTime;

public class Venda{
    private LocalDateTime dataHoraVenda;
    private int quantidade;
    private long idFornecedor;
    private long idProduto;
    private long idSocio;

    public Venda(){

    }
    public Venda(LocalDateTime dataHoraVenda, long idSocio, long idProduto, long idFornecedor, int quantidade) {
        this.dataHoraVenda = dataHoraVenda;
        this.idSocio = idSocio;
        this.idProduto = idProduto;
        this.idFornecedor = idFornecedor;
        this.quantidade = quantidade;
    }

    public LocalDateTime getDataHoraVenda() {
        return dataHoraVenda;
    }

    public void setDataHoraVenda(LocalDateTime dataHoraVenda) {
        this.dataHoraVenda = dataHoraVenda;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    public long getIdFornecedor() {
        return idFornecedor;
    }

    public void setIdFornecedor(long idFornecedor) {
        this.idFornecedor = idFornecedor;
    }

    public long getIdProduto() {
        return idProduto;
    }

    public void setIdProduto(long idProduto) {
        this.idProduto = idProduto;
    }

    public long getIdSocio() {
        return idSocio;
    }

    public void setIdSocio(long idSocio) {
        this.idSocio = idSocio;
    }
}
