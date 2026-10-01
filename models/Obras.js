//Importação da biblioteca Mongoose
import mongoose from "mongoose"


const acervoSchema = new mongoose.Schema({
    instituicao: { type: String, required: [true, "A instituição do acervo é obrigatória"] },
    localizacao: String,
    formaAquisicao: String,
    anoAquisicao: Number
})
//Criação do Schema: define a estrutura dos documentos da coleção
const obraSchema = new mongoose.Schema({
  titulo: { type: String, required: [true, "O título é obrigatório"] },
  tecnica: String,
  movimento: String,
  imagem: String, // guardamos só o endereço  web da imagem, não o arquivo
  ano: { type: Number, required: [true, "O ano é obrigatório"] },
  artistaId: { type: mongoose.Schema.Types.ObjectId, required: [true, "O artista é obrigatório"] }, // referência ao artista (coleção separada)
  acervo: acervoSchema
})


// Criação do model: o Mongoose cria a coleção "obras" no banco
const Obra = mongoose.model("Obra", obraSchema)

//Exportação do módulo
export default Obra
