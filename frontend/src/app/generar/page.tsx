"use client";
import React, { useState, useEffect } from "react";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { FormEvent } from "react";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Generar() {
  const { toast } = useToast();
  const cookies = useCookies();
  const [loading, setLoading] = useState(true);
  const [jwt, setJwt] = useState("");
  const [code, setCode] = useState<string | null>();
  const router = useRouter();
  const [reports, setReports] = useState<
    {
      description: string;
      assets: string[];
      platform: string;
      createdBy: string;
      createdAt: string;
    }[]
  >([]);

  const [loadingReports, setLoadingReports] = useState(true);

  useEffect(() => {
    const _cookiesToken = cookies.get("token");
    if (_cookiesToken) {
      setJwt(_cookiesToken);
      setLoading(false);
      getReports();
    } else {
      router.push("/");
    }
  }, [cookies]);

  const getReports = async () => {
    const response = await fetch(
      "http://localhost:9000/api/report/unverified",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      console.log("Error al verificar el código");
      setLoadingReports(false);
      return;
    }

    const data = await response.json();

    setReports(data.reports);
  };
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

    const response = await fetch("http://localhost:9000/api/codes/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        company,
        vacancy,
        medium,
        subject,
        expirationDate,
        expirationTime,
        generatedBy,
      }),
    });

    if (response.ok) {
      toast({
        title: "Generacion de codigo exitoso",
      });
      const data = await response.json();
      setCode(data.token);
      // router.push(`/code?token=${data.token}`);
      setLoading(false);
    } else {
      // Handle errors
      console.log(response);
      toast({
        title: "Error al generar codigo",
        description: "Por favor, verifica tus datos",
        variant: "destructive",
      });
      setLoading(false);
    }
  }

  const resetForm = () => {
    setCode(null);
    setLoading(false);
  };

  const renderReports = () => {
    if (reports.length === 0) {
      return (
        <div>
          <p>No hay reportes para mostrar</p>
        </div>
      );
    }

    return (
      <div className="flex">
        {reports.map((item, index) => {
          return (
            <Dialog key={index}>
              <DialogTrigger className="m-4 md:w-1/3">
                <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                  <Image
                    src={decodeURIComponent(item.assets[0])}
                    alt={item.description}
                    width={500}
                    height={200}
                  />
                  <div className="p-6">
                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"></h2>
                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                      Reporte del{" "}
                      {new Intl.DateTimeFormat("es-CO", {
                        dateStyle: "long",
                      }).format(new Date(item.createdAt))}{" "}
                      en {item.platform}
                    </h1>
                    <p className="leading-relaxed mb-3 overflow-hidden whitespace-nowrap text-ellipsis">
                      {item.description}
                    </p>
                    <div className="flex items-center flex-wrap ">
                      <a className="text-green-600 inline-flex items-center md:mb-2 lg:mb-0 ">
                        Verificar
                        <svg
                          className="w-4 h-4 ml-2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>
                  {" "}
                  Reporte del{" "}
                  {new Intl.DateTimeFormat("es-CO", {
                    dateStyle: "long",
                  }).format(new Date(item.createdAt))}{" "}
                  en {item.platform}
                </DialogTitle>
                <DialogDescription>
                  <p>{item.description}</p>
                  <h1 className="text-xl my-2 font-bold">Evidencia</h1>
                  <Image
                    src={decodeURIComponent(item.assets[0])}
                    alt={item.description}
                    width={500}
                    height={200}
                  />
                </DialogDescription>
                <DialogFooter>
                  <Button type="submit" className="bg-red-600">Elminiar</Button>
                  <Button type="submit">Verificar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex justify-between min-h-screen items-center">
      <form
        className="bg-slate-100 p-10 flex justify-between flex-col rounded-sm w-2/6"
        onSubmit={handleSubmit}
      >
        <h1 className="font-extrabold text-4xl text-blue-950 mb-5">
          {code != null ? (
            <h1>Codigo generado correctamente</h1>
          ) : (
            <h1>Generar un nuevo codigo</h1>
          )}
        </h1>
        {code != null ? (
          <div className="space-y-4  ">
            <h1 className="text-5xl font-bold text-green-600">{code}</h1>

            <Button type="submit" disabled={loading} onClick={resetForm}>
              Generar un nuevo codigo
            </Button>
          </div>
        ) : (
          <div>
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
          </div>
        )}
      </form>

      <div className="w-4/6">
        <h1 className="font-bold text-3xl ml-4 text-[#70ECD4]">
          Ultimos reportes
        </h1>
        {renderReports()}
      </div>
    </div>
  );
}
