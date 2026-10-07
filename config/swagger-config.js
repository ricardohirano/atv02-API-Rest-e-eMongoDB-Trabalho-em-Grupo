

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API de Obras de Arte",
      description:
        "Catálogo de museu digital: cadastro de obras (com acervo embutido) e de artistas.\n\n**Observação sobre PUT:** campos não enviados permanecem como estão no banco; o objeto `acervo`, quando enviado, é substituído por inteiro.",
      version: "1.0.0",
      contact: {
        name: "Camile Vitória Marques Dias, Lorenzo Lopes David e Ricardo Kaeriyama Hirano",
      },
    },
    servers: [{ url: `http://localhost:${process.env.PORT || 3000}` }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    tags: [
      { name: "Auth", description: "Login (gera o token JWT)" },
      { name: "Usuários", description: "Cadastro e gerenciamento de usuários" },
      { name: "Obras", description: "Operações sobre obras de arte" },
      { name: "Artistas", description: "Operações sobre artistas" },
    ],
  },
  apis: ["./routes/*.js", "./docs/swaggerDocs.yaml"],
}

export default swaggerOptions
