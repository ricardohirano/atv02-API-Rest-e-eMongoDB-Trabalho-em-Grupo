import mongoose from "mongoose"

const artistaSchema = new mongoose.Schema({
    nome: {type: String, required : [ true, "O nome é obrigatorio"]
    },
    cidadeNatal : String,
    nascimento: Date,
    morte: Date 
})

const artista = mongoose.model("Artista", artistaSchema)

export default artista