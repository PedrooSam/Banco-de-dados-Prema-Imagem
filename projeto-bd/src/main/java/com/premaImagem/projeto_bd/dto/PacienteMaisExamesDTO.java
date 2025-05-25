package com.premaImagem.projeto_bd.dto;

public class PacienteMaisExamesDTO {
    private String nome;
    private Long totalExames;

    public PacienteMaisExamesDTO(String nome, Long totalExames) {
        this.nome = nome;
        this.totalExames = totalExames;
    }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public Long getTotalExames() { return totalExames; }
    public void setTotalExames(Long totalExames) { this.totalExames = totalExames; }
}
