import express from "express"
import artistaController from "../controlleres/artistaController.js"

const artistaRoutes = express.Router()

artistaRoutes.get("/artistas", artistaController.getArtistas)
artistaRoutes.get("/artistas/:id", artistaController.getArtistaById)
artistaRoutes.post("/artista/", artistaController.createArtista)

export default artistaRoutes