package com.premaImagem.projeto_bd.entidades;

import java.time.LocalDateTime;

public class Pagamento{
    private long id;
    private String formaPagamento;
    private Double valorPago;
    private int parcelas;
    private String notaFiscal;
    private LocalDateTime dataPagamento;

    private LocalDateTime agendaExameDataHora;
    private long agendaExamePaciente;
    private long agendaExameMedico;
    private long agendaExameExame;

    public Pagamento(long id, long agendaExameExame, long agendaExameMedico, long agendaExamePaciente, LocalDateTime agendaExameDataHora, LocalDateTime dataPagamento, String notaFiscal, int parcelas, Double valorPago, String formaPagamento) {
        this.id = id;
        this.agendaExameExame = agendaExameExame;
        this.agendaExameMedico = agendaExameMedico;
        this.agendaExamePaciente = agendaExamePaciente;
        this.agendaExameDataHora = agendaExameDataHora;
        this.dataPagamento = dataPagamento;
        this.notaFiscal = notaFiscal;
        this.parcelas = parcelas;
        this.valorPago = valorPago;
        this.formaPagamento = formaPagamento;
    }

    public Pagamento(){

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFormaPagamento() {
        return formaPagamento;
    }

    public void setFormaPagamento(String formaPagamento) {
        this.formaPagamento = formaPagamento;
    }

    public Double getValorPago() {
        return valorPago;
    }

    public void setValorPago(Double valorPago) {
        this.valorPago = valorPago;
    }

    public int getParcelas() {
        return parcelas;
    }

    public void setParcelas(int parcelas) {
        this.parcelas = parcelas;
    }

    public String getNotaFiscal() {
        return notaFiscal;
    }

    public void setNotaFiscal(String notaFiscal) {
        this.notaFiscal = notaFiscal;
    }

    public LocalDateTime getDataPagamento() {
        return dataPagamento;
    }

    public void setDataPagamento(LocalDateTime dataPagamento) {
        this.dataPagamento = dataPagamento;
    }

    public LocalDateTime getAgendaExameDataHora() {
        return agendaExameDataHora;
    }

    public void setAgendaExameDataHora(LocalDateTime agendaExameDataHora) {
        this.agendaExameDataHora = agendaExameDataHora;
    }

    public long getAgendaExamePaciente() {
        return agendaExamePaciente;
    }

    public void setAgendaExamePaciente(long agendaExamePaciente) {
        this.agendaExamePaciente = agendaExamePaciente;
    }

    public long getAgendaExameMedico() {
        return agendaExameMedico;
    }

    public void setAgendaExameMedico(long agendaExameMedico) {
        this.agendaExameMedico = agendaExameMedico;
    }

    public long getAgendaExameExame() {
        return agendaExameExame;
    }

    public void setAgendaExameExame(long agendaExameExame) {
        this.agendaExameExame = agendaExameExame;
    }
}
