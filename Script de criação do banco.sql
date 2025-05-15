create database PremaImagem;

create table Colaborador(
	id BIGINT AUTO_INCREMENT primary key,
	nome varchar(45) not null,
	cpf varchar(11) unique not null
);

create table Empregado(
	dataAdmissao date not null, 
	funcao varchar(100) not null,
	numeroPis varchar(20) unique not null,
	salario double not null,
	id BIGINT PRIMARY KEY,
	foreign key(id) references Colaborador(id)
);


create table Medico(
	especialidade varchar(100) not null,
	crm varchar(8) unique not null,
	id BIGINT PRIMARY KEY,
	foreign key(id) references Colaborador(id)
);

create table Socio(
	proLabore double not null,
	id BIGINT PRIMARY KEY,
	foreign key(id) references Colaborador(id)
);

CREATE TABLE Exame(
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
	nome varchar(50) not null,
	preparo varchar(100) not null,
	preco double not null
);

CREATE TABLE Paciente(
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
	nome varchar(45) not null,
	nomeSocial varchar(45) default null,
	cpf varchar(11) unique not null,
	rg varchar(8) unique not null,
	dataNascimento date not null,
	cep varchar(8) not null,
	numeroEndereco varchar(5) not null,
	complementoEndereco varchar(15) not null,
	telefone1 varchar(11) not null,
	telefone2 varchar(11) default null,
	email varchar(50) unique not null,
	nomeMae varchar(45) not null,
	pacienteIndicador BIGINT default null,
	FOREIGN KEY (pacienteIndicador) REFERENCES Paciente(id)
);

CREATE TABLE AgendaExame(
	dataHoraRealizacao DATETIME,
	medicoRequisitante varchar(45) not null,
	laudo varchar(1000) not null,
	status varchar(20) not null,
	idPaciente BIGINT,
	idMedico  BIGINT,
	idExame BIGINT,
	PRIMARY KEY (dataHoraRealizacao, idPaciente, idMedico, idExame),
	FOREIGN key(idPaciente) REFERENCES Paciente(id),
	FOREIGN KEY(idMedico) REFERENCES Medico(id),
	FOREIGN KEY(idExame) REFERENCES Exame(id)
);

CREATE TABLE Pagamento(
	formaPagamento varchar(21) not null,
	notaFiscal varchar(30) unique not null,
	valorPago double not null,
	parcelas int not null,
	id BIGINT AUTO_INCREMENT,
	dataPagamento DATETIME DEFAULT CURRENT_TIMESTAMP,
	agendaExameDataHora DATETIME,
	agendaExamePaciente BIGINT,
	agendaExameMedico BIGINT,
	agendaExameExame BIGINT,
	PRIMARY KEY (id, agendaExameExame,agendaExameDataHora,agendaExamePaciente, agendaExameMedico),
	FOREIGN KEY (agendaExameDataHora,agendaExamePaciente, agendaExameMedico,agendaExameExame) REFERENCES AgendaExame(dataHoraRealizacao, idPaciente, idMedico, idExame)
);

CREATE TABLE Fornecedor(
	id BIGINT AUTO_INCREMENT primary key,
	nome varchar(45) not null,
	cnpj varchar(14) unique not null,
	telefone1 varchar(11) not null,
	telefone2 varchar(11) default null,
	email varchar(50) unique not null
);

CREATE TABLE Produto(
	nome varchar (45) not null,
	preco double not null,
	quantidade int not null,
	id BIGINT AUTO_INCREMENT primary key
);

CREATE TABLE Venda(
	dataHoraVenda DATETIME DEFAULT CURRENT_TIMESTAMP,
	quantidade int not null,
	idFornecedor BIGINT,
	idProduto BIGINT,
	idSocio BIGINT,
	PRIMARY KEY (dataHoraVenda, idFornecedor, idProduto, idSocio),
	FOREIGN KEY (idFornecedor) REFERENCES Fornecedor(id),
	FOREIGN KEY (idProduto) REFERENCES Produto(id),
	FOREIGN KEY (idSocio) REFERENCES Socio(id)
);

-- inserção

