package com.premaImagem.projeto_bd.entidades;

public class Socio {

    private long id;
    private double proLabore;

    public Socio() {
    }

    public Socio(long id, double proLabore) {
        this.id = id;
        this.proLabore = proLabore;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public double getProLabore() {
        return proLabore;
    }

    public void setProLabore(double proLabore) {
        this.proLabore = proLabore;
    }
}
