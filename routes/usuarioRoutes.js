import express from "express"
import usuarioController from "../controlleres/usuarioController.js"

const usuarioRoutes =  express.Router()

    usuarioRoutes.post("/usuario", usuarioController.createUsuario)
    usuarioRoutes.post("/auth", usuarioController.loginUsuario)

export default usuarioRoutes