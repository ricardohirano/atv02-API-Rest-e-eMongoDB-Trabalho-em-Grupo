import express from "express"
import usuarioController from "../controlleres/usuarioController.js"
import Auth from "../middleware/Auth.js"

const usuarioRoutes =  express.Router()

// Públicas
usuarioRoutes.post("/usuario", usuarioController.createUsuario)
usuarioRoutes.post("/auth", usuarioController.loginUsuario)

// Gerenciar usuários: só admin
usuarioRoutes.get("/usuario/:id", Auth.Authorization, Auth.Admin, usuarioController.getUsuarioById)
usuarioRoutes.put("/usuario/:id", Auth.Authorization, Auth.Admin, usuarioController.updateUsuario)
usuarioRoutes.delete("/usuario/:id", Auth.Authorization, Auth.Admin, usuarioController.deleteUsuario)

export default usuarioRoutes