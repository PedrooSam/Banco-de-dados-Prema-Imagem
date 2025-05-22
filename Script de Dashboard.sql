
-- Procedure: Buscar por data

CREATE PROCEDURE BuscarPorData(
    IN tabela VARCHAR(64),
    IN colunaData VARCHAR(64),
    IN dataBusca DATE
)
BEGIN
    -- copia o parâmetro para uma user variable
    SET @data = dataBusca;

    -- monta o SQL dinâmico, escapando nomes de tabela/coluna
    SET @sql = CONCAT(
      'SELECT *',
      ' FROM `', tabela, '`',
      ' WHERE DATE(`', colunaData, '`) = ?'
    );

    PREPARE stmt FROM @sql;
    EXECUTE stmt USING @data;
    DEALLOCATE PREPARE stmt;
end

-- Chamando a procedure
CALL BuscarPorData('AgendaExame','dataHoraRealizacao','2025-01-10');

-- Trigger para mudar status de agendaExame depois que adicionou em pagamento 

CREATE TRIGGER AtualizaStatusExame
AFTER INSERT ON Pagamento
FOR EACH ROW
BEGIN
    UPDATE AgendaExame
    SET status = 'Pago'
    WHERE dataHoraRealizacao = NEW.agendaExameDataHora
      AND idPaciente = NEW.agendaExamePaciente
      AND idMedico = NEW.agendaExameMedico
      AND idExame = NEW.agendaExameExame;
END 

-- Teste trigger

INSERT INTO Pagamento (
    formaPagamento,
    notaFiscal,
    valorPago,
    parcelas,
    agendaExameDataHora,
    agendaExamePaciente,
    agendaExameMedico,
    agendaExameExame
) VALUES (
    'Pix',
    'NF20240522001',
    350.00,
    1,
    '2024-12-30 08:15:22',
    14,
    114,
    5
);

-- Conferindo se funcionou { Tem que retornar pago}
SELECT status
FROM AgendaExame
WHERE dataHoraRealizacao = '2024-12-30 08:15:22'
  AND idPaciente = 14
  AND idMedico = 114
  AND idExame = 5;

-- 1. Dashboard Geral / Visão Executiva

-- Total de exames realizados no mês/ano
SELECT 
    YEAR(dataHoraRealizacao) AS ano,
    MONTH(dataHoraRealizacao) AS mes,
    COUNT(*) AS total_exames
FROM AgendaExame
WHERE status = 'realizado'
GROUP BY ano, mes
ORDER BY ano, mes;

-- 2. Dashboard de Exames

-- Top 10 exames mais realizados
SELECT e.nome, COUNT(*) AS quantidade
FROM AgendaExame a
JOIN Exame e ON a.idExame = e.id
WHERE a.status = 'realizado'
GROUP BY e.nome
ORDER BY quantidade DESC
LIMIT 10;

-- Número de exames por médico
SELECT m.id, c.nome, COUNT(*) AS total_exames
FROM AgendaExame a
JOIN Medico m ON a.idMedico = m.id
JOIN Colaborador c ON m.id = c.id
WHERE a.status = 'realizado'
GROUP BY m.id, c.nome
ORDER BY total_exames DESC;

-- Distribuição dos exames por período do dia
SELECT
    CASE 
        WHEN HOUR(dataHoraRealizacao) BETWEEN 6 AND 11 THEN 'Manhã'
        WHEN HOUR(dataHoraRealizacao) BETWEEN 12 AND 17 THEN 'Tarde'
        WHEN HOUR(dataHoraRealizacao) BETWEEN 18 AND 23 THEN 'Noite'
        ELSE 'Madrugada'
    END AS periodo,
    COUNT(*) AS total_exames
FROM AgendaExame
WHERE status = 'realizado'
GROUP BY periodo;

-- 3. Dashboard de Médicos

-- % de exames realizados por médico
SELECT c.nome, COUNT(*) * 100.0 / (SELECT COUNT(*) FROM AgendaExame WHERE status = 'realizado') AS percentual
FROM AgendaExame a
JOIN Medico m ON a.idMedico = m.id
JOIN Colaborador c ON m.id = c.id
WHERE a.status = 'realizado'
GROUP BY c.nome
ORDER BY percentual DESC;

