import express from 'express'
import obraController from '../controlleres/obraController.js'

const obraRoutes = express.Router()

obraRoutes.get("/obras", obraController.getAllObras)
obraRoutes.get("/obra/:id", obraController.getObraById)
obraRoutes.post("/obras", obraController.createObra)
obraRoutes.put("/obra/:id", obraController.updateObra)
obraRoutes.delete("/obra/:id", obraController.deleteObra)


export default obraRoutes