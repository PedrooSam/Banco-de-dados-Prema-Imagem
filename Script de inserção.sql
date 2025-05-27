
-- Inserção Colaborador Total: 10
INSERT INTO Colaborador (id, nome, cpf) VALUES (1, 'Gustavo Souza', '35192975196');
INSERT INTO Colaborador (id, nome, cpf) VALUES (2, 'Pedro Nascimento', '58261979254');
INSERT INTO Colaborador (id, nome, cpf) VALUES (3, 'Laura Oliveira', '70063100605');
INSERT INTO Colaborador (id, nome, cpf) VALUES (4, 'Gustavo Moraes', '29225349754'); -- Médico
INSERT INTO Colaborador (id, nome, cpf) VALUES (5, 'Isabela Cardoso', '68297115560'); -- Médico
INSERT INTO Colaborador (id, nome, cpf) VALUES (6, 'Mariana Nascimento', '33546861547'); -- Médico
INSERT INTO Colaborador (id, nome, cpf) VALUES (7, 'Bruna Araújo', '70045216404'); -- Médico
INSERT INTO Colaborador (id, nome, cpf) VALUES (8, 'Maria Moraes', '74611037304'); -- Médico
INSERT INTO Colaborador (id, nome, cpf) VALUES (9, 'Marcos Freitas', '22399995016'); -- Sócio
INSERT INTO Colaborador (id, nome, cpf) VALUES (10, 'Camila Rodrigues', '86065701251'); -- Sócio

-- Inserção Empregado 3 Empregados
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2020-01-15', 'Técnico em Radiologia', '895791452243351', 3800.00, 1);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2021-03-10', 'Recepcionista', '129742893827343', 2200.00, 2);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2022-05-20', 'Auxiliar Administrativo', '481278255006914', 2500.00, 3);

-- Inserção Medico 5 Médicos
INSERT INTO Medico (especialidade, crm, id) VALUES ('Radiologista', '12345SP', 4);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Radiologista', '23456SP', 5);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Ultrassonografista', '34567SP', 6);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Radiologista Intervencionista', '45678SP', 7);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Cardiologista', '56789SP', 8);

-- Inserção Socio 2 Sócios
INSERT INTO Socio (proLabore, id) VALUES (15000.00, 9);
INSERT INTO Socio (proLabore, id) VALUES (14500.00, 10);

