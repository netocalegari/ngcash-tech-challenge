# ngcash-tech-challenge

Este é um desafio técnico para o processo seletivo da vaga backend jr. para a NG.Cash.

Para iniciar o projeto, basta rodar "docker-compose up --build" caso seja a primeira vez ou "docker-compose up".

Feito isso, para acessar o endereço da aplicação frontend, acessar:
 - http://localhost:3000/

# Endpoints

BaseURL: 
- http://localhost:3000/

Criação de de usuário:

- POST /register
Não necessita de autenticação

```json 
{
  "username": "user",
  "password": "........" 
}
```

username deve possuir ao menos 3 caracteres;
A senha deve possuir ao menos 8 caracteres, um número e uma letra maiúscula;

Retorno esperado

201 Created
```json
{
  "id": "a72dc32e-1aaa-4a8d-a1a4-cb5aafcb6e88",
  "username": "user",
  "account_id": {
    "id": "c04206ca-769c-4aff-96ea-ea752243d4c1"
  }
}
```

Login:

- POST /login
Não necessita de autenticação

```json
{
  "username": "user",
 "password": "........"
}
```

Retorno esperado

200 OK
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

Checar balance da conta:

- GET /user
- Deve estar autenticado

Retorno esperado

200 OK
```json
{
  "id": "d4d3a0f4-626a-4dc9-8ada-c80f2c4398ac",
  "username": "user",
  "password": "$2b$10$vL8z02LcA0./Q..UzqxZpeR9C2pLmCTgufEopbrbC.jketEDezWQK",
  "account_id": {
    "balance": 100,
    "id": "ad3090cc-f762-42b2-8282-608a8a4e0179"
  }
}
```

Realizar uma transação

- PATCH /transaction
  - Deve estar autenticado

```json
{
  "username": "user2",
  "amount": 50
}
```

username deve ser a conta de destino;

Retorno esperado

200 OK
```json
{
  "credited_account": {
    "id": "344cf3ed-be1d-4dae-989f-93d134f4940b"
  },
  "debited_account": {
    "id": "ad3090cc-f762-42b2-8282-608a8a4e0179"
  },
  "value": 10
}
```

Listar transações envolvendo conta logada:
  
- GET /transaction
- Deve estar autenticado

Retorno esperado

200 OK
```json
{
  [
    {
      "id": "0487bd2b-edd0-4afc-8f08-b8be4f7848f2",
      "created_at": "2022-11-20",
      "value": "50.00",
      "debited_account": {
        "balance": 50,
        "id": "ad3090cc-f762-42b2-8282-608a8a4e0179"
      },
      "credited_account": {
        "balance": 190,
        "id": "344cf3ed-be1d-4dae-989f-93d134f4940b"
      }
    },
    {
      "id": "7f78df96-ad5f-47e2-855b-283ab584d04d",
      "created_at": "2022-11-20",
      "value": "10.00",
      "debited_account": {
        "balance": 50,
        "id": "ad3090cc-f762-42b2-8282-608a8a4e0179"
      },
      "credited_account": {
        "balance": 190,
        "id": "344cf3ed-be1d-4dae-989f-93d134f4940b"
      }
    },
  ]
}
  ```

Filtrar transações por data

- POST /transaction/filter/date
- Deve estar logado

```json
{
  "date": "2022-11-20"
}
```

Retorno esperado

200 OK
```json
[
  {
    "id": "0487bd2b-edd0-4afc-8f08-b8be4f7848f2",
    "created_at": "2022-11-20",
    "value": "50.00",
    "debited_account": {
      "id": "ad3090cc-f762-42b2-8282-608a8a4e0179"
    },
    "credited_account": {
      "id": "344cf3ed-be1d-4dae-989f-93d134f4940b"
    }
  },
  {
    "id": "7f78df96-ad5f-47e2-855b-283ab584d04d",
    "created_at": "2022-11-20",
    "value": "10.00",
    "debited_account": {
      "id": "ad3090cc-f762-42b2-8282-608a8a4e0179"
    },
    "credited_account": {
      "id": "344cf3ed-be1d-4dae-989f-93d134f4940b"
    }
  }
]
```

Filtrar transações por cashIn

- GET /transaction
- Deve estar autenticado
    
Retorno esperado

200 OK
```json
[
	{
		"id": "63fa8f3b-4e86-4cdd-bf01-794941baa18b",
		"created_at": "2022-11-20",
		"value": "10.00",
		"debited_account": {
			"id": "344cf3ed-be1d-4dae-989f-93d134f4940b"
		},
		"credited_account": {
			"id": "ad3090cc-f762-42b2-8282-608a8a4e0179"
		}
	},
	{
		"id": "2f80f8c4-5b12-4f29-b08f-bd04f832ac63",
		"created_at": "2022-11-21",
		"value": "40.00",
		"debited_account": {
			"id": "d9a20758-f9b8-4314-8951-9d2e2b665ee3"
		},
		"credited_account": {
			"id": "ad3090cc-f762-42b2-8282-608a8a4e0179"
		}
	}
]
```

Filtrar transações por cashOut

- GET /transaction
- Deve estar autenticado

Retorno esperado

200 OK
```json
[
	{
		"id": "0487bd2b-edd0-4afc-8f08-b8be4f7848f2",
		"created_at": "2022-11-20",
		"value": "50.00",
		"debited_account": {
			"id": "ad3090cc-f762-42b2-8282-608a8a4e0179"
		},
		"credited_account": {
			"id": "344cf3ed-be1d-4dae-989f-93d134f4940b"
		}
	},
	{
		"id": "7f78df96-ad5f-47e2-855b-283ab584d04d",
		"created_at": "2022-11-20",
		"value": "10.00",
		"debited_account": {
			"id": "ad3090cc-f762-42b2-8282-608a8a4e0179"
		},
		"credited_account": {
			"id": "344cf3ed-be1d-4dae-989f-93d134f4940b"
		}
	},
	{
		"id": "65b2fa15-009c-4cd6-9f79-cd7c7a0c6dff",
		"created_at": "2022-11-20",
		"value": "10.00",
		"debited_account": {
			"id": "ad3090cc-f762-42b2-8282-608a8a4e0179"
		},
		"credited_account": {
			"id": "344cf3ed-be1d-4dae-989f-93d134f4940b"
		}
	}
]
```