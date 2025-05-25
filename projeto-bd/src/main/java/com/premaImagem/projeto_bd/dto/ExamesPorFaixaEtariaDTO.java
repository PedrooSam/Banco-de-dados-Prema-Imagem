package com.premaImagem.projeto_bd.dto;

public class ExamesPorFaixaEtariaDTO {
    private String faixaEtaria;
    private Long totalExames;

    public ExamesPorFaixaEtariaDTO(String faixaEtaria, Long totalExames) {
        this.faixaEtaria = faixaEtaria;
        this.totalExames = totalExames;
    }

    public String getFaixaEtaria() { return faixaEtaria; }
    public void setFaixaEtaria(String faixaEtaria) { this.faixaEtaria = faixaEtaria; }
    public Long getTotalExames() { return totalExames; }
    public void setTotalExames(Long totalExames) { this.totalExames = totalExames; }
}
