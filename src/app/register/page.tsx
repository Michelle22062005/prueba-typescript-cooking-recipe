"use client";

import { useAuth } from "@/src/context/AuthContext";
//import { LanguageSelector } from "@/src/components/LanguagesSelector";
//import { useTranslation } from "@/src/context/i18nContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createUser } from "@/src/services/authService";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Swal from "sweetalert2";
import { signIn, useSession } from "next-auth/react";

export default function PageRegister() {
  //const { login } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
 
  const handleSubmit = async () => {
    console.log("ESTADO name:", name); // ← agregar esto
    console.log("ESTADO email:", email);
    console.log("ESTADO password:", password);
    setLoading(true);
    if (name.trim() === "") {
      setError("El nombre es obligatorio");
      return;
    }
    console.log("espacio vacios");
    if (!email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener 6 caracteres");
    }
    try {
      const result = await createUser(name, email, password);
      console.log(result);
      // login({
      //       id: result.data._id,
      //       name: result.data.name,
      //       email: result.data.email,
      //   });
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      console.log(result);
      // if(!result.user)
      await Swal.fire({
        title: "Se registro correctamente",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      router.push("/");
    } catch (error) {
      setError("Error al iniciar sesión");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-md">
        {/* Título */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-gray-900">Bienvenido</h1>
          <p className="mt-3 text-gray-500">Register your account PROD-DM SHOP</p>
      
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl p-10 shadow-sm">
          <Form
            className="flex flex-col gap-6"
            render={(props) => <form {...props} />}

            // onSubmit={onSubmit}
          >
            <Label className="text-gray-600 font-medium">Full name</Label>
            <Input
              placeholder="Pepito Perez"
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
              className="mt-2 h-14 rounded-xl bg-gray-100 border-0"
            />
            <TextField isRequired name="email" type="email">
              <Label className="text-gray-600 font-medium">Email</Label>
              <Input
                placeholder="nombre@ejemplo.com"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 h-14 rounded-xl bg-gray-100 border-0"
              />
              <FieldError />
            </TextField>

            <TextField isRequired name="password" type="password">
              <div className="flex justify-between">
                <Label className="text-gray-600 font-medium">
                  Password
                </Label>

    
              </div>

              <Input
                placeholder="••••••••"
                value={password}
                type="text"
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 h-14 rounded-xl bg-gray-100 border-0"
              />

              <FieldError />
            </TextField>

            <Button
              type="button"
              onClick={handleSubmit}
              isDisabled={loading}
              className="mt-4 h-14 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
            >
              {loading ? "Cargando..." : "Registrarse →"}
            </Button>
            <Button onPress={() => router.push("/login")}>Login</Button>

            {/* Separador */}
            <div className="flex items-center gap-4 my-2">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-sm uppercase text-gray-500">
                or continue with
              </span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* Login social */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                className="h-14 rounded-xl bg-green-50 text-green-700"
              >
                Google
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}