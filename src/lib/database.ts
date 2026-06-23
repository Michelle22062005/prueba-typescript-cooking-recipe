import mongoose from "mongoose"

export const conectionDB = async () => {
    try{
        const DBConection = process.env.DATABASE;
        await mongoose.connect(`${DBConection}`)

    }catch(error){
        console.error(error)
    }
}

