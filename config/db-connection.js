import "dotenv/config"
import mongoose from "mongoose"


const connect = () =>{
    mongoose.connect( process.env.MONGO_URI)
    const connection = mongoose.connection;
    connection.on("error", () => {
        console.log("Erro ao conectar com o mongoDB.")
        })
    connection.on("open", () => {
        console.log("Conectado ao mongoDB com sucesso")
    })
}
connect()

export default mongoose;