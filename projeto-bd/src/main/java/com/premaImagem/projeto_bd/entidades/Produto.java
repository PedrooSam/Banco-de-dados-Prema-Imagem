package com.premaImagem.projeto_bd.entidades;

public class Produto {
    private long id;
    private String nome;
    private double preco;
    private int quantidade;

    public Produto(){

    }
    public Produto(String nome, double preco){
        this.nome = nome;
        this.preco = preco;
    }

    public Produto(long id, String nome, double preco, int quantidade){
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.quantidade = quantidade;
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
    
    public double getPreco() {
        return preco;
    }
    public void setPreco(double preco) {
        this.preco = preco;
    }
    
    public int getQuantidade() {
        return quantidade;
    }
    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }
    
}
