import requests

def post_AgendaExame():

    print("POST - AgendaExame")

    url = 'http://localhost:8080/agenda-exames'

    json = {
            "dataHoraRealizacao": "2025-04-21T10:00:00",
            "medicoRequisitante": "Dr. House",
            "laudo": "Paciente saudável",
            "status": "Agendado",
            "idPaciente": 1,
            "idMedico": 2,
            "idExame": 3
            }

    response = requests.post(url, json=json)

    print(response.status_code)

    if response.status_code != 200:
        print(response.json()['error'])
        return
    
    print("Sucesso!")

def post_Exame():
    url = 'http://localhost:8080/exames'

    json = {"id": 1,
            "nome": "Endoscopia",
            "preparo": "cu limpo",
            "preco": 10}

    response = requests.post(url, json=json)

    print(response.status_code)

    if response.status_code != 200:
        print(response.json()['error'])
        return
    
    print("Sucesso!")

def post_Paciente():
    url = 'http://localhost:8080/pacientes'

    json = {
            "nome": "João Silva",
            "nomeSocial": "Joãozinho",
            "cpf": "12345678900",
            "rg": "12345678",
            "dataNascimento": "1990-05-10",
            "cep": "12345678",
            "numeroEndereco": "123",
            "complementoEndereco": "Apto 202",
            "telefone1": "11999999999",
            "telefone2": "11988888888",
            "email": "joao.silva@example.com",
            "nomeMae": "Maria Silva",
            "pacienteIndicador": None
            }


    response = requests.post(url, json=json)

    print(response.status_code)

    if response.status_code != 200:
        print(response.json()['error'])
        return
    
    print("Sucesso!")

def POST_Colaborador():

    url = 'http://localhost:8080/colaboradores'

    json = {"nome": "nome",
            "cpf": "cpf"}
    
    response = requests.post(url, json=json)

    print(response.status_code)

    if response.status_code != 200:
        print(response.json()['error'])
        return
    
    print("Sucesso!")

def GET_colaborador():

    cpf = 'cpf'

    url = f'http://localhost:8080/colaboradores/{cpf}'

    response = requests.get(url)

    print(response.status_code)

    if response.status_code != 200:
        print(response.json()['error'])
        return
    
    print("Sucesso!")



print("===============TESTES===============")

#post_Exame()
#post_AgendaExame()
#post_Paciente()
POST_Colaborador()
GET_colaborador()