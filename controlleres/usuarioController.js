import usuarioService from "../service/usuarioService.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import {ObjectId} from "mongodb"

const createUsuario =  async (req,res)=>{
    try{
        const {nome, email, senha} = req.body
        // Conferindo se existe outro email cadastrado
        const usuarioCadastrado = await usuarioService.getUsuarioByEmail(email)
        if (usuarioCadastrado) {
            //codigo 409 (CONFLICT): a requisicao é valida mais conflita com algo que existe, no caso o email        
            return res.status(409).json({error: "Email ja cadastrado"})
        }
        const novoUsuario = await usuarioService.create(nome, email, senha )
        return res.status(201).json({usuario : novoUsuario})
    }catch(error){
        if (error.name === "ValidationError"){
            return res.status(400).json({error: error.message})
        }
        console.log(error)
        return res.status(500).json({error: "Erro interno do servidor"})
    }
}

const loginUsuario = async(req, res) =>{
    try{
        const {email, senha} = req.body
        if(!email || !senha){
            return res.status(400).json({error: "Email e senha sao obrigatorios"})
        }
        const usuario = await usuarioService.getUsuarioByEmail(email)
        if (!usuario){
            return res.status(404).json({error: "Usuario não encontrado"})
        }
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha)
        if(!senhaCorreta){
            //401 unauthorized: credenciais invalidas
            return res.status(401).json({error: "Senha Invalida"})
        }
        jwt.sign(
            // foi colocado diferentes perfil no usuario (admin/ consumidor)
            {id: usuario._id, email: usuario.email, perfil: usuario.perfil},
            //foi protegido o JWT_SECRET no .env
            process.env.JWT_SECRET,
            {expiresIn: "24h"},
            (err, token) => {
                if (err){
                    return res.status(500).json({error : "Erro ao criar o token"})
                }
                return res.status(200).json({token})
            }
        )
    }catch(error){
        console.log(error)
        res.status(500).json({error: "Erro interno do servidor"})
    }
}

const getUsuarioById = async (req,res) =>{
    const id= req.params.id
    try{
        if(!ObjectId.isValid(id)){
            return res.status(400).json({error: "Id invalido"})
        }
        const usuario = await usuarioService.getUsuarioById(id)
        if(!usuario){
            return res.status(404).json({error :"Usuario não encontrado"})
        }
        return res.status(200).json({usuario})
    }catch(error){
        console.log(error)
        return res.status(500).json({error: "Erro interno do servidor"})
    }
}
const updateUsuario = async (req, res) =>{
    const id = req.params.id
    const {nome, email, senha} = req.body
    try{
        if (!ObjectId.isValid(id)){
            return res.status(400).json({error: "Id invalido"})
        }
        const usuario = await usuarioService.updateUsuario(id, nome, email, senha)
        if (!usuario){
            return res.status(404).json({error: "Usuario nao encontrado"})
        }
        return res.status(200).json({usuario})
    }catch(error){
        // cast error é quando a tipagem fornecida esta diferente do que esta no model
        if(error.name === "ValidationError" || error.name === "CastError"){
            return res.status(400).json({error: error.message})
        }
        console.log(error)
        return res.status(500).json({error: "Erro interno do servidor"})
    }
}
const deleteUsuario = async (req,res) =>{
    const id = req.params.id
    try{
        if(!ObjectId.isValid(id)){
            return res.status(400).json({error : "Id invalido"})
        }
        const usuario = await usuarioService.deleteUsuario(id)
        if(!usuario){
            return res.status(404).json({error: "Usuario nao Encontrado"})
        }
        return res.sendStatus(204)
    }catch(error){
        console.log(error)
        return res.status(500).json({error : "Erro interno no Servidor"})
    }
}

export default { createUsuario, loginUsuario, getUsuarioById, updateUsuario, deleteUsuario }



