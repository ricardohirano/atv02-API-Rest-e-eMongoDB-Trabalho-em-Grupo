import express from 'express'
import obraController from '../controlleres/obraController.js'
import Auth from "../middleware/Auth.js"

const obraRoutes = express.Router()

// Qualquer usuário logado
obraRoutes.get("/obra", Auth.Authorization, obraController.getObras)
obraRoutes.get("/obra/:id", Auth.Authorization, obraController.getObraById)

// Só admin
obraRoutes.post("/obra", Auth.Authorization, Auth.Admin, obraController.createObra)
obraRoutes.put("/obra/:id", Auth.Authorization, Auth.Admin, obraController.updateObra)
obraRoutes.delete("/obra/:id", Auth.Authorization, Auth.Admin, obraController.deleteObra)


export default obraRoutes