package com.premaImagem.projeto_bd.dto;

public class PercentualExamesPorMedicoDTO {
    private String nome;
    private Double percentual;

    public PercentualExamesPorMedicoDTO(String nome, Double percentual) {
        this.nome = nome;
        this.percentual = percentual;
    }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public Double getPercentual() { return percentual; }
    public void setPercentual(Double percentual) { this.percentual = percentual; }
}
