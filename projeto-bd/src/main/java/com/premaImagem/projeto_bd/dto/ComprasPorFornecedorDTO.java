package com.premaImagem.projeto_bd.dto;

public class ComprasPorFornecedorDTO {
    private String fornecedor;
    private Long totalVendido;

    public ComprasPorFornecedorDTO(String fornecedor, Long totalVendido) {
        this.fornecedor = fornecedor;
        this.totalVendido = totalVendido;
    }

    public String getFornecedor() { return fornecedor; }
    public void setFornecedor(String fornecedor) { this.fornecedor = fornecedor; }
    public Long getTotalVendido() { return totalVendido; }
    public void setTotalVendido(Long totalVendido) { this.totalVendido = totalVendido; }
}
