package com.premaImagem.projeto_bd.dto;

public class ExamesPorMedicoDTO {
    private Long id;
    private String nome;
    private Long totalExames;

    public ExamesPorMedicoDTO(Long id, String nome, Long totalExames) {
        this.id = id;
        this.nome = nome;
        this.totalExames = totalExames;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public Long getTotalExames() { return totalExames; }
    public void setTotalExames(Long totalExames) { this.totalExames = totalExames; }
}
