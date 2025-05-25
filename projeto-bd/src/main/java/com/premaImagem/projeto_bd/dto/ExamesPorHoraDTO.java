package com.premaImagem.projeto_bd.dto;

public class ExamesPorHoraDTO {
    private Integer hora;
    private Long totalExames;

    public ExamesPorHoraDTO(Integer hora, Long totalExames) {
        this.hora = hora;
        this.totalExames = totalExames;
    }

    public Integer getHora() { return hora; }
    public void setHora(Integer hora) { this.hora = hora; }
    public Long getTotalExames() { return totalExames; }
    public void setTotalExames(Long totalExames) { this.totalExames = totalExames; }
}
