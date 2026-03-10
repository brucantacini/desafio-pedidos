# API de Gerenciamento de Pedidos

API em Node.js (JavaScript) para criar, listar, obter, atualizar e excluir pedidos, com persistência em MongoDB e mapeamento dos campos da requisição para o formato do banco.

## Requisitos

- Node.js 18+
- MongoD

## Instalação

npm install

Copie o arquivo de ambiente e ajuste se necessário:

copy .env.example .env

Edite `.env` e configure `MONGODB_URI` (ex.: `mongodb://localhost:27017/desafio-pedidos`).

Em desenvolvimento com reinício automático:

npm run dev

A API estará em `http://localhost:3000`.

## Endpoints

| Método | URL | Descrição |
|--------|-----|-----------|
| **POST** | `/order` | Criar novo pedido (obrigatório) |
| **GET** | `/order/:numeroPedido` | Obter pedido pelo número (obrigatório) |
| **GET** | `/order/list` | Listar todos os pedidos (opcional) |
| **PUT** | `/order/:numeroPedido` | Atualizar pedido (opcional) |
| **DELETE** | `/order/:numeroPedido` | Excluir pedido (opcional) |

## Mapeamento de campos

O body da requisição usa nomes em português; ao salvar no banco os campos são mapeados assim:

{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 15000,
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 2,
      "valorItem": 1000
    }
  ]
}

## Exemplo de criação (cURL)

```bash
curl --location 'http://localhost:3000/order' \
  ![1773104610467](image/README/1773104610467.png)
```

## Exemplos rápidos

- **Obter pedido:** `GET http://localhost:3000/order/v10089016vdb`
- **Listar todos:** `GET http://localhost:3000/order/list`
- **Atualizar:** `PUT http://localhost:3000/order/v10089016vdb` (body igual ao do POST)
- **Deletar:** `DELETE http://localhost:3000/order/v10089016vdb`

## Respostas HTTP

- `200` – Sucesso (GET, PUT, DELETE)
- `201` – Pedido criado (POST)
- `400` – Requisição inválida (campos obrigatórios, JSON inválido)
- `404` – Pedido não encontrado
- `409` – Conflito (ex.: pedido já existe com mesmo número)
- `500` – Erro interno do servidor

## Estrutura do projeto

```
src/
  config/db.js         
  controllers/orderController.js
  middlewares/errorHandler.js
  models/Order.js       
  models/Item.js        
  routes/orderRoutes.js
  utils/mapOrderRequest.js  
  index.js            
```