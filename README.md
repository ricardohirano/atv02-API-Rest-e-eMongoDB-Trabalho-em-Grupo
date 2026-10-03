# API de Obras de Arte

API REST de um **catálogo de museu digital**, que permite cadastrar, consultar, alterar e excluir **obras de arte** e **artistas**. Cada obra guarda, dentro do próprio documento, as informações do **acervo** onde está exposta (instituição, localização, forma e ano de aquisição).

Projeto da **Atividade 02 – API Rest e MongoDB** (Fatec Registro – DSM – Desenvolvimento Web III – Prof. Diego Max).

**Equipe:** Camile Vitória Marques Dias,  Lorenzo Lopes David e Ricardo Kaeriyama Hirano

---

## Tecnologias

- Node.js (ES Modules)
- Express
- MongoDB Atlas (banco na nuvem) + Mongoose
- dotenv
- Swagger (swagger-jsdoc + swagger-ui-express)

## Arquitetura

O projeto segue a arquitetura em camadas vista em aula:

```
Rota → Controller → Service → Model → MongoDB Atlas
```

| Camada | Responsabilidade |
|---|---|
| Routes | Define os endpoints e liga cada um a um método do controller |
| Controller | Recebe a requisição, valida o ID, escolhe o status HTTP da resposta |
| Service | Acessa o banco por meio do Model |
| Model | Define o Schema (campos e validações) |

### Estrutura de pastas

```
├── config/
│   ├── db-connection.js     # conexão com o MongoDB Atlas
│   └── swagger-config.js    # configuração do Swagger
├── controlleres/
│   ├── obraController.js
│   └── artistaController.js
├── docs/
│   └── swaggerDocs.yaml     # documentação dos endpoints
├── models/
│   ├── Obras.js
│   └── Artistas.js
├── routes/
│   ├── obraRoutes.js
│   └── artistaRoutes.js
├── service/
│   ├── obraService.js
│   └── artistaService.js
├── .env.example
└── index.js
```

---

## Modelo de dados

### Artista

| Campo | Tipo | Obrigatório |
|---|---|---|
| nome | String | Sim |
| cidadeNatal | String | Não |
| nascimento | Date | Não |
| morte | Date | Não |

### Obra

| Campo | Tipo | Obrigatório |
|---|---|---|
| titulo | String | Sim |
| ano | Number | Sim |
| artistaId | ObjectId (referência ao artista) | Sim |
| tecnica | String | Não |
| movimento | String | Não |
| imagem | String (URL) | Não |
| acervo | Documento aninhado | Não |

### Acervo (documento aninhado dentro da obra)

| Campo | Tipo | Obrigatório |
|---|---|---|
| instituicao | String | Sim |
| localizacao | String | Não |
| formaAquisicao | String | Não |
| anoAquisicao | Number | Não |

> O acervo está **embutido** na obra (um documento dentro de outro) porque cada obra pertence a um único acervo e os dados dele só são consultados junto com a obra.

---

## Como executar

### 1. Pré-requisitos

- Node.js 18 ou superior
- Uma conta no [MongoDB Atlas](https://www.mongodb.com/atlas) com um cluster, um usuário de banco e o IP da sua máquina liberado em **Network Access** ou o arquivo .env ja configurado 

### 2. Clonar e instalar

```bash
git clone https://github.com/ricardohirano/atv02-API-Rest-e-eMongoDB-Trabalho-em-Grupo.git
cd [NOME-DA-PASTA]
npm install
```

### 3. Configurar as variáveis de ambiente

Copie o arquivo de exemplo e preencha com os seus dados:

```bash
cp .env.example .env
```

```env
PORT=3000
MONGO_URI=mongodb+srv://USUARIO:SENHA@cluster0.xxxxx.mongodb.net/api-obras-arte?retryWrites=true&w=majority
```

> O arquivo `.env` contém a senha do banco e **não é enviado ao GitHub**.

### 4. Iniciar a API

```bash
npm start
```

Ao subir, o terminal mostra o endereço da API e o da documentação:

```
API rodando em http://localhost:3000
Documentação Swagger em http://localhost:3000/api-docs
```

---

## Documentação (Swagger)

Com a API rodando, acesse **`http://localhost:PORTA/api-docs`**. Nessa página é possível ver todos os endpoints e testá-los pelo botão **Try it out**.

---

## Endpoints

### Obras

| Método | Rota | Descrição |
|---|---|---|
| GET | `/obra` | Lista todas as obras |
| GET | `/obra/:id` | Busca uma obra pelo ID |
| POST | `/obra` | Cadastra uma obra |
| PUT | `/obra/:id` | Atualiza uma obra |
| DELETE | `/obra/:id` | Remove uma obra |

### Artistas

| Método | Rota | Descrição |
|---|---|---|
| GET | `/artista` | Lista todos os artistas |
| GET | `/artista/:id` | Busca um artista pelo ID |
| POST | `/artista` | Cadastra um artista |
| PUT | `/artista/:id` | Atualiza um artista |
| DELETE | `/artista/:id` | Remove um artista |

### Códigos de resposta

| Código | Significado |
|---|---|
| 200 | Requisição bem-sucedida |
| 201 | Registro criado |
| 204 | Registro removido (sem corpo na resposta) |
| 400 | ID inválido ou dados inválidos (campo obrigatório ausente, tipo errado) |
| 404 | Registro não encontrado |
| 500 | Erro interno do servidor |

Respostas de erro seguem o formato `{ "error": "mensagem" }`.

---

## Exemplos

### GET /obra/:id

```json
{
  "obra": {
    "_id": "6abe6ed3f122fc4162a94166",
    "titulo": "A Boba",
    "ano": 1915,
    "tecnica": "Óleo sobre tela",
    "movimento": "Expressionismo",
    "imagem": "https://acervo.mac.usp.br/acervo/media/collectiveaccess/images/3/76058_ca_object_representations_media_313_large.jpg",
    "artistaId": "665f1a2b3c4d5e6f7a8b9c03",
    "acervo": {
      "instituicao": "Museu de Arte Contemporânea da USP (MAC USP)",
      "localizacao": "São Paulo, SP"
    }
  }
}
```

### POST /obra

Corpo da requisição:

```json
{
  "titulo": "Abaporu",
  "tecnica": "Óleo sobre tela",
  "movimento": "Modernismo",
  "imagem": "https://exemplo.com/abaporu.jpg",
  "ano": 1928,
  "artistaId": "665f1a2b3c4d5e6f7a8b9c02",
  "acervo": {
    "instituicao": "Museo de Arte Latinoamericano de Buenos Aires (MALBA)",
    "localizacao": "Buenos Aires, Argentina",
    "formaAquisicao": "Compra em leilão",
    "anoAquisicao": 1995
  }
}
```

Resposta: `201 Created`.

### POST /artista

```json
{
  "nome": "Tarsila do Amaral",
  "cidadeNatal": "Capivari",
  "nascimento": "1886-09-01",
  "morte": "1973-01-17"
}
```

### Erro de validação (400)

Enviando uma obra sem `titulo`:

```json
{
  "error": "O título é obrigatório"
}
```

---

## Observações sobre o PUT

- Os campos **não enviados** no corpo permanecem como estão no banco.
- Se o objeto `acervo` for enviado, ele **substitui o acervo anterior por inteiro** (envie todos os campos do acervo).

---

## Protótipo e apresentação

- Protótipo no Figma: https://www.figma.com/design/wvzAsjJgASrdK9o62sT7lg/Untitled?node-id=0-1&t=0hDHCsPt8woweke6-1
- Slides: [link dos slides]
