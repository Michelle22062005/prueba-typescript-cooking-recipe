import { conectionDB } from "@/src/lib/database";
import { Recipe } from "@/src/database/models/recipe";

export async function GET() {
    try {
        await conectionDB();
        const data = await Recipe.find();

        return Response.json({
            data: data,
            code: 200,
            message: "El servicio contesto"
        })

    } catch (error) {
        console.error(error)
        return Response.json(      // ← siempre retornar algo
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}