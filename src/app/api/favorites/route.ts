import { Favorite } from "@/src/database/models/favorite";
import { conectionDB } from "@/src/lib/database";


await conectionDB();

export async function GET(req: Request){
    try{
        const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId")

     if (!userId) {
      return Response.json({ error: "userId es requerido", data:[] }, { status: 400 });
    }

    const data = await  Favorite.find({ userId}).populate("recipeId");
    return Response.json({
        data:data || [],
        code:200,
        message:"El servicio contesto"
    })

    }catch (error) {
    console.error(error);
    return Response.json(
      { error: "Error interno del servidor", data:[] },
      { status: 500 }
    );
  }
}

export async function POST(req:Request){
    try{

        const body= await req.json();
        const {userId, recipeId} = body;

        if(!userId || !recipeId ){
            return Response.json(
                {error:"Error al guardar las recetas favoritos"},
                {status:400}
            )
        }
        const alreadyExists = await Favorite.findOne({ userId, recipeId });
        if (alreadyExists) {
            return Response.json({
                data: alreadyExists,
                code: 200,
                message: "La receta ya está en tus favoritos"
            }, { status: 200 });
        }
        const favorite = await Favorite.create({userId, recipeId, savedAt: new Date()});
        return Response.json({
            data:favorite,
            code: 201,
            message: "Registro de favorito guardado"
        },{status:201});

    }catch(error){
        console.error(error);
        return Response.json(
            {error: "Error interno del servidor"},
            {status: 500}
        )
    }
}

export async function DELETE (req: Request){
    try{
        const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const recipeId = searchParams.get("recipeId");
        if (!userId || !recipeId) {
      return Response.json(
        { error: "Faltan datos requeridos" },
        { status: 400 }
      );
    }

        //const {_id} = await req.json()
        await Favorite.deleteOne({userId, recipeId})
        return Response.json({
            code:200, message:"Receta favorito eleminado"
        })

    }catch(error){
        console.error(error)
        return Response.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
    }
}