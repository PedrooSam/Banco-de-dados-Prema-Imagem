package com.premaImagem.projeto_bd.entidades;

public class Fornecedor {

    private String id;
    private String nome;
    private String cnpj;
    private String telefone1;
    private String telefone2;
    private String email;

    public Fornecedor() {
    }

    public Fornecedor(String id, String nome, String cnpj, String telefone1, String telefone2, String email) {
        this.id = id;
        this.nome = nome;
        this.cnpj = cnpj;
        this.telefone1 = telefone1;
        this.telefone2 = telefone2;
        this.email = email;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getTelefone1() {
        return telefone1;
    }

    public void setTelefone1(String telefone1) {
        this.telefone1 = telefone1;
    }

    public String getTelefone2() {
        return telefone2;
    }

    public void setTelefone2(String telefone2) {
        this.telefone2 = telefone2;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
