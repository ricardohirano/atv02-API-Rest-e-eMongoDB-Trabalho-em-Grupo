import jwt from "jsonwebtoken"

const Authorization = (req, res, next) =>{
    const authToken = req.headers["authorization"]

    if(authToken != undefined){
        const bearer = authToken.split(" ")
        const token = bearer[1]
        //o JWT esta criado no .env em vez direto no controller
        jwt.verify(token, process.env.JWT_SECRET, (err, data)=>{
            if(err){
                res.status(401)
                res.json({error : "Token invalido"})
            } else {
                req.token = token
                req.loggeduser = {id: data.id, email: data.email, perfil: data.perfil }
                next()
            }
        })
    } else {
        res.status(401)
        res.json({ error: "Token não informado" })
    }
}


const Admin = (req, res, next) =>{
    if(req.loggeduser?.perfil !== "admin"){
        return res.status(403).json({error: "Acesso negado: apenas administradores"}
        )
    }
    next()
}

export default {Authorization, Admin}