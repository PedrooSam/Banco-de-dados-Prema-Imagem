package com.premaImagem.projeto_bd.entidades;

import java.time.LocalDateTime;



public class AgendaExame {
    
    private LocalDateTime dataHoraRealizacao;
    private String medicoRequisitante;
    private String laudo;
    private String status;
    private long idPaciente;
    private long idMedico;
    private long idExame;


    public AgendaExame(LocalDateTime dataHoraRealizacao, String medicoRequisitante, String laudo, String status,
                        long idPaciente, long idMedico, long idExame) {

        this.dataHoraRealizacao = dataHoraRealizacao;
        this.medicoRequisitante = medicoRequisitante;
        this.laudo = laudo;
        this.status = status;
        this.idPaciente = idPaciente;
        this.idMedico = idMedico;
        this.idExame = idExame;
    }



    public LocalDateTime getDataHoraRealizacao() {
        return dataHoraRealizacao;
    }
    
    public void setDataHoraRealizacao(LocalDateTime dataHoraRealizacao) {
        this.dataHoraRealizacao = dataHoraRealizacao;
    }
    
    public String getMedicoRequisitante() {
        return medicoRequisitante;
    }
    
    public void setMedicoRequisitante(String medicoRequisitante) {
        this.medicoRequisitante = medicoRequisitante;
    }
    
    public String getLaudo() {
        return laudo;
    }
    
    public void setLaudo(String laudo) {
        this.laudo = laudo;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public long getIdPaciente() {
        return idPaciente;
    }
    
    public void setIdPaciente(long idPaciente) {
        this.idPaciente = idPaciente;
    }
    
    public long getIdMedico() {
        return idMedico;
    }
    
    public void setIdMedico(long idMedico) {
        this.idMedico = idMedico;
    }
    
    public long getIdExame() {
        return idExame;
    }
    
    public void setIdExame(long idExame) {
        this.idExame = idExame;
    }
    
}
