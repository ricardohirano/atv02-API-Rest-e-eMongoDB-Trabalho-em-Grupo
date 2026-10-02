import express from 'express'
import obraController from '../controlleres/obraController.js'

const obraRoutes = express.Router()

obraRoutes.get("/obra", obraController.getObras)
obraRoutes.get("/obra/:id", obraController.getObraById)
obraRoutes.post("/obra", obraController.createObra)
obraRoutes.put("/obra/:id", obraController.updateObra)
obraRoutes.delete("/obra/:id", obraController.deleteObra)


export default obraRoutes