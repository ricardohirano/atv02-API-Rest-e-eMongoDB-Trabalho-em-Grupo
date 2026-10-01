import obraService from "../service/obraService.js"
import {ObjectId} from "mongodb"

const getAllObras = async (req,res) => {
    try{
        const obras = await obraService.getAll();
        res.status(200).json({obras : obras})
    } catch (error){
        console.log(error)
        res.status(500).json({
            error : "Erro interno do Servidor"
        })
    }
}

const getObraById = async (req,res) =>{
    try{
        const id = req.params.id
        if(ObjectId.isValid(id)){
            const obra = await obraService.getObraById(id)
            if(!obra){
                res.status(404).json({error : "Obra não encontrada"})
            }else{
                res.status(200).json({obra})
            }
            
        }else{
            res.status(400).json({error : "ID invalido"})
        }
    } catch(error){
        console.log(error)
        res.status(500).json({error : "Erro interno do servidor"})
    }
}

const createObra = async(req,res) => {
    try{
        const{titulo, tecnica, movimento, imagem, ano, artistaId, acervo} = req.body
        const obra = await obraService.create(titulo, tecnica, movimento, imagem, ano, artistaId, acervo)
        res.status(201).json({obra})
    }catch (error){
        // verificamento se o erro foi algo no formulario
        if(error.name === "ValidationError"){
            return res.status(400).json({error : error.message })
        }
        console.log(error)
        res.status(500).json({error : "Erro interno do servidor"})
    }
}

const updateObra = async(req,res) => {
    try{
        const id = req.params.id
        if(ObjectId.isValid(id)){
            const {titulo, tecnica, movimento, imagem, ano, artistaId, acervo} = req.body
            const obraAtualizada = await obraService.update(id, titulo, tecnica, movimento, imagem, ano, artistaId, acervo)
            res.status(200).json({obra: obraAtualizada})
        }else{
            res.status(400).json({error : "ID invalido"})
        }
    } catch(error){
        if(error.name === "ValidationError" || error.name === "CastError"){
            return res.status(400).json({error : error.message})
        }
        console.log(error)
        res.status(500).json({error : "Erro interno do servidor"})
    }
}

const deleteObra = async(req,res) => {
    const id = req.params.id
    try{
        if(!ObjectId.isValid(id)){
            return res.status(400).json({error : "ID invalido"})
        }
        const obra = await obraService.delete(id)
        if(!obra){
            return res.status(404).json({error : "Obra não encontrada"})
        }
        res.sendStatus(204)
    } catch(error){
        console.log(error)
        res.status(500).json({error : "Erro interno do servidor"})
    }
}

export default {getAllObras, getObraById, createObra, updateObra, deleteObra};
