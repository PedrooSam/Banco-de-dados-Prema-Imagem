package com.premaImagem.projeto_bd.entidades;

public class Colaborador extends EntidadeGeral {

    private String cpf;
    private String nome;

    public String getCpf(){
        return this.cpf;
    }

    public String getNome(){
        return this.nome;
    }

    public void setCpf(String cpf){
        this.cpf = cpf;
    }

    public void setNome(String nome){
        this.nome = nome;
    }
}
