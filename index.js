import "dotenv/config"
import express from "express"
import "./config/db-connection.js"
import obraRoutes from "./routes/obraRoutes.js"
import artistaRoutes from "./routes/artistaRoutes.js"
import swaggerUi from "swagger-ui-express"
import swaggerJsDoc from "swagger-jsdoc"
import swaggerOptions from "./config/swagger-config.js"

const swaggerDocs = swaggerJsDoc(swaggerOptions)
const app = express()
app.use(express.urlencoded({ extended: false}))
// Permite que a API receba JSON no corpo das requisições (usaremos no POST/PUT)
app.use(express.json())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use("/", obraRoutes)
app.use("/", artistaRoutes)

// Rota de teste, só para confirmar que o servidor está no ar
app.get("/", (req, res) => {
  res.status(200).json({ mensagem: "API de Obras de Arte no ar" })
})


const port = process.env.PORT|| 3000 
app.listen(port, (error) => {
  if (error) {
    console.log(error)
  } else {
    console.log(`API rodando em http://localhost:${port}`)
    console.log(`Documentação Swagger em http://localhost:${port}/api-docs`)
  }
})
