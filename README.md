# API de Obras de Arte

API REST de um **catálogo de museu digital**, que permite cadastrar, consultar, alterar e excluir **obras de arte** e **artistas**. Cada obra guarda, dentro do próprio documento, as informações do **acervo** onde está exposta (instituição, localização, forma e ano de aquisição).

O acesso à API é protegido por **autenticação JWT** e por dois perfis de usuário: **admin** (todas as operações) e **consumidor** (apenas consultas).

Projeto da **Atividade 02 – API Rest e MongoDB** (Fatec Registro – DSM – Desenvolvimento Web III – Prof. Diego Max).

**Equipe:** Camile Vitória Marques Dias,  Lorenzo Lopes David e Ricardo Kaeriyama Hirano

---

## Tecnologias

- Node.js (ES Modules)
- Express
- MongoDB Atlas (banco na nuvem) + Mongoose
- dotenv
- jsonwebtoken (autenticação JWT)
- bcryptjs (hash de senhas)
- Swagger (swagger-jsdoc + swagger-ui-express)

## Arquitetura

O projeto segue a arquitetura em camadas vista em aula:

```
Rota → (Middleware de autenticação) → Controller → Service → Model → MongoDB Atlas
```

| Camada | Responsabilidade |
|---|---|
| Routes | Define os endpoints, aplica os middlewares de autenticação e liga cada rota a um método do controller |
| Middleware | Confere o token JWT e o perfil do usuário antes de a requisição chegar ao controller |
| Controller | Recebe a requisição, valida o ID, escolhe o status HTTP da resposta |
| Service | Acessa o banco por meio do Model (e gera o hash da senha do usuário) |
| Model | Define o Schema (campos e validações) |

### Estrutura de pastas

```
├── config/
│   ├── db-connection.js     # conexão com o MongoDB Atlas
│   └── swagger-config.js    # configuração do Swagger
├── controlleres/
│   ├── obraController.js
│   ├── artistaController.js
│   └── usuarioController.js
├── docs/
│   └── swaggerDocs.yaml     # documentação dos endpoints
├── middleware/
│   └── Auth.js              # validação do token JWT e do perfil
├── models/
│   ├── Obras.js
│   ├── Artistas.js
│   └── Usuarios.js
├── routes/
│   ├── obraRoutes.js
│   ├── artistaRoutes.js
│   └── usuarioRoutes.js
├── service/
│   ├── obraService.js
│   ├── artistaService.js
│   └── usuarioService.js
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

### Usuário

| Campo | Tipo | Obrigatório | Observação |
|---|---|---|---|
| nome | String | Sim | |
| email | String | Sim | Único (não permite dois usuários com o mesmo e-mail) |
| senha | String | Sim | Guardada em **hash** (bcrypt), nunca em texto puro |
| perfil | String | Não | `admin` ou `consumidor` (padrão: `consumidor`) |

---

## Como executar

### 1. Pré-requisitos

- Node.js 18 ou superior
- Uma conta no [MongoDB Atlas](https://www.mongodb.com/atlas) com um cluster, um usuário de banco e o IP da sua máquina liberado em **Network Access** ou o arquivo .env já configurado

### 2. Clonar e instalar

```bash
git clone https://github.com/ricardohirano/atv02-API-Rest-e-eMongoDB-Trabalho-em-Grupo.git
cd atv02-API-Rest-e-eMongoDB-Trabalho-em-Grupo
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
JWT_SECRET=troque-por-uma-frase-longa-e-secreta
```

| Variável | Para que serve |
|---|---|
| `PORT` | Porta em que a API sobe |
| `MONGO_URI` | String de conexão com o MongoDB Atlas |
| `JWT_SECRET` | Segredo usado para assinar e conferir os tokens JWT. Use uma frase longa e difícil de adivinhar |

> O arquivo `.env` contém a senha do banco e o segredo do JWT e **não é enviado ao GitHub**. O `.env.example` guarda apenas valores de exemplo.

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

## Autenticação e perfis

A API usa **JWT (JSON Web Token)**. O fluxo é:

1. O usuário se cadastra em `POST /usuario`.
2. Faz login em `POST /auth` e recebe um **token** (válido por 24 horas).
3. Envia o token em todas as demais requisições, no cabeçalho:

```
Authorization: Bearer <token>
```

O token é assinado com o `JWT_SECRET` e leva dentro `id`, `email` e `perfil` do usuário. A cada requisição protegida, o middleware confere a assinatura e o perfil antes de liberar o acesso.

### Perfis

| Perfil | O que pode fazer |
|---|---|
| **consumidor** | Apenas consultar: rotas `GET` de obras e artistas |
| **admin** | Tudo: consultar, cadastrar, alterar e excluir obras e artistas, além de gerenciar usuários |

Todo usuário cadastrado em `POST /usuario` nasce como **consumidor**. O campo `perfil`, se for enviado no cadastro, é ignorado (assim ninguém consegue se cadastrar como admin).

### Como criar o primeiro admin

1. Cadastre um usuário normalmente em `POST /usuario`.
2. No MongoDB Atlas, abra **Browse Collections** → banco `api-obras-arte` → coleção `usuarios`.
3. Edite o documento desse usuário, troque o campo `perfil` de `"consumidor"` para `"admin"` e confirme a alteração.
4. Faça **login de novo** em `POST /auth`: o perfil fica gravado no token no momento do login, então o token antigo continua valendo como consumidor.

### Usando o token

- **Insomnia:** aba **Auth** → **Bearer Token**, e cole **só o token** (sem a palavra "Bearer").
- **Swagger:** faça login em `POST /auth`, clique em **Authorize**, cole **só o token** e confirme.

---

## Documentação (Swagger)

Com a API rodando, acesse **`http://localhost:PORTA/api-docs`**. Nessa página é possível ver todos os endpoints e testá-los pelo botão **Try it out**.

