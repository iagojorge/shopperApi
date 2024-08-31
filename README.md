
# ShopperApi

**ShopperApi** é uma API desenvolvida para gerenciar medições e uploads de dados dos clientes. A API oferece três endpoints principais para confirmar medições, fazer o upload de imagens e listar dados de clientes específicos.

## Endpoints

### 1. `/api/confirm`

Este endpoint é utilizado para confirmar o valor de uma medição.

- **Método:** `PATCH`
- **Request Body:**
  ```json
  {
    "measure_uuid": "",
    "confirmed_value": ""
  }
  ```

  - **measure_uuid**: Identificador único da medição.
  - **confirmed_value**: Valor confirmado da medição.

### 2. `/api/upload`

Este endpoint permite o upload de uma imagem, juntamente com informações adicionais relacionadas à medição.

- **Método:** `POST`
- **Request Body:**
  ```json
  {
    "image": "base64",
    "customer_code": "string",
    "measure_datetime": "datetime",
    "measure_type": "WATER ou GAS"
  }
  ```

  - **image**: Imagem em formato base64.
  - **customer_code**: Código do cliente.
  - **measure_datetime**: Data e hora da medição.
  - **measure_type**: Tipo de medição, podendo ser "WATER" ou "GAS".

### 3. `/<customer_code>/list`

Este endpoint lista todas as medições relacionadas a um cliente específico.

- **Método:** `GET`
- **URL:** `/<customer_code>/list`

  - **customer_code**: Código do cliente a ser passado na URL.

## Configuração

Para configurar a aplicação, siga os passos abaixo:

1. **Configure o arquivo de ambiente**:  
   Renomeie o arquivo `.env.example` para `.env` e configure todas as variáveis de ambiente conforme necessário.

2. **Executando a Aplicação**:  
   Depois de configurar o arquivo `.env`, execute o seguinte comando para construir e iniciar o projeto usando Docker:

   ```bash
   docker-compose up --build
   ```

Isso irá construir a imagem Docker e iniciar todos os containers necessários para a aplicação.

## Requisitos

- **Docker** e **Docker Compose** instalados.
- Configuração adequada das variáveis de ambiente no arquivo `.env`.

---

Desenvolvido por Iago jorge leite.
