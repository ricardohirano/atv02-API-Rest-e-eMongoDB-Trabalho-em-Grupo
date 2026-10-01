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

export default {getAllObras, getObraById};
