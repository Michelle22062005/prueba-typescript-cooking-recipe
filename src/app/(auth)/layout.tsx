"use client"
import { SessionProvider, useSession, signOut } from "next-auth/react"
import { ReactNode } from "react"
import { useRouter } from "next/navigation"

interface AuthLayoutProps{
    children: ReactNode
}

function Navbar (){
    const {data: session} = useSession();
    const router = useRouter();

    const handleSignOut = async () =>{
        await signOut({ redirect: false})
        router.push("/login")
    };

    return(
        <nav>
            <ul>
                {session ? (
                    <>
                    <li>Welcome, {session.user?.name}</li>
                    <li>
                    <button onClick={handleSignOut}>Sign out</button>
                    </li>
                    </>
                ): (
                    <li>
                        <a href="/login">Login</a>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default function AuthLayout({ children}: AuthLayoutProps){
    return(
        <SessionProvider>
            <Navbar/>
            <main>{children}</main>
        </SessionProvider>
    )
}