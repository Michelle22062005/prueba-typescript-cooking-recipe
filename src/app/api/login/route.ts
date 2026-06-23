import { conectionDB } from "@/src/lib/database";
import { User } from "@/src/database/models/user";
import bcrypt from "bcryptjs";

export async function GET(){
      
    try{
        await conectionDB();
        const datas = await User.find().select("-password -__v");
    console.log(datas)
    return Response.json({
        data:datas,
        code:200,
        message:"el servicion contesto"
    })
    }catch(error){
        console.error("[GET /users]", error);
    return Response.json(      // ← siempre retornar algo
      { error: "Error interno del servidor" },
      { status: 500 }
    );
    }
}

export async function POST(req: Request) {
    try {
        await conectionDB();
        const { email, password } = await req.json();

        if (!email || !password) {
            return Response.json(
                { error: "Email y contraseña son requeridos" },
                { status: 400 }
            );
        }

        // Buscar usuario por email
        const user = await User.findOne({ email });
        if (!user) {
            return Response.json(
                { error: "Credenciales incorrectas" },
                { status: 401 }
            );
        }

        // Comparar contraseña con el hash
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return Response.json(
                { error: "Credenciales incorrectas" },
                { status: 401 }
            );
        }

        return Response.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        });

    } catch (error) {
        console.error("[POST /login]", error);
        return Response.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}