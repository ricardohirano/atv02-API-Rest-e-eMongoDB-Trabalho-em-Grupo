import Usuario from "../models/Usuarios.js"
import bcrypt from "bcryptjs"

class usuarioService {
    
    async create(nome, email, senha){
        try{
            const senhaHash = senha ? await bcrypt.hash(senha, 10) : senha
            const novoUsuario = new Usuario ({nome,email, senha: senhaHash})
            return await novoUsuario.save()
        }catch(error){
            console.log(error)
            throw error
        }
    }
    // procura do usurario pelo email em vez a ID
    async getUsuarioByEmail(email){
        try{
            return await Usuario.findOne({email})
        }catch(error){
            console.log(error)
            throw error
        }
    }      

    async getUsuarioById(id){
        try{
            // seleciona o usuasrio mais nao mostra a senha mesmo que esteja protegida pelo hash do bycrpt
            return await Usuario.findById(id).select("-senha")
        }catch(error){
            console.log(error)
            throw error
        }
    }

    async updateUsuario(id, nome, email, senha){
        try{
            const senhaHash = senha ? await bcrypt.hash(senha, 10) : senha
            return await Usuario.findByIdAndUpdate(
            id,
            {nome, email,senha : senhaHash},
            { new: true, runValidators: true}             
            ).select("-senha")
        }catch(error){
            console.log(error)
            throw error
        }
    }

    async deleteUsuario(id){
        try{
            return await Usuario.findByIdAndDelete(id)
        }catch(error){
            console.log(error)
            throw error
        }
    }

}

export default new usuarioService()