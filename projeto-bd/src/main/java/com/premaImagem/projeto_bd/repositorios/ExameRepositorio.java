package com.premaImagem.projeto_bd.repositorios;

@Repository
public class ExameRepositorio{

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public FuncionarioRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Exame> buscarLista(){
        String sql = "SELECT * FROM Exame";
        List<Exame> exames = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Exame.class));
        return exames;
    }

    public Exame buscar(String nomeExame){
        String sql = "SELECT * FROM Exame WHERE Exame.nome = ?";
        return jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(Exame.class), nomeExame);
    }

    public int criar(Exame exame){
        String sql = "INSERT INTO Exame (nome, preparo, preco) VALUES (?,?,?)";
        return jdbcTemplate.update(sql, exame.getNome(), exame.getPreparo(), exame.getPreco());
    }

    public int editar(Exame exame){
        String sql = "UPDATE Exame SET Exame.nome = ?, Exame.preparo = ?, Exame.preco = ? WHERE id = ?";
        return jdbcTemplate.update(sql, exame.getNome(), exame.getPreparo(), exame.getPreco(), exame.getId());
    }

    public int deletar(long id){
        String sql = "DELETE FROM Exame WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }

}