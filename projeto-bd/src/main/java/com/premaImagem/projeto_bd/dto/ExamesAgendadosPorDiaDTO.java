package com.premaImagem.projeto_bd.dto;

import java.time.LocalDate;

public class ExamesAgendadosPorDiaDTO {
    private LocalDate dia;
    private Long totalExames;

    public ExamesAgendadosPorDiaDTO(LocalDate dia, Long totalExames) {
        this.dia = dia;
        this.totalExames = totalExames;
    }

    public LocalDate getDia() { return dia; }
    public void setDia(LocalDate dia) { this.dia = dia; }
    public Long getTotalExames() { return totalExames; }
    public void setTotalExames(Long totalExames) { this.totalExames = totalExames; }
}
