"use client";


import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { signIn, useSession } from "next-auth/react"
import { useSearchParams } from "next/navigation";
//import { useTranslation } from "@/src/context/i18nContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
//import { LanguageSelector } from "@/src/components/LanguagesSelector";


export default function PageLogin() {
    const { status } = useSession()
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")

    const searchParams = useSearchParams();


    useEffect(() => {
        if (status === "authenticated") {
            router.push("/")
        }
    }, [status, router])

    if (status === "loading") return <p>Loading...</p>

    const handleSubmit = async () => {

        if (!email || !password) {
            setError("Todos los campos son obligatorios")
            setLoading(false)
            return
        }
        if (password.length < 6) {
            setError("La contraseña debe tener 6 caracteres")
            setLoading(false)
            return
        }
        setLoading(true);

        try {
            const result = await signIn("credentials", {
                redirect: false,
                email,
                password
            });
            if (result?.error) {
                setError("Error o contraseña incorrectas")
            } else {

                await Swal.fire({
                    title: "Bienvenido",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false
                })
            }
            const returnTo = searchParams.get("returnTo") || "/";
            router.push(returnTo)
        } catch (error) {
            setError("Error al iniciar sesión");
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data: Record<string, string> = {};

        // Convert FormData to plain object
        formData.forEach((value, key) => {
            data[key] = value.toString();
        });

        alert(`Form submitted with: ${JSON.stringify(data, null, 2)}`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center ">
            <div className="w-full max-w-md">
                {/* Título */}
                <div className="text-center mb-10">
                    <h1 className="text-5xl font-bold text-gray-900">
                        Welcome
                    </h1>
                    <p className="mt-3 text-gray-500">
                        Access your account PROD-DM SHOP
                    </p>

                </div>

                {/* Card */}
                <div className="bg-white rounded-3xl p-10 shadow-sm">
                    <Form
                        className="flex flex-col gap-6"
                        render={(props) => <form {...props} />}
                    // onSubmit={onSubmit}
                    >
                        <TextField isRequired name="email" type="email">
                            <Label className="text-gray-600 font-medium">
                                Email
                            </Label>
                            <Input
                                placeholder="nombre@ejemplo.com"
                                value={email}
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-2 h-14 rounded-xl bg-gray-100 border-0"
                            />
                            <FieldError />
                        </TextField>

                        <TextField
                            isRequired
                            name="password"
                            type="password"
                        >
                            <div className="flex justify-between">
                                <Label className="text-gray-600 font-medium">
                                    Password
                                </Label>

                            </div>

                            <Input
                                placeholder="••••••••"
                                value={password}
                                type="password"
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
                            {loading ? "Cargando..." : `  Login→`}

                        </Button>

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
                                onClick={() => signIn("google")}
                            >
                                Google
                            </Button>

                        </div>

                        <p className="text-center text-gray-600 mt-4">
                            {"Don't you have an account?"}{" "}
                            <a
                                href="/register"
                                className="font-semibold text-indigo-600"
                            >
                                Create an account
                            </a>
                        </p>
                    </Form>
                </div>
            </div>
        </div>
    );
}