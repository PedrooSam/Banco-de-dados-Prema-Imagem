package com.premaImagem.projeto_bd.entidades;

public class Medico extends Colaborador{
    private String crm;
    private String especialidade;

    public Medico(String cpf, String nome, double proLabore, String crm, String especialidade) {
        super(cpf, nome);
        this.crm = crm;
        this.especialidade = especialidade;
    }

    public Medico(long id, String cpf, String nome, double proLabore, String crm, String especialidade) {
        super(id, cpf, nome);
        this.crm = crm;
        this.especialidade = especialidade;
    }

    public String getCrm() {
        return crm;
    }

    public void setCrm(String crm) {
        this.crm = crm;
    }

    public String getEspecialidade() {
        return especialidade;
    }

    public void setEspecialidade(String especialidade) {
        this.especialidade = especialidade;
    }
}