INSERT INTO Colaborador (id, nome, cpf) VALUES (1, 'Ana Sophia Araújo', '43815092698');
INSERT INTO Colaborador (id, nome, cpf) VALUES (2, 'Antônio Carvalho', '39041687548');
INSERT INTO Colaborador (id, nome, cpf) VALUES (3, 'Emilly Almeida', '26591780386');
INSERT INTO Colaborador (id, nome, cpf) VALUES (4, 'Ana Luiza Moraes', '54093871639');
INSERT INTO Colaborador (id, nome, cpf) VALUES (5, 'Evelyn Moreira', '93105726802');
INSERT INTO Colaborador (id, nome, cpf) VALUES (6, 'João Miguel Freitas', '75296183002');
INSERT INTO Colaborador (id, nome, cpf) VALUES (7, 'Maysa da Cunha', '83296714537');
INSERT INTO Colaborador (id, nome, cpf) VALUES (8, 'Enzo Azevedo', '56401728949');
INSERT INTO Colaborador (id, nome, cpf) VALUES (9, 'Melissa Ramos', '24915873609');
INSERT INTO Colaborador (id, nome, cpf) VALUES (10, 'Juliana Moreira', '32706518480');
INSERT INTO Colaborador (id, nome, cpf) VALUES (11, 'Lara Campos', '69742805300');
INSERT INTO Colaborador (id, nome, cpf) VALUES (12, 'Maria Alice Fogaça', '51438602960');
INSERT INTO Colaborador (id, nome, cpf) VALUES (13, 'Sophie da Luz', '81465790357');
INSERT INTO Colaborador (id, nome, cpf) VALUES (14, 'Marcelo Souza', '05796248383');
INSERT INTO Colaborador (id, nome, cpf) VALUES (15, 'Miguel Cardoso', '17964852337');
INSERT INTO Colaborador (id, nome, cpf) VALUES (16, 'Bárbara Ferreira', '86345129755');
INSERT INTO Colaborador (id, nome, cpf) VALUES (17, 'Manuela Porto', '13802695470');
INSERT INTO Colaborador (id, nome, cpf) VALUES (18, 'Breno Caldeira', '31062789512');
INSERT INTO Colaborador (id, nome, cpf) VALUES (19, 'Marcelo Costela', '97368510286');
INSERT INTO Colaborador (id, nome, cpf) VALUES (20, 'Larissa Moraes', '69785043193');
INSERT INTO Colaborador (id, nome, cpf) VALUES (21, 'Sra. Yasmin Cavalcanti', '39847150648');
INSERT INTO Colaborador (id, nome, cpf) VALUES (22, 'Elisa Cardoso', '78105463253');
INSERT INTO Colaborador (id, nome, cpf) VALUES (23, 'Juan Rodrigues', '73601895277');
INSERT INTO Colaborador (id, nome, cpf) VALUES (24, 'Esther Pereira', '87219605340');
INSERT INTO Colaborador (id, nome, cpf) VALUES (25, 'Sra. Ana Carolina Barros', '97204615867');
INSERT INTO Colaborador (id, nome, cpf) VALUES (26, 'Eduarda Nunes', '13047829560');
INSERT INTO Colaborador (id, nome, cpf) VALUES (27, 'Raquel Lopes', '34615297025');
INSERT INTO Colaborador (id, nome, cpf) VALUES (28, 'Lorenzo Castro', '18342950760');
INSERT INTO Colaborador (id, nome, cpf) VALUES (29, 'Dr. Davi Lucca Pires', '84059273104');
INSERT INTO Colaborador (id, nome, cpf) VALUES (30, 'Calebe Vieira', '24871956300');

INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2023-12-19', 'Odontologista legal', '401640052427868', 6935.13, 1);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2015-07-14', 'Cantor', '128059826204505', 1712.59, 2);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2018-12-10', 'Tecnólogo em produção de bebidas', '315869232260256', 3837.75, 3);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2019-08-04', 'Engenheiro físico', '216073375433036', 3397.29, 4);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2020-12-13', 'Enólogo', '145868501429401', 7760.01, 5);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2022-10-05', 'Ginecologista', '569816934060883', 7251.95, 6);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2021-07-25', 'Maquinista', '159514846564823', 9083.53, 7);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2022-07-09', 'Técnico em óptica', '629946804436995', 2238.98, 8);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2023-04-12', 'Mecanógrafo', '738721489513433', 5086.34, 9);
INSERT INTO Empregado (dataAdmissao, funcao, numeroPis, salario, id) VALUES ('2017-11-15', 'Alfaiate', '037917693676320', 1753.28, 10);

