import Obra from "../models/Obras.js"


class obraService{
    async getObras(){
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

    async create(titulo, tecnica, movimento, imagem, ano, artistaId, acervo){
    try{
        const novaObra = new Obra({titulo, tecnica, movimento, imagem, ano, artistaId, acervo })
        await novaObra.save()
        return novaObra        
    } catch(error){
        console.log(error)
        throw error
    }    
    }

    async update(id, titulo, tecnica, movimento, imagem, ano, artistaId, acervo){
        try{
            const obraAtualizada = await Obra.findByIdAndUpdate(id, {titulo, tecnica, movimento, imagem, ano, artistaId, acervo}, {new:true, runValidators: true})
            return obraAtualizada
        } catch(error){
            console.log(error)
            throw error
        }

    }
    
    async delete(id){
        try{
            const obraDeletada = await Obra.findByIdAndDelete(id)
            return obraDeletada
        } catch(error){
            console.log(error)
            throw error
        }
    }
}

export default new obraService();
