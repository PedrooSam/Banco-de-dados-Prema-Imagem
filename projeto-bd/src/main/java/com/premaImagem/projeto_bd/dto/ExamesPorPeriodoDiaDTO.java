package com.premaImagem.projeto_bd.dto;

public class ExamesPorPeriodoDiaDTO {

    private String periodo;
    private Long totalExames;

    public ExamesPorPeriodoDiaDTO(String periodo, Long totalExames) {
        this.periodo = periodo;
        this.totalExames = totalExames;
    }

    public String getPeriodo() { return periodo; }
    public void setPeriodo(String periodo) { this.periodo = periodo; }
    public Long getTotalExames() { return totalExames; }
    public void setTotalExames(Long totalExames) { this.totalExames = totalExames; }

}
