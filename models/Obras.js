//Importação da biblioteca Mongoose
import mongoose from "mongoose"

//Criação do Schema: define a estrutura dos documentos da coleção
const obraSchema = new mongoose.Schema({
  titulo: String,
  tecnica: String,
  movimento: String,
  imagem: String, // guardamos só o endereço  web da imagem, não o arquivo
  ano: Number,
  artistaId: mongoose.Schema.Types.ObjectId, // referência ao artista (coleção separada)
})

// Criação do model: o Mongoose cria a coleção "obras" no banco
const Obra = mongoose.model("Obra", obraSchema)

//Exportação do módulo
export default Obra
