package com.premaImagem.projeto_bd.entidades;

import java.time.LocalDateTime;

class Venda{
    private LocalDateTime dataHoraVenda;
    private int quantidade;

    public Venda(LocalDateTime dataHoraVenda, int quantidade) {
        this.dataHoraVenda = dataHoraVenda;
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
}
