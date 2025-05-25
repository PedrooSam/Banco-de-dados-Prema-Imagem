package com.premaImagem.projeto_bd.dto;

public class ExamesPorMesAnoDTO {
    private Integer ano;
    private Integer mes;
    private Long totalExames;

    public ExamesPorMesAnoDTO(Integer ano, Integer mes, Long totalExames) {
        this.ano = ano;
        this.mes = mes;
        this.totalExames = totalExames;
    }

    public Integer getAno() { return ano; }
    public void setAno(Integer ano) { this.ano = ano; }
    public Integer getMes() { return mes; }
    public void setMes(Integer mes) { this.mes = mes; }
    public Long getTotalExames() { return totalExames; }
    public void setTotalExames(Long totalExames) { this.totalExames = totalExames; }
}
