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

    async create(nome, cidadeNatal, nascimento, morte){
        try{
            const novoArtista= new Artista({nome, cidadeNatal, nascimento, morte})
            await novoArtista.save()
            return novoArtista
        }catch(error){
            console.log(error)
            throw error
        }
    }
}

export default new artistaService()