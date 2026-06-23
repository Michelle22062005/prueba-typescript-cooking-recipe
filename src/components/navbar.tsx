import { Button } from "@heroui/react"
import Link from "next/link"
import { ShoppingCart, TrashBin } from '@gravity-ui/icons';
import { useRouter } from "next/navigation";
//import { useAuth } from "@/src/context/AuthContext";
import { signOut, useSession } from "next-auth/react";



export const NavbarHome = () => {
  const { data: session } = useSession();
  const router = useRouter()

  const login = () => {
    router.push("/login")
  }
  const shopping = () => {
    if (!session) {
      alert("Debes iniciar sesion primero para acceder al carrito");
      return;
    }
    router.push("/shopping");
  };
  return (
    <nav className="flex items-center justify-between px-10 py-3 bg-[#f3cdaf] border-b border-gray-200">
      {/* Logo */}
      <div>
        <h1 className="text-3xl font-bold text-blue-700">
          COOKING RECIPE-DM
        </h1>
      </div>

      {/* Menú */}
      <ul className="flex gap-10 text-gray-600 font-medium">
        <li>
          <Link
            href="/"
            className="text-blue-600 border-b-2 border-blue-600 pb-1"
          >
            Catalog
          </Link>
        </li>
        <li>
          <Link href="/favorites">Favorite</Link>
        </li>
      </ul>

      {/* Acciones */}
      <div className="flex items-center gap-6">

        {session ? (
          <div className="flex items-center gap-4">
            <span className="text-black"> {session.user?.name}</span>
            <Button isIconOnly variant="danger" onClick={() => signOut({ callbackUrl: "/" })}>Logout
            </Button>
          </div>
        ) : (
          <Button onPress={login}>Login</Button>
        )}
      </div>
    </nav>

  )
}