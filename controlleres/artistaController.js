import artistaService from "../service/artistaService.js"
import {ObjectId} from "mongodb"

const getArtistas = async (req, res) => {
    try{
        const artistas = await artistaService.getArtistas()
        res.status(200).json({artistas})
    }catch(error){
        console.log(error)
        res.status(500).json({error : "Erro interno no servidor"})
    }
}
const getArtistaById = async (req, res) => {
    const id = req.params.id
    try{
        if(ObjectId.isValid(id)){
            const artista = await artistaService.getArtistaById(id)
            if(!artista){
                res.status(404).json({error : "Artista não encontrado"})
            }else{
                res.status(200).json({artista})
            }
        }else{
            res.status(400).json({error : "ID invalido"})
        }        
    }catch(error){
        console.log(error)
        res.status(500).json({error : "Error interno do servidor"})
    }
}
const createArtista = async (req,res) =>{
    const {nome, cidadeNatal, nascimento, morte} = req.body
    try{
        const artista = await artistaService.create(nome, cidadeNatal, nascimento, morte)
        res.status(201).json({artista})
    }catch(error){
        if(error.name === "ValidationError" || error.name === "CastError"){
            return res.status(400).json({error : error.message})
        }
        console.log(error)
        res.status(500).json({error: "Erro interno do servidor"})
    }
}
const updateArtista = async (req,res) =>{
    const id = req.params.id
    try{
        const artista = await artistaService.update(id, nome, cidadeNatal, nascimento, morte)
        if(!artista){
            res.status(404).json({ error : "Artista não encontrado"})
        }else{
            res.status(200).json({artista})
        }
    }catch(error){
        if(error.name === "ValidationError" || error.name === "CastError"){
            res.status(400).json({error : error.message})
        }
        console.log(error)
        res.status(500).json({error : "Erro interno do servidor"})
    }
}
export default {getArtistas, getArtistaById, createArtista, updateArtista }