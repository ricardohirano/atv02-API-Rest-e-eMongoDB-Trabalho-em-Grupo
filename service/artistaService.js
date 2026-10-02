import Artista from "../models/Artistas.js"

class artistaService{
    async getArtistas(){
        try{
            const artistas = await Artista.find()
            return artistas
        }catch(error){
            console.log(error)
            throw error
        }
    }

    async getArtistaById(id){
        try{
            const artista = await Artista.findOne({_id: id})
            return artista
        }catch(error){
            console.log(error)
            throw error
        }
    }
}

export default new artistaService()