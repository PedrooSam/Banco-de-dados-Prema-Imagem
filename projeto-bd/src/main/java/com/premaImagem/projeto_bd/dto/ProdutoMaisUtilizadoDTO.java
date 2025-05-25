package com.premaImagem.projeto_bd.dto;

public class ProdutoMaisUtilizadoDTO {
    private String produto;
    private Long vezesVendido;
    private Long quantidadeVendida;

    public ProdutoMaisUtilizadoDTO(String produto, Long vezesVendido, Long quantidadeVendida) {
        this.produto = produto;
        this.vezesVendido = vezesVendido;
        this.quantidadeVendida = quantidadeVendida;
    }

    public String getProduto() { return produto; }
    public void setProduto(String produto) { this.produto = produto; }
    public Long getVezesVendido() { return vezesVendido; }
    public void setVezesVendido(Long vezesVendido) { this.vezesVendido = vezesVendido; }
    public Long getQuantidadeVendida() { return quantidadeVendida; }
    public void setQuantidadeVendida(Long quantidadeVendida) { this.quantidadeVendida = quantidadeVendida; }
}
