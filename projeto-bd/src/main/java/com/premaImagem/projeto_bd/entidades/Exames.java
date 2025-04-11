package com.premaImagem.projeto_bd.entidades;

public class Exames{

    private long id;
    private String preparo;
    private String nome;
    private double preco;

    public Exames(String preparo, String nome, double preco) {
        this.preparo = preparo;
        this.nome = nome;
        this.preco = preco;
    }

    public long getId() {
        return id;
    }
    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getPreparo() {
        return preparo;
    }

    public void setPreparo(String preparo) {
        this.preparo = preparo;
    }

    public double getPreco() {
        return preco;
    }

    public void setPreco(double preco) {
        this.preco = preco;
    }
}
