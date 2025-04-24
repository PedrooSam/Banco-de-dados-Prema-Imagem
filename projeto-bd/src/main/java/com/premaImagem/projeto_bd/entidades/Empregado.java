package com.premaImagem.projeto_bd.entidades;

import java.util.Date;

public class Empregado extends Colaborador{

    private Date dataAdmissao;
    private String numeroPis;
    private double salario;
    private String funcao;

    public Empregado(){

    }
    public Empregado (String cpf, String nome, String numeroPis, double salario, String funcao){
        super(cpf, nome);
        this.numeroPis = numeroPis;
        this.salario = salario;
        this.funcao = funcao;
    }

    public Empregado(long id, String cpf, String nome, String numeroPis, double salario, String funcao){
        super(id, cpf, nome);
        this.numeroPis = numeroPis;
        this.salario = salario;
        this.funcao = funcao;
    }

    public Date getDataAdmissao() {
        return dataAdmissao;
    }

    public void setDataAdmissao(Date dataAdmissao) {
        this.dataAdmissao = dataAdmissao;
    }

    public String getNumeroPis() {
        return numeroPis;
    }

    public void setNumeroPis(String numeroPis) {
        this.numeroPis = numeroPis;
    }

    public double getSalario() {
        return salario;
    }

    public void setSalario(double salario) {
        this.salario = salario;
    }

    public String getFuncao() {
        return funcao;
    }

    public void setFuncao(String funcao) {
        this.funcao = funcao;
    }
}
