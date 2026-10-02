import express from "express"
import artistaController from "../controlleres/artistaController.js"

const artistaRoutes = express.Router()

artistaRoutes.get("/artista", artistaController.getArtistas)
artistaRoutes.get("/artista/:id", artistaController.getArtistaById)
artistaRoutes.post("/artista/", artistaController.createArtista)
artistaRoutes.put("/artista/:id", artistaController.updateArtista)

export default artistaRoutes