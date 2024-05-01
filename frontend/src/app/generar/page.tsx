"use client";
import React, { useState, useEffect } from "react";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react"
import { FormEvent } from "react";
import { useToast } from "@/components/ui/use-toast"

export default function Generar() {
  const { toast } = useToast();
  const cookies = useCookies();
  const [loading, setLoading] = useState(true);
  const [jwt, setJwt] = useState("");

  const router = useRouter();

  useEffect(() => {
    const _cookiesToken = cookies.get("token");
    if (_cookiesToken) {
      setJwt(_cookiesToken);
      setLoading(false);
    } else {
      router.push("/");
    }
  }, [cookies]);

  if (loading) {
    return (
      <div className="flex content-center justify-center">
        <h1 className="font-extrabold text-2xl text-blue-950">Cargando...</h1>
      </div>
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const company = formData.get("company");
    const vacancy = formData.get("vacancy");
    const medium = formData.get("medium");
    const subject = formData.get("subject");
    const expirationDate = formData.get("expirationDate");
    const expirationTime = formData.get("expirationTime");
    const generatedBy = cookies.get("token");
    console.log("generatedBy", generatedBy);

    const response = await fetch("http://localhost:9000/api/codes/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ company, vacancy, medium, subject, expirationDate, expirationTime, generatedBy }),
    });

    if (response.ok) {
      toast({
        title: "Generacion de codigo exitoso"
      })
      const data = await response.json();
     
    } else {
      // Handle errors
      console.log(response);
      toast({
        title: "Error al generar codigo",
        description: "Por favor, verifica tus datos",
        variant: "destructive",
      })
      setLoading(false);
    }
  }

  return (
    <div className="flex content-center justify-center flex-col items-center">
      <h1 className="font-extrabold text-4xl text-blue-950 mb-5">
        Genera tu codigo
      </h1>

          <form className="bg-slate-100 p-10 flex justify-between flex-col rounded-sm max-w-md w-11/12" onSubmit={handleSubmit}>
            <div className="space-y-4  ">
              <div>
                <label htmlFor="company">Empresa: </label>
                <Input type="text" name="company" id="company" />
              </div>

              <div>
                <label htmlFor="vacancy">Vacante: </label>
                <Input type="text" name="vacancy" id="vacancy" />
              </div>

              <div>
                <label htmlFor="subject">Asunto: </label>
                <Input type="text" name="medium" id="medium" />
              </div>

              <div>
                <label htmlFor="medium">Medio de comunicación: </label>
                <Input type="text" name="subject" id="subject" />
              </div>

              <div>
                <label htmlFor="expirationDate">Fecha de expiración: </label>
                <Input type="date" name="expirationDate" id="expirationDate" />
              </div>

              <div>
                <label htmlFor="expirationTime">Hora de expiración: </label>
                <Input type="time" name="expirationTime" id="expirationTime" />
              </div>

              <Button type="submit" disabled={loading}>
                {loading ? <Loader2 size={24} /> : null}
                {loading ? "Cargando..." : "Generar código"}
              </Button>

            </div>
          </form>


    </div>
  );
}
