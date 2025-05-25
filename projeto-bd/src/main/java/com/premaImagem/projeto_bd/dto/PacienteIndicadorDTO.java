package com.premaImagem.projeto_bd.dto;

public class PacienteIndicadorDTO {
    private String paciente;
    private Long indicados;

    public PacienteIndicadorDTO(String paciente, Long indicados) {
        this.paciente = paciente;
        this.indicados = indicados;
    }

    public String getPaciente() { return paciente; }
    public void setPaciente(String paciente) { this.paciente = paciente; }
    public Long getIndicados() { return indicados; }
    public void setIndicados(Long indicados) { this.indicados = indicados; }
}
