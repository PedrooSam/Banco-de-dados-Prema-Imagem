package com.premaImagem.projeto_bd.dto;

public class MediaExamesPorAgendamentoDTO {
    private Double mediaExamesPorAgendamento;

    public MediaExamesPorAgendamentoDTO(Double mediaExamesPorAgendamento) {
        this.mediaExamesPorAgendamento = mediaExamesPorAgendamento;
    }

    public Double getMediaExamesPorAgendamento() { return mediaExamesPorAgendamento; }
    public void setMediaExamesPorAgendamento(Double mediaExamesPorAgendamento) { this.mediaExamesPorAgendamento = mediaExamesPorAgendamento; }
}
