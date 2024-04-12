"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useCookies } from 'next-client-cookies';

export default function Home() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const cookies = useCookies();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("Password");

    const response = await fetch("http://localhost:9000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido a HireSecure",
      })

      const data = await response.json();

      cookies.set("token", data.token);
      router.push("/generar");
    } else {
      // Handle errors
      toast({
        title: "Error al iniciar sesión",
        description: "Por favor, verifica tus datos",
        variant: "destructive",
      })
      setLoading(false);
    }
  }
  return (
    <form className="flex justify-between  min-h-screen items-center" onSubmit={handleSubmit}>
      <div className="">
        <h1 className="text-6xl text-blue-950 font-extrabold">
          Bienvenido a HireSecure
        </h1>
      </div>
      <div className="bg-slate-100 p-10 flex justify-between flex-col rounded-sm h-96" >
        <p className="font-bold text-xl text-blue-950">Ingresa tus datos</p>

        <div className="space-y-4">
          <Input placeholder="Correo" className="w-96" name="email" required type="email"/>
          <Input placeholder="Contraseña" type="password" name="Password" required/>
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? <Loader2 size={24} /> : null}
          {loading ? "Cargando..." : "Ingresar"}
        </Button>
      </div>
    </form>
  );
}
