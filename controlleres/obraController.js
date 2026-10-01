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

export default {getAllObras, getObraById, createObra};
