package com.premaImagem.projeto_bd.entidades;

public class Socio extends Colaborador {

    private double proLabore;

    public Socio(String cpf, String nome, double proLabore) {
        super(cpf, nome);
        this.proLabore = proLabore;
    }

    public Socio(long id, String cpf, String nome, double proLabore) {
        super(id, cpf, nome);
        this.proLabore = proLabore;
    }

    public double getProLabore() {
        return proLabore;
    }

    public void setProLabore(double proLabore) {
        this.proLabore = proLabore;
    }
}
