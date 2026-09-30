import obraService from "../service/obraService.js"

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

export default {getAllObras};
