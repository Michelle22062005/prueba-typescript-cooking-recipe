import { Schema, model, Model,Document  } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}
const UserSchema = new Schema<IUser>({
    name:{
        type:String,
        required:[true, "The name is required"]
    },
    email:{
        type:String,
        required:[true, "The email is requiered"]
    },
    password:{
        type:String,
        required:[true,"The password is required"]
    },
    createdAt: {
        type:Date,
    },
});
export let User:Model<IUser>;
try{
    User=model<IUser>("users")
}catch(error){
    User=model<IUser>("users", UserSchema)
}
export default UserSchema