-- Médicos com mais atendimentos no mês atual
SELECT c.nome, COUNT(*) AS atendimentos
FROM AgendaExame a
JOIN Medico m ON a.idMedico = m.id
JOIN Colaborador c ON m.id = c.id
WHERE a.status = 'realizado'
  AND YEAR(a.dataHoraRealizacao) = YEAR(CURDATE())
  AND MONTH(a.dataHoraRealizacao) = MONTH(CURDATE())
GROUP BY c.nome
ORDER BY atendimentos DESC
LIMIT 5;


-- 4. Dashboard de Pacientes

-- Pacientes com mais exames realizados
SELECT p.nome, COUNT(*) AS total_exames
FROM AgendaExame a
JOIN Paciente p ON a.idPaciente = p.id
WHERE a.status = 'realizado'
GROUP BY p.id, p.nome
ORDER BY total_exames DESC
LIMIT 10;

-- Exames por faixa etária dos pacientes
SELECT
    CASE
        WHEN TIMESTAMPDIFF(YEAR, p.dataNascimento, CURDATE()) < 18 THEN '<18'
        WHEN TIMESTAMPDIFF(YEAR, p.dataNascimento, CURDATE()) BETWEEN 18 AND 35 THEN '18-35'
        WHEN TIMESTAMPDIFF(YEAR, p.dataNascimento, CURDATE()) BETWEEN 36 AND 60 THEN '36-60'
        ELSE '>60'
    END AS faixa_etaria,
    COUNT(*) AS total_exames
FROM AgendaExame a
JOIN Paciente p ON a.idPaciente = p.id
WHERE a.status = 'realizado'
GROUP BY faixa_etaria
ORDER BY faixa_etaria;

-- Pacientes que indicaram outro paciente
SELECT p1.nome AS paciente, COUNT(p2.id) AS indicados
FROM Paciente p1
LEFT JOIN Paciente p2 ON p2.pacienteIndicador = p1.id
GROUP BY p1.id, p1.nome
ORDER BY indicados DESC
LIMIT 10;

-- 5 Produtos

-- Produtos mais utilizados
SELECT
    p.nome AS produto,
    COUNT(v.dataHoraVenda) AS vezes_vendido,
    SUM(v.quantidade) AS quantidade_vendida
FROM Venda v
JOIN Produto p ON v.idProduto = p.id
GROUP BY p.id, p.nome
ORDER BY quantidade_vendida DESC
LIMIT 10;

-- Quantidade de produtos
SELECT
    nome,
    quantidade
FROM Produto
ORDER BY quantidade DESC;

-- Compras por fornecedor

SELECT
    f.nome AS fornecedor,
    SUM(v.quantidade) AS total_vendido
FROM Venda v
JOIN Fornecedor f ON v.idFornecedor = f.id
GROUP BY f.id, f.nome
ORDER BY total_vendido DESC;


-- 6 Agendamento

-- Total de exames agendados por dia 
SELECT
    DATE(dataHoraRealizacao) AS dia,
    COUNT(*) AS total_exames
FROM AgendaExame
GROUP BY dia
ORDER BY dia;

-- Número médio de exames que um paciente faz por agendamento
SELECT
    AVG(qtd_exames) AS media_exames_por_agendamento
FROM (
    SELECT
        idPaciente,
        dataHoraRealizacao,
        COUNT(*) AS qtd_exames
    FROM AgendaExame
    GROUP BY idPaciente, dataHoraRealizacao
) sub;

-- Quantos exames agendados por hora do dia 
SELECT
    HOUR(dataHoraRealizacao) AS hora,
    COUNT(*) AS total_exames
FROM AgendaExame
GROUP BY hora
ORDER BY total_exames DESC;


-- Triggers de cascata 

-- Trigger para apagar colaborador quando um médico for apagado

CREATE TRIGGER trg_delete_colaborador_medico
AFTER DELETE ON Medico
FOR EACH ROW
BEGIN
    DELETE FROM Colaborador WHERE id = OLD.id;
END 


-- Trigger para apagar colaborador quando um empregado for apagado

CREATE TRIGGER trg_delete_colaborador_empregado
AFTER DELETE ON Empregado
FOR EACH ROW
BEGIN
    DELETE FROM Colaborador WHERE id = OLD.id;
END 
-- Trigger para apagar colaborador quando um sócio for apagado

CREATE TRIGGER trg_delete_colaborador_socio
AFTER DELETE ON Socio
FOR EACH ROW
BEGIN
    DELETE FROM Colaborador WHERE id = OLD.id;
END 
