import Obra from "../models/Obras.js"


class obraService{
    async getAll(){
        try{
            const obras = await Obra.find();
            console.log(Obra.collection.name)
            console.log(obras.length)
            return obras
        } catch(error){
            console.log(error);
        }
    }
}

export default new obraService();
