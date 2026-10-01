import express from 'express'
import obraController from '../controlleres/obraController.js'

const obraRoutes = express.Router()

obraRoutes.get("/obras", obraController.getAllObras)
obraRoutes.get("/obra/:id", obraController.getObraById)


export default obraRoutes