Para testar as rotas protegidas: execute `POST /auth`, copie o token da resposta e clique em **Authorize** (botão com cadeado, no topo da página). As rotas com cadeado passam a enviar o token automaticamente.

---

## Endpoints

### Autenticação e usuários

| Método | Rota | Descrição | Acesso |
|---|---|---|---|
| POST | `/auth` | Login: recebe `email` e `senha` e devolve o token JWT | Público |
| POST | `/usuario` | Cadastra um usuário (sempre como consumidor) | Público |
| GET | `/usuario/:id` | Busca um usuário pelo ID (sem a senha) | Admin |
| PUT | `/usuario/:id` | Atualiza nome, e-mail ou senha de um usuário | Admin |
| DELETE | `/usuario/:id` | Remove um usuário | Admin |

### Obras

| Método | Rota | Descrição | Acesso |
|---|---|---|---|
| GET | `/obra` | Lista todas as obras | Admin e consumidor |
| GET | `/obra/:id` | Busca uma obra pelo ID | Admin e consumidor |
| POST | `/obra` | Cadastra uma obra | Admin |
| PUT | `/obra/:id` | Atualiza uma obra | Admin |
| DELETE | `/obra/:id` | Remove uma obra | Admin |

### Artistas

| Método | Rota | Descrição | Acesso |
|---|---|---|---|
| GET | `/artista` | Lista todos os artistas | Admin e consumidor |
| GET | `/artista/:id` | Busca um artista pelo ID | Admin e consumidor |
| POST | `/artista` | Cadastra um artista | Admin |
| PUT | `/artista/:id` | Atualiza um artista | Admin |
| DELETE | `/artista/:id` | Remove um artista | Admin |

### Códigos de resposta

| Código | Significado |
|---|---|
| 200 | Requisição bem-sucedida |
| 201 | Registro criado |
| 204 | Registro removido (sem corpo na resposta) |
| 400 | ID inválido ou dados inválidos (campo obrigatório ausente, tipo errado) |
| 401 | Não autenticado: token não informado, token inválido ou expirado, ou senha incorreta no login |
| 403 | Acesso negado: o usuário está autenticado, mas o perfil não tem permissão (ex.: consumidor tentando cadastrar ou excluir) |
| 404 | Registro não encontrado |
| 409 | E-mail já cadastrado (cadastro de usuário) |
| 500 | Erro interno do servidor |

Respostas de erro seguem o formato `{ "error": "mensagem" }`.

> **401 × 403:** o 401 significa "não sei quem você é" (sem token ou token inválido). O 403 significa "sei quem você é, mas você não pode fazer isso".

---

## Exemplos

### POST /usuario

Corpo da requisição:

```json
{
  "nome": "Ricardo",
  "email": "ricardo@email.com",
  "senha": "123456"
}
```

Resposta: `201 Created`. A senha aparece em hash (bcrypt) e o perfil é `consumidor`:

```json
{
  "usuario": {
    "nome": "Ricardo",
    "email": "ricardo@email.com",
    "senha": "$2b$10$exemploDeHashGeradoPeloBcrypt...",
    "perfil": "consumidor",
    "_id": "665f1a2b3c4d5e6f7a8b9e01"
  }
}
```

### POST /auth

Corpo da requisição:

```json
{
  "email": "ricardo@email.com",
  "senha": "123456"
}
```

Resposta: `200 OK`

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### GET /obra (com token)

```
GET /obra
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Sem o cabeçalho, a resposta é `401`:

```json
{
  "error": "Token não informado"
}
```

Com o token de um consumidor em uma rota de escrita (por exemplo `POST /obra`), a resposta é `403`:

```json
{
  "error": "Acesso negado: apenas administradores"
}
```

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

### POST /obra (somente admin)

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

### POST /artista (somente admin)

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
- No `PUT /usuario/:id`, se a `senha` for enviada, ela é gravada em hash. O campo `perfil` não pode ser alterado por essa rota.

---

## Segurança

- As senhas são guardadas com **hash (bcrypt)**; a API nunca devolve a senha nas consultas de usuário.
- O `JWT_SECRET` e a string de conexão do banco ficam no `.env`, que **não vai para o GitHub**.
- O token expira em **24 horas**. Se o perfil de um usuário for alterado no banco, ele precisa fazer login de novo para receber um token com o perfil novo.
- O cadastro público sempre cria usuários **consumidores**; o perfil admin só é atribuído manualmente no banco de dados.

---

## Protótipo 

- Protótipo no Figma: https://www.figma.com/design/wvzAsjJgASrdK9o62sT7lg/Untitled?node-id=0-1&t=0hDHCsPt8woweke6-1
