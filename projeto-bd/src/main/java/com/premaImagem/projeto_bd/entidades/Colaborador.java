package com.premaImagem.projeto_bd.entidades;

abstract class Colaborador {
    private long id;
    private String cpf;
    private String nome;

    public Colaborador(String cpf, String nome) {
        this.cpf = cpf;
        this.nome = nome;
    }

    public Colaborador(long id, String cpf, String nome) {
        this.id = id;
        this.cpf = cpf;
        this.nome = nome;
    }

    public long getId() {
        return id;
    }

    public void setId(long id){
        this.id = id;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}
