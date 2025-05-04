# **Clínica Prema Imagem - Sistema de Gestão de Exames e Pagamentos**🏥💉

## **Descrição do Projeto**📝

O **Sistema de Gestão de Exames e Pagamentos - Clínica Prema Imagem** é uma aplicação web desenvolvida em **Spring Boot**, que visa automatizar a gestão de exames, pagamentos, colaboradores e clientes da clícia de Prema diagnostico por imagem. O sistema permite o registro de exames realizados, controle de estoque de produtos, agendamento de consultas e gestão de pagamentos, entre outros recursos importantes para o bom funcionamento da clínica.

Este projeto foi desenvolvido como parte de uma disciplina de **Banco de Dados** da faculdade, com foco em conceitos de **modelagem de dados**, **CRUD** de entidades e **integração de sistemas de gestão**.

---

## **Funcionalidades Principais**⚙️

- **Gestão de Exames:** 🩺
  - Registro de exames realizados na clínica.
  - Agendamento de exames com data e hora.
  - Relacionamento entre exames, pacientes e médicos.

- **Gestão de Pagamentos:** 💳
  - Registro de pagamentos de exames.
  - Controle de forma de pagamento (cartão de crédito, boleto, etc.).
  - Registro de parcelas e nota fiscal.

- **Gestão de Colaboradores:** 👩‍⚕️👨‍⚕️
  - Cadastro de médicos, sócios, e empregados.
  - Relacionamento entre colaboradores e exames agendados.

- **Gestão de Produtos e Fornecedores:** 📦
  - Controle de estoque de produtos da clínica.
  - Gestão de fornecedores de produtos.
  - Cadastro e relacionamento de produtos com fornecedores.

---

## **Tecnologias Utilizadas**💻

- **Java 17** - Linguagem de programação principal.
- **Spring Boot** - Framework utilizado para desenvolvimento da API.
- **Spring Data JPA** - Para manipulação e persistência de dados no banco de dados.
- **MySQL** - Banco de dados relacional utilizado para armazenar os dados.
- **Postman/APIdog** - Ferramenta de testes de APIs.
- **Maven** - Gerenciador de dependências.

---

## **Arquitetura do Sistema**🏗️

O sistema foi projetado com uma arquitetura **MVC (Model-View-Controller)**, onde:

- **Model**: Representa as entidades do sistema (como `Exame`, `Paciente`, `Pagamento`, `Colaborador`, etc.), que são mapeadas para o banco de dados.
- **View**: Não implementada diretamente, pois o foco é uma API RESTful, que pode ser consumida por qualquer front-end.
- **Controller**: Controladores REST responsáveis por lidar com as requisições HTTP e interagir com os repositórios.

---
