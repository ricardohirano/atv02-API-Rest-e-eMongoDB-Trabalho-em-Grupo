import express from "express"
import artistaController from "../controlleres/artistaController.js"
import Auth from "../middleware/Auth.js"

const artistaRoutes = express.Router()


// GET: qualquer usuário logado
artistaRoutes.get("/artista", Auth.Authorization, artistaController.getArtistas)
artistaRoutes.get("/artista/:id", Auth.Authorization, artistaController.getArtistaById)

// POST, PUT, DELETE: só admin
artistaRoutes.post("/artista", Auth.Authorization, Auth.Admin, artistaController.createArtista)
artistaRoutes.put("/artista/:id", Auth.Authorization, Auth.Admin, artistaController.updateArtista)
artistaRoutes.delete("/artista/:id", Auth.Authorization, Auth.Admin, artistaController.deleteArtista)

export default artistaRoutes