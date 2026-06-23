import { Recipe } from "@/src/database/models/recipe";
import { conectionDB } from "@/src/lib/database";

export async function GET(
    request:Request,
    {params}:{ params:Promise<{_id:string}>}
){
    try{
        await conectionDB();
        const {_id} = await params
        const data = await Recipe.findById(_id).lean();
        console.log("Resultado: ",data);

        return Response.json({
            data:{
                ...data,
                _id:data?._id.toString()
            },
            code:200,
            message:"El servidor contesto"
        })

    }catch(error){
        console.error(error)
    }

}