-- Inserção Exame (Mantendo 50 exames para variedade)
INSERT INTO Exame (id, nome, preparo, preco) VALUES (1, 'Endoscopia Digestiva', 'Não fumar 30 minutos antes', 651.13);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (2, 'Raio-X de Tórax', 'Uso de laxante 12h antes do exame', 578.06);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (3, 'Ecocardiograma', 'Evitar exercícios físicos intensos antes do exame', 208.7);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (4, 'Colonoscopia', 'Jejum de 6 horas e preparo intestinal específico', 599.45);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (5, 'Ressonância Magnética Crânio', 'Jejum de 4 horas, remover objetos metálicos', 721.73);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (6, 'Teste de Glicemia', 'Jejum de 8 horas', 83.01);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (7, 'Hemograma Completo', 'Não requer jejum obrigatório, mas recomendado de 3h', 41.25);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (8, 'Tomografia Computadorizada Abdômen', 'Jejum de 4 horas, contraste oral se indicado', 450.22);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (9, 'Tomografia Computadorizada Tórax', 'Jejum de 4 horas, se com contraste', 435.81);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (10, 'Urina Tipo I (EAS)', 'Coletar primeira urina da manhã, higiene local', 29.69);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (11, 'Ressonância Magnética Joelho', 'Remover objetos metálicos', 689.48);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (12, 'Urocultura com Antibiograma', 'Coleta asséptica, jato médio da primeira urina', 70.81);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (13, 'Ultrassonografia Abdominal Total', 'Jejum de 6 horas, bexiga cheia', 180.31);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (14, 'Perfil Lipídico (Colesterol Total e Frações)', 'Jejum de 12 horas', 73.11);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (15, 'TSH (Hormônio Tireoestimulante)', 'Não requer jejum', 56.09);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (16, 'Ressonância Magnética Coluna Lombar', 'Remover objetos metálicos', 762.10);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (17, 'Glicemia Pós-Prandial', 'Jejum de 8h, coleta 2h após refeição padronizada', 97.63);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (18, 'Densitometria Óssea', 'Não ingerir cálcio 24h antes', 341.44);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (19, 'Raio-X Coluna Cervical', 'Sem preparo específico', 150.98);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (20, 'PSA Total e Livre', 'Abstinência sexual de 48h, não andar de bicicleta', 120.70);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (21, 'Tomografia Crânio', 'Jejum de 4 horas, se com contraste', 399.51);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (22, 'Curva Glicêmica (4 dosagens)', 'Jejum de 8-10h, dieta específica antes', 170.39);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (23, 'Ultrassonografia Tireoide', 'Sem preparo específico', 157.88);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (24, 'Vitamina D (25-OH)', 'Não requer jejum', 182.42);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (25, 'Ultrassonografia Pélvica (Feminina)', 'Bexiga cheia', 131.71);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (26, 'Mamografia Digital Bilateral', 'Não usar talco ou desodorante nas axilas/mamas', 221.22);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (27, 'Tomografia Pélvis', 'Jejum de 4h, preparo intestinal se indicado', 430.66);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (28, 'Ácido Úrico', 'Jejum de 3 horas', 30.56);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (29, 'Ferritina', 'Não requer jejum', 74.64);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (30, 'Ultrassonografia Próstata (Via Abdominal)', 'Bexiga cheia', 161.25);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (31, 'Creatinina', 'Não requer jejum', 35.90);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (32, 'Raio-X Mãos e Punhos (Idade Óssea)', 'Sem preparo específico', 176.52);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (33, 'Ultrassonografia Mamária', 'Trazer exames anteriores', 173.61);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (34, 'T4 Livre', 'Não requer jejum', 62.19);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (35, 'Tomografia Coluna Cervical', 'Jejum de 4h, se com contraste', 462.79);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (36, 'Holter 24 horas', 'Tomar banho antes, não usar cremes no tórax', 270.85);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (37, 'MAPA (Monitorização Ambulatorial da P.A.)', 'Vestir blusa larga, seguir rotina normal', 258.89);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (38, 'Tomografia Seios da Face', 'Sem preparo, a menos que com contraste', 342.48);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (39, 'Ultrassonografia Articular (Ombro)', 'Sem preparo específico', 198.83);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (40, 'Gasometria Arterial', 'Repouso de 15 min antes da coleta', 120.56);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (41, 'Raio-X Bacia', 'Sem preparo específico', 163.20);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (42, 'Eletroencefalograma em Vigília', 'Cabelos limpos e secos, dormir pouco na noite anterior', 276.91);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (43, 'Beta HCG Quantitativo', 'Não requer jejum', 81.15);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (44, 'Doppler Vascular Arterial Membro Inferior', 'Sem preparo específico', 354.14);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (45, 'Doppler Vascular Venoso Membro Inferior', 'Sem preparo específico', 338.99);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (46, 'Coagulograma Completo', 'Jejum de 4 horas, informar medicamentos', 95.47);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (47, 'Ultrassonografia Obstétrica (1º Trimestre)', 'Bexiga moderadamente cheia', 182.61);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (48, 'Ultrassonografia Morfológica (2º Trimestre)', 'Sem preparo específico', 343.77);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (49, 'Raio-X Abdômen Simples', 'Sem preparo específico, idealmente jejum leve', 176.22);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (50, 'Ressonância Magnética Pelve Feminina', 'Jejum de 4h, preparo intestinal leve', 829.43);

