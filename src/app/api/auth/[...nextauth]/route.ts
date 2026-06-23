import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { conectionDB } from "@/src/lib/database";
import { User } from "@/src/database/models/user";
import bcrypt from "bcryptjs";

const handler = NextAuth({
    providers:[
        //Proveedor GitHub
        GitHubProvider({
            clientId:process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials:{
                email:{ label:"Email", type: "text"},
                password:{ label:"Password", type: "password"},
            },
            async authorize(credentials){

                const user = await authenticateUser(
                    credentials?.email,
                    credentials?.password
                );
                if(user){
                    return { id: user.id, name:user.name, email: user.email}
                }else{
                    throw new Error("Invalid email or password")
                }
            },
        }),
    ],

    //Callbacks: personaliza token y sesion
    callbacks:{
        async jwt({token, user}) {
            if(user){
                token.id = user.id;
                token.name =user.name;
                token.email = user.email
            }
            return token
        },
        async session({ session, token}) {
            if(token && session.user){
                session.user.id = token.id as string
                session.user.name = token.name as string;
                session.user.email = token.email as string
            }
            return session
        },
    },
    //Configuracion general
    secret: process.env.NEXTAUTH_SECRET,
    session:{
        strategy:"jwt"
    },
    pages:{
        signIn:"/login",
        error:"/login"
    },
});

export { handler as GET, handler as POST};
async function authenticateUser(email?: string, password?: string) {
  if (!email || !password) return null;

  await conectionDB();
  const user = await User.findOne({ email });
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  return { id: user._id.toString(), name: user.name, email: user.email };
}