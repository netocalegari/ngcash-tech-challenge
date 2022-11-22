# ngcash-tech-challenge

Este é um desafio técnico para o processo seletivo da vaga backend jr. para a NG.Cash.

Para iniciar o projeto, basta rodar "docker-compose up --build" caso seja a primeira vez ou "docker-compose up".

# Endpoints

BaseURL: http://localhost:3000/

Criação de de usuário:

- POST /register
  Não necessita de autenticação

  {
    "username": "user",
    "password": "........" 
  }

  username deve possuir ao menos 3 caracteres;
  A senha deve possuir ao menos 8 caracteres, um número e uma letra maiúscula;

  Retorno esperado

  201 Created
  {
    "id": "a72dc32e-1aaa-4a8d-a1a4-cb5aafcb6e88",
    "username": "user",
    "account_id": {
      "id": "c04206ca-769c-4aff-96ea-ea752243d4c1"
    }
  }

Login:

- POST /login
  Não necessita de autenticação

  {
    "username": "user",
	  "password": "........"
  }

  Retorno esperado

  200 OK
  {
    "token": 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ0ZDNhMGY0LTYyNmEtNGRjOS04YWRhLWM4MGYyYzQzOThhYyIsInVzZXJuYW1lIjoibmV0byIsImlhdCI6MTY2OTEzNzA5MSwiZXhwIjoxNjY5MjIzNDkxLCJzdWKiOiJkNGQzYTBmNC02MjZhLTRkYzktOGFkYS1jODBmMmM0Mzk4YWMifQ.EaxygVnXSsjvStp0grd6IFfb1e6_cJEPflMz9lkdvaI"
  }

Checar balance da conta:

  - GET /dashboard
    Deve estar autenticado

    Retorno esperado

    200 OK
    {
      "id": "d4d3a0f4-626a-4dc9-8ada-c80f2c4398ac",
      "username": "user",
      "password": "$2b$10$vL8z02LcA0./Q..UzqxZpeR9C2pLmCTgufEopbrbC.jketEDezWQK",
      "account_id": {
        "balance": 100,
        "id": "ad3090cc-f762-42b2-8282-608a8a4e0179"
      }
    }

Realizar uma transação

  - PATCH /dashboard/transaction
    Deve estar autenticado
  
    {
      "username": "user2",
	    "amount": 50
    }

    username deve ser a conta de destino;

    Retorno esperado

    200 OK
    {
      
    }