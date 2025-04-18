package com.premaImagem.projeto_bd.entidades;

public class Exame{

    private long id;
    private String preparo;
    private String nome;
    private double preco;

    public Exame() {
    }
    
    public Exame(String preparo, String nome, double preco) {
        this.preparo = preparo;
        this.nome = nome;
        this.preco = preco;
    }

    public long getId() {
        return id;
    }
    
    public void setId(Long id) {
    	this.id = id;
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