-- Inserção Paciente (Mantendo 20 pacientes para os exemplos de agendamento)
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (1, 'Ana Julia Silva', 'Ana J.', '11122233301', '1234567', '1990-01-01', '12345001', '10', 'Apto 1', '11987654321', NULL, 'anajulia.silva@email.com', 'Maria Silva', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (2, 'Bruno Costa Alves', NULL, '22233344402', '2345678', '1985-05-10', '12345002', '20', NULL, '11987654322', '1123456789', 'bruno.costa@email.com', 'Joana Alves', 1);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (3, 'Carlos Eduardo Lima', 'Cadu', '33344455503', '3456789', '1978-11-20', '12345003', '30', 'Casa 2', '11987654323', NULL, 'carlos.lima@email.com', 'Beatriz Lima', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (4, 'Daniela Ferreira Santos', 'Dani', '44455566604', '4567890', '2000-07-15', '12345004', '40', NULL, '11987654324', NULL, 'daniela.santos@email.com', 'Sofia Santos', 2);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (5, 'Eduardo Pereira Oliveira', NULL, '55566677705', '5678901', '1995-03-25', '12345005', '50', 'Apto 101', '11987654325', '1134567890', 'eduardo.oliveira@email.com', 'Clara Oliveira', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (6, 'Fernanda Almeida Ribeiro', 'Fe', '66677788806', '6789012', '1982-09-03', '12345006', '60', NULL, '11987654326', NULL, 'fernanda.ribeiro@email.com', 'Alice Ribeiro', 3);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (7, 'Gustavo Henrique Souza', NULL, '77788899907', '7890123', '1992-12-12', '12345007', '70', 'Casa', '11987654327', NULL, 'gustavo.souza@email.com', 'Helena Souza', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (8, 'Heloisa Martins Barbosa', 'Helo', '88899900008', '8901234', '1975-06-08', '12345008', '80', NULL, '11987654328', '1145678901', 'heloisa.barbosa@email.com', 'Isabel Barbosa', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (9, 'Igor Nogueira Campos', NULL, '99900011109', '9012345', '1998-02-18', '12345009', '90', 'Apto 202', '11987654329', NULL, 'igor.campos@email.com', 'Laura Campos', 5);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (10, 'Julia Castro Dias', 'Ju', '00011122200', '0123456', '1988-08-30', '12345010', '100', NULL, '11987654330', NULL, 'julia.dias@email.com', 'Manuela Dias', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (11, 'Lucas Azevedo Pinto', 'Luca', '10120230301', '1122334', '1991-04-14', '12345011', '110', 'Frente', '11912345678', NULL, 'lucas.pinto@email.com', 'Natalia Pinto', 7);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (12, 'Manuela Gomes Farias', 'Manu', '20230340402', '2233445', '1986-10-05', '12345012', '120', NULL, '11923456789', NULL, 'manuela.farias@email.com', 'Olivia Farias', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (13, 'Nicolas Martins Lima', NULL, '30340450503', '3344556', '1979-01-22', '12345013', '130', 'Apto 303', '11934567890', '1156789012', 'nicolas.lima@email.com', 'Patricia Lima', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (14, 'Olivia Castro Silva', 'Livy', '40450560604', '4455667', '2001-09-11', '12345014', '140', NULL, '11945678901', NULL, 'olivia.silva@email.com', 'Queli Silva', 9);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (15, 'Pedro Barros Ribeiro', NULL, '50560670705', '5566778', '1996-05-02', '12345015', '150', 'Casa 3', '11956789012', NULL, 'pedro.ribeiro@email.com', 'Renata Ribeiro', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (16, 'Renata Dias Souza', 'Re', '60670780806', '6677889', '1983-07-28', '12345016', '160', NULL, '11967890123', '1167890123', 'renata.souza@email.com', 'Sara Souza', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (17, 'Samuel Correia Nogueira', NULL, '70780890907', '7788990', '1993-03-07', '12345017', '170', 'Apto 404', '11978901234', NULL, 'samuel.nogueira@email.com', 'Tatiana Nogueira', 12);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (18, 'Tatiana Campos Pereira', 'Tati', '80890900008', '8899001', '1976-12-19', '12345018', '180', NULL, '11989012345', NULL, 'tatiana.pereira@email.com', 'Ursula Pereira', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (19, 'Thiago Dias Alves', NULL, '90900011109', '9900112', '1999-06-24', '12345019', '190', 'Apto 505', '11990123456', NULL, 'thiago.alves@email.com', 'Valentina Alves', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (20, 'Valentina Esteves Costa', 'Val', '01011122200', '0011223', '1989-11-01', '12345020', '200', NULL, '11901234567', '1101234567', 'valentina.costa@email.com', 'Vera Costa', 15);

-- Inserção Fornecedor (5 Fornecedores)
INSERT INTO Fornecedor (id, nome, cnpj, telefone1, telefone2, email) VALUES (1, 'MedSupply Brasil Ltda', '11222333000144', '1133334444', NULL, 'contato@medsupply.com.br');
INSERT INTO Fornecedor (id, nome, cnpj, telefone1, telefone2, email) VALUES (2, 'Equipamentos Hospitalares SA', '22333444000155', '2144445555', '21988887777', 'vendas@equiphospitalar.com');
INSERT INTO Fornecedor (id, nome, cnpj, telefone1, telefone2, email) VALUES (3, 'Insumos Clínicos ABC', '33444555000166', '3155556666', NULL, 'comercial@insumosabc.com');
INSERT INTO Fornecedor (id, nome, cnpj, telefone1, telefone2, email) VALUES (4, 'Pharma Distribuidora', '44555666000177', '4166667777', NULL, 'pedidos@pharmadist.com.br');
INSERT INTO Fornecedor (id, nome, cnpj, telefone1, telefone2, email) VALUES (5, 'TecnoImagem Soluções', '55666777000188', '5177778888', '51977776666', 'suporte@tecnoimagem.com');

-- Inserção Produto (11 Produtos)
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Seringa Descartável 10ml', 1.50, 200, 1);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Agulha Hipodérmica 25x7', 0.80, 500, 2);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Luva Cirúrgica Estéril (Par)', 3.20, 150, 3);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Gaze Estéril Pacote c/10', 5.50, 300, 4);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Álcool Etílico 70% 1L', 12.90, 50, 5);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Máscara Cirúrgica Descartável Caixa c/50', 25.00, 100, 6);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Contraste Iodado Frasco 50ml', 85.80, 75, 7);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Filme Radiográfico 24x30 Caixa', 236.26, 20, 8);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Avental Descartável Pacote c/10', 18.62, 80, 9);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Papel para Eletrocardiograma Rolo', 15.22, 42, 10);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Gel Condutor para Ultrassom 1Kg', 26.60, 60, 11);


-- Inserção Venda (25 Vendas)
-- idSocio: 9 ou 10
-- idFornecedor: 1 a 5
-- idProduto: 1 a 11
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-01-10 10:00:00', 10, 1, 1, 9);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-01-11 11:30:00', 5, 2, 3, 10);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-01-12 14:15:00', 20, 3, 5, 9);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-01-13 09:00:00', 2, 4, 7, 10);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-01-14 16:45:00', 1, 5, 8, 9);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-02-01 10:20:00', 15, 1, 2, 10);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-02-05 13:00:00', 8, 2, 4, 9);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-02-10 15:30:00', 30, 3, 6, 10);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-02-15 08:45:00', 5, 4, 9, 9);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-02-20 17:00:00', 3, 5, 10, 10);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-03-01 09:10:00', 12, 1, 11, 9);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-03-05 11:00:00', 6, 2, 1, 10);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-03-10 14:30:00', 25, 3, 3, 9);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-03-15 10:00:00', 4, 4, 5, 10);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-03-20 16:15:00', 2, 5, 7, 9);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-04-02 08:30:00', 10, 1, 4, 10);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-04-06 12:00:00', 7, 2, 6, 9);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-04-11 15:45:00', 18, 3, 8, 10);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-04-16 09:30:00', 3, 4, 10, 9);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-04-21 17:30:00', 1, 5, 11, 10);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-05-03 10:40:00', 9, 1, 9, 9);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-05-07 13:10:00', 5, 2, 7, 10);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-05-12 16:00:00', 22, 3, 2, 9);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-05-17 08:00:00', 4, 4, 4, 10);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-05-22 17:50:00', 2, 5, 6, 9);