INSERT INTO Medico (especialidade, crm, id) VALUES ('Cambista', '63287083', 11);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Cartógrafo', '72788957', 12);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Repositor', '86872774', 13);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Engenheiro de computação', '48734714', 14);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Endocrinologista', '45581223', 15);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Jogador de boliche', '23166587', 16);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Locutor', '03669096', 17);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Nefrologista', '05466889', 18);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Economista doméstico', '73467065', 19);
INSERT INTO Medico (especialidade, crm, id) VALUES ('Técnico em taquigrafia', '62729806', 20);

INSERT INTO Socio (proLabore, id) VALUES (5623.66, 21);
INSERT INTO Socio (proLabore, id) VALUES (9064.26, 22);
INSERT INTO Socio (proLabore, id) VALUES (3318.43, 23);
INSERT INTO Socio (proLabore, id) VALUES (5386.05, 24);
INSERT INTO Socio (proLabore, id) VALUES (10798.61, 25);

INSERT INTO Exame (id, nome, preparo, preco) VALUES (1, 'Rerum', 'Optio assumenda inventore sint delectus ea eveniet.', 590.45);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (2, 'Odit', 'Excepturi sunt eius veritatis in rerum.', 298.4);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (3, 'Optio', 'Quibusdam amet veritatis.', 630.34);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (4, 'Et', 'Quos officiis quidem veniam.', 828.49);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (5, 'Eligendi', 'Numquam dolores labore.', 105.85);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (6, 'Cum', 'Veniam iure ducimus fuga non vitae quaerat.', 825.24);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (7, 'Dolorem', 'Autem ad est perspiciatis vero.', 728.33);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (8, 'Nam', 'Asperiores porro occaecati aut quo.', 406.23);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (9, 'Vitae', 'Rem recusandae natus aliquam minus optio architecto officia.', 239.93);
INSERT INTO Exame (id, nome, preparo, preco) VALUES (10, 'Accusantium', 'Reprehenderit autem vero odio repudiandae provident.', 961.49);

INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (1, 'Camila Silveira', 'Maitê', '48736921050', '14386750', '2001-08-23', '27354549', '5515', 'voluptates', '8480831367', '8437770143', 'paulomoura@uol.com.br', 'Marcela Monteiro', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (2, 'Luiz Fernando Gonçalves', 'Lucas Gabriel', '95812643709', '36930534', '1942-08-31', '68705685', '4074', 'voluptatem', '71962462873', '41942708668', 'qfarias@melo.br', 'Luiz Otávio da Mota', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (3, 'Gabriel Nascimento', 'Maria Eduarda', '90174563884', '44689713', '1975-08-19', '33173936', '3140', 'excepturi', '84954678544', '61987717535', 'kbarbosa@hotmail.com', 'Srta. Alexia Ferreira', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (4, 'Maria Luiza Peixoto', 'Nicolas', '23518467964', '34537812', '2000-11-13', '72522872', '3117', 'quis', '11980100623', '21920387509', 'aaragao@bol.com.br', 'Júlia Alves', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (5, 'Luiz Miguel Freitas', 'Esther', '40671892304', '32342289', '1960-06-27', '54615679', '8787', 'exercitationem', '41941016668', '81900217659', 'diaskevin@fogaca.com', 'Rodrigo Freitas', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (6, 'Maria Fernanda Azevedo', 'João Gabriel', '50341789666', '75693188', '1967-02-04', '85621850', '7351', 'consequuntur', '71931599965', '11947735866', 'xcardoso@farias.com', 'Gabriel da Costa', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (7, 'Raquel da Costa', 'Olivia', '65809721303', '36207439', '1948-04-12', '12678886', '2297', 'corporis', '11915819956', '11946618398', 'ida-cunha@jesus.org', 'Bianca Campos', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (8, 'Leandro Freitas', 'Ana Beatriz', '47126835035', '61453148', '1948-12-04', '40659657', '6913', 'iusto', '71992459375', '31965479356', 'hmoreira@bol.com.br', 'Nicolas Viana', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (9, 'Rodrigo Vieira', 'Benjamin', '73962085130', '18680305', '1975-08-01', '42661797', '3007', 'reprehenderit', '71988680589', '21913529096', 'acavalcanti@gmail.com', 'Enzo Gabriel Silva', NULL);
INSERT INTO Paciente (id, nome, nomeSocial, cpf, rg, dataNascimento, cep, numeroEndereco, complementoEndereco, telefone1, telefone2, email, nomeMae, pacienteIndicador) VALUES (10, 'Dra. Maria Eduarda das Neves', 'Ana Lívia', '56789413057', '64796438', '1948-08-06', '61125457', '4564', 'enim', '84975717751', '51901051238', 'rafaelpereira@dias.br', 'Carolina da Mata', NULL);

INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES ('2024-06-06 16:00:34', 'Joana Costa', 'Provident dolor nostrum possimus voluptatum.', 'cancelado', 3, 11, 4);
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES ('2023-10-18 12:45:02', 'Daniel Cardoso', 'Tempore ipsum assumenda placeat. Pariatur quae mollitia enim error culpa.', 'realizado', 3, 14, 2);
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES ('2024-11-17 04:23:00', 'Dra. Camila Moreira', 'Commodi dicta consequuntur ratione ad. Nemo iusto voluptatem consectetur sunt aperiam id.', 'realizado', 9, 18, 6);
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES ('2024-11-22 21:46:00', 'Sra. Marcela Oliveira', 'Asperiores voluptas odit ipsum perspiciatis exercitationem soluta. Odit delectus vitae inventore tenetur animi commodi.', 'agendado', 1, 16, 4);
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES ('2023-09-11 21:34:15', 'Davi Luiz da Cruz', 'Exercitationem velit tempora sapiente dolorum. Earum numquam nostrum atque odit nihil neque.', 'cancelado', 9, 12, 10);
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES ('2023-09-26 00:34:00', 'Mariane Mendes', 'Repudiandae adipisci aliquid. Eaque distinctio nemo nulla adipisci suscipit molestias.', 'cancelado', 6, 19, 4);
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES ('2024-09-25 15:10:29', 'Lucca Farias', 'Iste porro culpa impedit iure. Non est quaerat quasi similique voluptate.', 'agendado', 2, 17, 5);
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES ('2023-08-25 14:48:48', 'Sr. Ian Duarte', 'Eaque dolorum atque enim. Sint in vitae temporibus repellendus ut.', 'cancelado', 4, 14, 6);
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES ('2024-11-26 03:57:50', 'Sr. Vitor Hugo da Cruz', 'Iure soluta libero at hic itaque dolores. Explicabo amet libero sunt omnis iusto modi sed.', 'agendado', 8, 11, 6);
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES ('2024-04-14 18:13:54', 'Francisco Moreira', 'Aliquid amet natus facere enim harum. Quisquam eius voluptatibus perspiciatis blanditiis voluptate hic.', 'realizado', 9, 12, 4);
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES ('2025-01-22 11:06:50', 'Dr. Vitor Gabriel da Conceição', 'Magni magnam aliquid consequatur ex labore itaque non.', 'cancelado', 5, 14, 8);
INSERT INTO AgendaExame (dataHoraRealizacao, medicoRequisitante, laudo, status, idPaciente, idMedico, idExame) VALUES ('2024-06-19 10:52:45', 'Igor Lopes', 'Voluptatibus qui error excepturi repudiandae minus.', 'realizado', 7, 13, 5);

INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES ('PIX', 'bVrpoiVgRVIfLBcbfnoGMbJm1', 122.51, 3, 1, '2025-02-17 09:01:35', '2023-10-18 12:45:02', 3, 14, 2);
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES ('Cartão', 'AoCLrZaWZkSBvrjnWvgfygww8', 300.89, 6, 2, '2025-01-04 18:22:28', '2024-11-17 04:23:00', 9, 18, 6);
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES ('PIX', 'ZcUDIhyfJsONxKmTecQoXsfo4', 709.03, 5, 3, '2025-04-16 19:27:11', '2024-11-22 21:46:00', 1, 16, 4);
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES ('PIX', 'yrDOxkxwnQrSRPeMOkIUpkDy1', 631.44, 1, 4, '2024-08-28 03:20:09', '2023-09-11 21:34:15', 9, 12, 10);
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES ('PIX', 'oRuXXdocZuzrenKTunPFzPDj8', 184.33, 2, 5, '2024-08-26 04:06:07', '2023-09-26 00:34:00', 6, 19, 4);
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES ('PIX', 'pVJIqVLBLzxoiGFfWdhjOkYR2', 605.12, 6, 6, '2024-10-26 06:03:21', '2024-09-25 15:10:29', 2, 17, 5);
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES ('Boleto', 'eyyMDHqJaRUhRIWrXPvhsBkD9', 298.4, 5, 7, '2024-05-16 13:29:18', '2023-08-25 14:48:48', 4, 14, 6);
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES ('Dinheiro', 'GWlGgOtOGMmjxWkIXHaMuFbh4', 828.49, 1, 8, '2025-05-11 03:04:00', '2024-11-26 03:57:50', 8, 11, 6);
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES ('Cartão', 'ZtpdpKffUFeWIXiiQEJkqHMB5', 728.33, 3, 9, '2024-08-05 13:20:32', '2024-04-14 18:13:54', 9, 12, 4);
INSERT INTO Pagamento (formaPagamento, notaFiscal, valorPago, parcelas, id, dataPagamento, agendaExameDataHora, agendaExamePaciente, agendaExameMedico, agendaExameExame) VALUES ('Dinheiro', 'WUSmTtzQPxCHChpoevbLJoLo8', 239.93, 3, 10, '2024-05-18 02:15:48', '2025-01-22 11:06:50', 5, 14, 8);

INSERT INTO Fornecedor (id, nome, cnpj, telefone1, telefone2, email) VALUES (1, 'da Conceição', '40958237000102', '6173384842', '5199330833', 'oliveirarafael@castro.com');
INSERT INTO Fornecedor (id, nome, cnpj, telefone1, telefone2, email) VALUES (2, 'Vieira S.A.', '67851249000181', '811938 0262', '5167240049', 'miguel78@cunha.br');
INSERT INTO Fornecedor (id, nome, cnpj, telefone1, telefone2, email) VALUES (3, 'da Mota', '15283790000137', '8149329668', '6116122753', 'vitor37@melo.org');
INSERT INTO Fornecedor (id, nome, cnpj, telefone1, telefone2, email) VALUES (4, 'Ferreira e Filhos', '53097826000187', '7184145933', '8472745687', 'maria-juliacardoso@souza.br');
INSERT INTO Fornecedor (id, nome, cnpj, telefone1, telefone2, email) VALUES (5, 'Correia S/A', '89346157000187', '4171397187', '8172867908', 'mirella06@yahoo.com.br');

INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('A', 460.06, 39, 1);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Esse', 168.84, 2, 2);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Repellendus', 64.82, 24, 3);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Aut', 440.57, 20, 4);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Aperiam', 127.33, 16, 5);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Nisi', 440.22, 6, 6);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Laborum', 51.97, 32, 7);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Voluptates', 409.85, 49, 8);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('At', 271.03, 9, 9);
INSERT INTO Produto (nome, preco, quantidade, id) VALUES ('Quis', 72.91, 31, 10);

INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-07-01 20:24:07', 9, 2, 5, 25);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2025-05-10 23:02:30', 10, 4, 4, 25);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2025-04-09 14:35:45', 4, 3, 7, 23);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-07-08 15:45:57', 8, 5, 8, 21);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2025-05-10 07:59:38', 4, 2, 2, 23);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-05-16 17:12:03', 1, 5, 9, 22);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-06-09 16:44:12', 10, 2, 1, 21);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-12-25 00:54:52', 1, 2, 2, 21);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-03-28 14:59:16', 6, 1, 9, 22);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-10-02 20:15:03', 5, 4, 4, 25);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2025-01-02 07:50:02', 3, 5, 10, 24);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2023-08-29 05:43:58', 4, 4, 7, 22);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-12-30 21:13:06', 2, 1, 7, 23);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-09-25 08:02:54', 7, 4, 8, 21);
INSERT INTO Venda (dataHoraVenda, quantidade, idFornecedor, idProduto, idSocio) VALUES ('2024-12-02 12:05:50', 2, 1, 7, 23);



