import Obra from "../models/Obras.js"


class obraService{
    async getAll(){
        try{
            const obras = await Obra.find();

            return obras
        } catch(error){
            console.log(error);
            throw error
        }
    }
    async getObraById(id){
        try{
            const obra = await Obra.findOne({_id:id})
            return obra
        } catch(error){
            console.log(error)
            throw error
        }
    }
}

export default new obraService();
