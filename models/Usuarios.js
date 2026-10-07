import mongoose from "mongoose"

const usuarioSchema = new mongoose.Schema({
    nome: { type: String, required: [true, "O nome é obrigatório"] },
    email: { type: String, required: [true, "O e-mail é obrigatório"], unique: true },
    senha: { type: String, required: [true, "A senha é obrigatória"] },
    perfil: { type: String, enum: ["admin", "consumidor"], default: "consumidor" }
})

const Usuario = mongoose.model("Usuario", usuarioSchema)
export default Usuario

