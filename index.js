import "dotenv/config"
import express from "express"
import "./config/db-connection.js"


const app = express()

// Permite que a API receba JSON no corpo das requisições (usaremos no POST/PUT)
app.use(express.json())

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
  }
})
