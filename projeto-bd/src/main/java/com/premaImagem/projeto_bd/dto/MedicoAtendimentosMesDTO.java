package com.premaImagem.projeto_bd.dto;

public class MedicoAtendimentosMesDTO {
    private String nome;
    private Long atendimentos;

    public MedicoAtendimentosMesDTO(String nome, Long atendimentos) {
        this.nome = nome;
        this.atendimentos = atendimentos;
    }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public Long getAtendimentos() { return atendimentos; }
    public void setAtendimentos(Long atendimentos) { this.atendimentos = atendimentos; }
}
