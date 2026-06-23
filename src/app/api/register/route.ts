import { conectionDB } from "@/src/lib/database";
import { User } from "@/src/database/models/user";
import bcrypt from "bcryptjs";

export async function GET() {
    try {
        await conectionDB();
        const data = await User.find().select("-password -__v")

        return Response.json({
            data: data,
            code: 200,
            message: "El servicio contesto"
        })
    } catch (error) {
        console.error("Error en el GET", error)
        return Response.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        )
    }
}

export async function POST(req:Request){
    try{
        await conectionDB();
        const body = await req.json();
        console.log("BODY RECIBIDO", body)
        const hashedPassword = await bcrypt.hash(body.password, 10)
        const newUser=await User.create({
           
            name:body.name,
            email:body.email,
            password:hashedPassword
        })



        return Response.json({
            data:newUser,
            code:200,
            message:"El usuario fue creado correctamente"
        })
    }catch(error){
         console.error("[POST /register]", error);
        return Response.json({error:"Error al crear el usuario"},{status:500})
    }
}