-- Inserção AgendaExame 
-- idMedico: 4 a 8
-- idPaciente: 1 a 20
-- idExame: 1 a 50
-- Inserções Individuais para AgendaExame com dados mais variados

-- Paciente 1 (Ana Julia Silva) - Vários exames, alguns no passado
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES
('2025-04-10 08:00:00', 'Dr. House', 'Achados normais.', 'realizado', 1, 4, 2); -- Raio-X Tórax (Passado)
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES
('2025-04-10 08:30:00', 'Dr. House', 'Coleta realizada.', 'realizado', 1, 4, 7); -- Hemograma Completo (Passado)
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES
('2025-05-15 09:00:00', 'Dr. House', 'Paciente não compareceu.', 'cancelado', 1, 4, 13); -- US Abdômen (Passado, cancelado)
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES
('2025-06-01 08:00:00', 'Dr. House', 'Laudo pendente.', 'agendado', 1, 4, 2); -- Raio-X Tórax (Futuro)
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES
('2025-06-10 10:00:00', 'Dr. House', 'Aguardando realização.', 'agendado', 1, 6, 3); -- Ecocardiograma (Futuro)
-- Paciente 2 (Bruno Costa Alves) - Alguns exames
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES
('2025-05-05 09:00:00', 'Dra. Grey', 'Paciente estável, sem alterações.', 'realizado', 2, 5, 5); -- RM Crânio (Passado)
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES
('2025-06-03 09:30:00', 'Dra. Grey', 'Laudo pendente.', 'agendado', 2, 5, 7); -- Hemograma Completo (Futuro)
-- Paciente 3 (Carlos Eduardo Lima)
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES
('2025-06-02 10:30:00', 'Dr. Shepherd', 'Acompanhar evolução.', 'agendado', 3, 6, 13); -- US Abdômen
-- Paciente 4 (Daniela Ferreira Santos)
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES
('2025-04-20 11:00:00', 'Dra. Yang', 'Sem alterações significativas.', 'realizado', 4, 7, 8); -- TC Abdômen (Passado)
-- Paciente 5 (Eduardo Pereira Oliveira)
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES
('2025-06-03 14:00:00', 'Dr. Wilson', 'Recomenda-se novo exame em 6 meses.', 'agendado', 5, 8, 26); -- Mamografia
-- Paciente 6 (Fernanda Almeida Ribeiro)
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES
('2025-05-10 15:30:00', 'Dr. Foreman', 'Laudo detalhado em anexo.', 'realizado', 6, 4, 1); -- Endoscopia (Passado)
-- Paciente 7 (Gustavo Henrique Souza)
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES
('2025-06-04 08:30:00', 'Dra. Bailey', 'Exame cancelado pelo paciente.', 'cancelado', 7, 5, 11); -- RM Joelho
-- Paciente 8 (Heloisa Martins Barbosa)
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES
('2025-05-02 09:45:00', 'Dr. Webber', 'Achados normais para a idade.', 'realizado', 8, 6, 33); -- US Mamária (Passado)
-- Paciente 9 (Igor Nogueira Campos)
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES
('2025-06-05 16:00:00', 'Dra. Torres', 'Pequena lesão identificada, seguir com US.', 'agendado', 9, 7, 19); -- RX Coluna
-- Paciente 10 (Julia Castro Dias)
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES
('2025-04-25 17:00:00', 'Dr. Sloan', 'Resultado dentro dos parâmetros.', 'realizado', 10, 8, 39); -- US Ombro (Passado)
-- Paciente 11 (Lucas Azevedo Pinto)
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES
('2025-06-06 08:15:00', 'Dr. Karev', 'Laudo em processamento.', 'agendado', 11, 4, 49); -- RX Abdômen
-- Paciente 12 (Manuela Gomes Farias)
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES
('2025-05-18 09:30:00', 'Dra. Pierce', 'Comparar com exames anteriores.', 'realizado', 12, 5, 50); -- RM Pelve (Passado)
-- Paciente 13 (Nicolas Martins Lima)
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES
('2025-06-07 10:45:00', 'Dr. Avery', 'Paciente cooperativo.', 'agendado', 13, 6, 3); -- Ecocardiograma
-- Paciente 14 (Olivia Castro Silva)
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES
('2025-05-20 11:30:00', 'Dra. Kepner', 'Sem intercorrências durante o exame.', 'realizado', 14, 7, 4); -- Colonoscopia (Passado)
-- Paciente 15 (Pedro Barros Ribeiro)
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES
('2025-06-08 14:30:00', 'Dr. Hunt', 'Necessário contraste para melhor visualização.', 'agendado', 15, 8, 9); -- TC Tórax
-- Paciente 16 (Renata Dias Souza)
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES
('2025-04-15 15:45:00', 'Dra. Altman', 'Laudo liberado.', 'realizado', 16, 4, 16); -- RM Coluna Lombar (Passado)
-- Paciente 17 (Samuel Correia Nogueira)
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES
('2025-06-09 08:45:00', 'Dr. Koracick', 'Aguardando preparo do paciente.', 'agendado', 17, 5, 21); -- TC Crânio
-- Paciente 18 (Tatiana Campos Pereira)
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES
('2025-05-22 10:00:00', 'Dra. Robbins', 'Exame realizado com sucesso.', 'realizado', 18, 6, 23); -- US Tireoide (Passado)
-- Paciente 19 (Thiago Dias Alves)
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES
('2025-06-10 16:30:00', 'Dr. DeLuca', 'Paciente apresentou leve desconforto.', 'agendado', 19, 7, 27); -- TC Pelve
-- Paciente 20 (Valentina Esteves Costa)
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES
('2025-04-28 17:45:00', 'Dra. Helm', 'Resultados preliminares normais.', 'realizado', 20, 8, 30); -- US Próstata (Passado)
-- Mais Hemogramas (Exame ID 7)
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES
('2025-05-03 08:00:00', 'Dr. House', 'Coleta OK.', 'realizado', 3, 4, 7);
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES
('2025-05-10 08:15:00', 'Dra. Bailey', 'Valores de referência.', 'realizado', 11, 6, 7);
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES
('2025-06-11 09:00:00', 'Dr. House', 'Pendente.', 'agendado', 15, 4, 7);
-- Mais Raio-X de Tórax (Exame ID 2)
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES
('2025-05-04 10:00:00', 'Dr. Wilson', 'Sem alterações pleurais.', 'realizado', 5, 4, 2);
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES
('2025-06-12 11:00:00', 'Dra. Yang', 'Aguardando laudo.', 'agendado', 10, 7, 2);
-- Mais Ultrassonografia Abdominal Total (Exame ID 13)
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES
('2025-04-29 14:00:00', 'Dr. Shepherd', 'Fígado esteatótico leve.', 'realizado', 8, 6, 13);
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES
('2025-06-13 15:00:00', 'Dr. Foreman', 'Revisar em 3 meses.', 'agendado', 12, 4, 13);
-- Exames menos comuns (Ex: ID 40 a 45)
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES
('2025-05-06 16:00:00', 'Dr. Karev', 'Dentro dos padrões.', 'realizado', 14, 7, 40); -- Gasometria Arterial
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES
('2025-06-14 08:00:00', 'Dra. Altman', 'Laudo pendente.', 'agendado', 17, 5, 42); -- Eletroencefalograma
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES
('2025-05-07 09:30:00', 'Dr. Hunt', 'Confirmado.', 'realizado', 19, 8, 43); -- Beta HCG
-- Paciente 2 (Bruno Costa Alves) com mais um exame no passado
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES
('2025-04-12 11:00:00', 'Dra. Grey', 'Exame normal.', 'realizado', 2, 5, 14); -- Perfil Lipídico
-- Médico 4 (Gustavo Moraes) com mais alguns exames
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES
('2025-05-23 13:30:00', 'Dr. House', 'Lesão não significativa.', 'realizado', 9, 4, 5); -- RM Crânio
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES
('2025-06-15 14:00:00', 'Dr. Wilson', 'Agendado.', 'agendado', 18, 4, 2); -- Raio-X Tórax

