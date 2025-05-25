package com.premaImagem.projeto_bd.dto;

public class QuantidadeProdutoDTO {
    private String nome;
    private Long quantidade;

    public QuantidadeProdutoDTO(String nome, Long quantidade) {
        this.nome = nome;
        this.quantidade = quantidade;
    }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public Long getQuantidade() { return quantidade; }
    public void setQuantidade(Long quantidade) { this.quantidade = quantidade; }
}
