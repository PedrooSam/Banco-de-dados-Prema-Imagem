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

print("===============TESTES===============")

#post_Exame()
post_AgendaExame()