-- Insert pagamento
-- Nota Fiscal: NF<ID_PAGAMENTO><ANO_PAGAMENTO><MES_PAGAMENTO><DIA_PAGAMENTO><LETRA_SEQUENCIAL>

-- Para AgendaExame: ('2025-06-01 08:00:00', 'Dr. House', 'Laudo pendente.', 'agendado', 1, 4, 2) -> Exame 2 (Preço: 578.06)
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES
('Cartão', 'NF120250601A', 578.06, 3, 1, '2025-06-01 07:50:00', '2025-06-01 08:00:00', 1, 4, 2);
-- Para AgendaExame: ('2025-05-05 09:00:00', 'Dra. Grey', 'Paciente estável...', 'realizado', 2, 5, 5) -> Exame 5 (Preço: 721.73)
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES
('PIX', 'NF220250505A', 721.73, 1, 2, '2025-05-05 08:50:00', '2025-05-05 09:00:00', 2, 5, 5);
-- Para AgendaExame: ('2025-06-02 10:30:00', 'Dr. Shepherd', 'Acompanhar evolução.', 'agendado', 3, 6, 13) -> Exame 13 (Preço: 180.31)
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES
('Dinheiro', 'NF320250602A', 180.31, 1, 3, '2025-06-02 10:20:00', '2025-06-02 10:30:00', 3, 6, 13);
-- Para AgendaExame: ('2025-04-20 11:00:00', 'Dra. Yang', 'Sem alterações...', 'realizado', 4, 7, 8) -> Exame 8 (Preço: 450.22)
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES
('Cartão', 'NF420250420A', 450.22, 2, 4, '2025-04-20 10:50:00', '2025-04-20 11:00:00', 4, 7, 8);
-- Para AgendaExame: ('2025-06-03 14:00:00', 'Dr. Wilson', 'Recomenda-se...', 'agendado', 5, 8, 26) -> Exame 26 (Preço: 221.22)
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES
('PIX', 'NF520250603A', 221.22, 1, 5, '2025-06-03 13:50:00', '2025-06-03 14:00:00', 5, 8, 26);
-- Para AgendaExame: ('2025-05-10 15:30:00', 'Dr. Foreman', 'Laudo detalhado...', 'realizado', 6, 4, 1) -> Exame 1 (Preço: 651.13)
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES
('Cartão', 'NF620250510A', 651.13, 4, 6, '2025-05-10 15:20:00', '2025-05-10 15:30:00', 6, 4, 1);
-- Para AgendaExame: ('2025-05-02 09:45:00', 'Dr. Webber', 'Achados normais...', 'realizado', 8, 6, 33) -> Exame 33 (Preço: 173.61)
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES
('Dinheiro', 'NF820250502A', 173.61, 1, 8, '2025-05-02 09:35:00', '2025-05-02 09:45:00', 8, 6, 33);
-- Para AgendaExame: ('2025-06-05 16:00:00', 'Dra. Torres', 'Pequena lesão...', 'agendado', 9, 7, 19) -> Exame 19 (Preço: 150.98)
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES
('Cartão', 'NF920250605A', 150.98, 1, 9, '2025-06-05 15:50:00', '2025-06-05 16:00:00', 9, 7, 19);
-- Para AgendaExame: ('2025-04-25 17:00:00', 'Dr. Sloan', 'Resultado dentro...', 'realizado', 10, 8, 39) -> Exame 39 (Preço: 198.83)
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES
('PIX', 'NF1020250425A', 198.83, 1, 10, '2025-04-25 16:50:00', '2025-04-25 17:00:00', 10, 8, 39);
-- Para AgendaExame: ('2025-06-06 08:15:00', 'Dr. Karev', 'Laudo em processamento.', 'agendado', 11, 4, 49) -> Exame 49 (Preço: 176.22)
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES
('Cartão', 'NF1120250606A', 176.22, 1, 11, '2025-06-06 08:05:00', '2025-06-06 08:15:00', 11, 4, 49);
-- Para AgendaExame: ('2025-05-18 09:30:00', 'Dra. Pierce', 'Comparar com exames...', 'realizado', 12, 5, 50) -> Exame 50 (Preço: 829.43)
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES
('PIX', 'NF1220250518A', 829.43, 6, 12, '2025-05-18 09:20:00', '2025-05-18 09:30:00', 12, 5, 50);
-- Para AgendaExame: ('2025-06-07 10:45:00', 'Dr. Avery', 'Paciente cooperativo.', 'agendado', 13, 6, 3) -> Exame 3 (Preço: 208.70)
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES
('Dinheiro', 'NF1320250607A', 208.70, 1, 13, '2025-06-07 10:35:00', '2025-06-07 10:45:00', 13, 6, 3);
-- Para AgendaExame: ('2025-05-20 11:30:00', 'Dra. Kepner', 'Sem intercorrências...', 'realizado', 14, 7, 4) -> Exame 4 (Preço: 599.45)
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES
('Cartão', 'NF1420250520A', 599.45, 3, 14, '2025-05-20 11:20:00', '2025-05-20 11:30:00', 14, 7, 4);
-- Para AgendaExame: ('2025-06-08 14:30:00', 'Dr. Hunt', 'Necessário contraste...', 'agendado', 15, 8, 9) -> Exame 9 (Preço: 435.81)
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES
('PIX', 'NF1520250608A', 435.81, 2, 15, '2025-06-08 14:20:00', '2025-06-08 14:30:00', 15, 8, 9);
-- Para AgendaExame: ('2025-04-10 08:00:00', 'Dr. House', 'Achados normais.', 'realizado', 1, 4, 2) -> Exame 2 (Preço: 578.06)
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES
('Cartão', 'NF1620250410A', 578.06, 2, 16, '2025-04-10 07:50:00', '2025-04-10 08:00:00', 1, 4, 2);
-- Para AgendaExame: ('2025-04-10 08:30:00', 'Dr. House', 'Coleta realizada.', 'realizado', 1, 4, 7) -> Exame 7 (Preço: 41.25)
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES
('PIX', 'NF1720250410B', 41.25, 1, 17, '2025-04-10 08:20:00', '2025-04-10 08:30:00', 1, 4, 7);
-- Para AgendaExame: ('2025-04-15 15:45:00', 'Dra. Altman', 'Laudo liberado.', 'realizado', 16, 4, 16) -> Exame 16 (Preço: 762.10)
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES
('Cartão', 'NF1820250415A', 762.10, 4, 18, '2025-04-15 15:30:00', '2025-04-15 15:45:00', 16, 4, 16);
-- Para AgendaExame: ('2025-05-22 10:00:00', 'Dra. Robbins', 'Exame realizado...', 'realizado', 18, 6, 23) -> Exame 23 (Preço: 157.88)
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES
('Dinheiro', 'NF1920250522A', 157.88, 1, 19, '2025-05-22 09:50:00', '2025-05-22 10:00:00', 18, 6, 23);
-- Para AgendaExame: ('2025-04-28 17:45:00', 'Dra. Helm', 'Resultados preliminares...', 'realizado', 20, 8, 30) -> Exame 30 (Preço: 161.25)
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES
('PIX', 'NF2020250428A', 161.25, 1, 20, '2025-04-28 17:30:00', '2025-04-28 17:45:00', 20, 8, 30);
-- Para AgendaExame (adicional): ('2025-05-03 08:00:00', ... 'realizado', 3, 4, 7) -> Exame 7 (Preço: 41.25)
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES
('Dinheiro', 'NF2120250503A', 41.25, 1, 21, '2025-05-03 07:50:00', '2025-05-03 08:00:00', 3, 4, 7);
-- Para AgendaExame (adicional): ('2025-05-10 08:15:00', ... 'realizado', 11, 6, 7) -> Exame 7 (Preço: 41.25)
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES
('Cartão', 'NF2220250510B', 41.25, 1, 22, '2025-05-10 08:05:00', '2025-05-10 08:15:00', 11, 6, 7);
-- Para AgendaExame (adicional): ('2025-05-04 10:00:00', ... 'realizado', 5, 4, 2) -> Exame 2 (Preço: 578.06)
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES
('PIX', 'NF2320250504A', 578.06, 1, 23, '2025-05-04 09:50:00', '2025-05-04 10:00:00', 5, 4, 2);
-- Para AgendaExame (adicional): ('2025-04-29 14:00:00', ... 'realizado', 8, 6, 13) -> Exame 13 (Preço: 180.31)
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES
('Cartão', 'NF2420250429A', 180.31, 1, 24, '2025-04-29 13:50:00', '2025-04-29 14:00:00', 8, 6, 13);
-- Para AgendaExame (adicional): ('2025-05-06 16:00:00', ... 'realizado', 14, 7, 40) -> Exame 40 (Preço: 120.56)
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES
('Dinheiro', 'NF2520250506A', 120.56, 1, 25, '2025-05-06 15:50:00', '2025-05-06 16:00:00', 14, 7, 40);
-- Para AgendaExame (adicional): ('2025-05-07 09:30:00', ... 'realizado', 19, 8, 43) -> Exame 43 (Preço: 81.15)
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES
('PIX', 'NF2620250507A', 81.15, 1, 26, '2025-05-07 09:20:00', '2025-05-07 09:30:00', 19, 8, 43);
-- Para AgendaExame (adicional): ('2025-04-12 11:00:00', ... 'realizado', 2, 5, 14) -> Exame 14 (Preço: 73.11)
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES
('Cartão', 'NF2720250412A', 73.11, 1, 27, '2025-04-12 10:50:00', '2025-04-12 11:00:00', 2, 5, 14);
-- Para AgendaExame (adicional): ('2025-05-23 13:30:00', ... 'realizado', 9, 4, 5) -> Exame 5 (Preço: 721.73)
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES
('Cartão', 'NF2820250523A', 721.73, 3, 28, '2025-05-23 13:20:00', '2025-05-23 13:30:00', 9, 4, 5);

-- Código pra esvaziar tudo
-- Desabilita a verificação de chaves estrangeiras
SET FOREIGN_KEY_CHECKS = 0;

-- Lista de TRUNCATE para suas tabelas (adicione ou remova conforme sua estrutura)
TRUNCATE TABLE Pagamento;
TRUNCATE TABLE AgendaExame;
TRUNCATE TABLE Venda;
TRUNCATE TABLE Produto;
TRUNCATE TABLE Fornecedor;
TRUNCATE TABLE Paciente;
TRUNCATE TABLE Exame;
TRUNCATE TABLE Socio;
TRUNCATE TABLE Medico;
TRUNCATE TABLE Empregado;
TRUNCATE TABLE Colaborador;
-- Adicione mais tabelas aqui se houver

-- Habilita novamente a verificação de chaves estrangeiras
SET FOREIGN_KEY_CHECKS = 1;
