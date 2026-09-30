import express from 'express'
import obraController from '../controlleres/obraController.js'

const obraRoutes = express.Router()

obraRoutes.get("/obras", obraController.getAllObras)

export default obraRoutes