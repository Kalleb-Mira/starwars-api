# Star Wars API – Desafio Backend

API serverless desenvolvida em Python utilizando Google Cloud Functions que consome dados da SWAPI (Star Wars API) e permite consultas com filtros.

Projeto criado como parte do case técnico para vaga de Desenvolvedor Back End Python.

---

## Live
https://kalleb-mira.github.io/starwars-api/

##  Tecnologias

- Python 3.10
- Google Cloud Functions (Gen 2)
- Google Cloud Build
- Flask (via Functions Framework)
- Requests
- SWAPI (https://swapi.dev)

---

##  Arquitetura

O projeto foi estruturado seguindo separação de responsabilidades:
```
src/
├── main.py # Entry point da Cloud Function
├── controllers/ # Camada HTTP
├── services/ # Integração com SWAPI
├── domain/ # Regras de negócio / filtros
├── adapters/ # Cliente HTTP isolado
└── utils/ # Padronização de respostas
```
### Fluxo:

Request → Controller → Service → SWAPI → Domain Filters → Response

---

## Backend Endpoint público
https://us-central1-starwars-api-486023.cloudfunctions.net/starwars-api

##  Parâmetros

| Parâmetro | Descrição |
|----------|-----------|
| type | Recurso da SWAPI (pessoas, planetas, filmes, starships, etc) |
| search | Busca textual (nome, titulo) |
| min_population | Filtro mínimo de população (somente planetas) |

---

##  Exemplos de uso

### Pessoas
?type=people
### Busca por nome
?type=people&search=luke
### Planetas
?type=planets
### Filtro por população
?type=planets&min_population=1000000000
### Naves
?type=starships
### Filmes
?type=films

---

##  Rodando localmente

### Criar virtualenv

```bash
python3 -m venv venv
source venv/bin/activate

pip install -r requirements.txt
functions-framework --target=main --source=src --port=8080

# Deploy no GCP
gcloud functions deploy starwars-api \
  --runtime python310 \
  --trigger-http \
  --allow-unauthenticated \
  --entry-point main \
  --source src
```


## Decisões técnicas

- Arquitetura em camadas para facilitar manutenção

- Cliente HTTP isolado

- Filtros implementados no domínio

- Função serverless para reduzir custo operacional

- Respostas padronizadas

- Parâmetros via query string

- Frontend

- GitHub pages

---

## Arquitetura da Solução
```
┌─────────────┐
│   Usuário   │
│  (Browser)  │
└──────┬──────┘
       │
       ▼
┌────────────────────┐
│ Frontend (GitHub   │
│ Pages / HTML + JS)│
└──────┬─────────────┘
       │ HTTP Request
       ▼
┌─────────────────────────────┐
│ Google Cloud Functions     │
│ (Python API - StarWars)    │
└──────┬────────────────────┘
       │
       ▼
┌────────────────────┐
│   SWAPI (External)│
│   swapi.dev       │
└────────────────────┘
```
### Fluxo da Aplicação

1. Usuário acessa o frontend hospedado no GitHub Pages.
2. O frontend faz requisições HTTP para a API hospedada no Google Cloud Functions.
3. A API consulta a SWAPI (Star Wars API).
4. Os dados retornam para a Cloud Function.
5. A resposta é tratada e enviada ao frontend.
6. O frontend renderiza as informações na interface.

## Possíveis melhorias

- Ordenação de resultados

- Cache

- Autenticação

- Testes unitários

- Correlação entre recursos (ex: personagens por filme)

- API Gateway

- Swagger/OpenAPI

---

## Autor

Kalleb Alves
