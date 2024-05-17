"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Home() {
  interface TokenInfoType {
    company: string;
    vacancy: string;
    subject: string;
    medium: string;
    generatedBy: string;
  }

  const [loading, setLoading] = useState(false);
  const [tokenInfo, setTokenInfo] = useState<TokenInfoType | null>(null);
  const [error, setError] = useState(false);
  const [reports, setReports] = useState<
    {
      description: string;
      assets: string[];
      platform: string;
      createdBy: string;
      createdAt: string;
      _id: string;
    }[]
  >([]);
  const [loadingReports, setLoadingReports] = useState(true);

  useEffect(() => {
    getReports();
  }, []);

  const onCompleteOtp = async (otp: string) => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:9000/api/codes/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: otp }),
      });

      if (!response.ok) {
        console.log("Error al verificar el código");
        setError(true);
        setLoading(false);
        return;
      }

      const data = await response.json();
      setTokenInfo(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error al verificar el código");
    }
  };

  const getReports = async () => {
    const response = await fetch("http://localhost:9000/api/report/verified", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      console.log("Error al verificar el código");
      setLoadingReports(false);
      return;
    }

    const data = await response.json();
    setReports(data.reports);
  };

  const renderReports = () => {
    if (loadingReports) {
      <div>
        <p>Cargando reportes...</p>
      </div>;
    }

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
              <DialogTrigger className="m-4 md:w-1/6">
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
                        Más información
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
                    className="rounded-md"
                  />
                </DialogDescription>
              </DialogContent>
            </Dialog>
          );
        })}
      </div>
    );
  };

  return (
    <main>
      <section className="text-gray-600 body-font">
        <div className="container mb-9 mx-auto flex justify-between ">
          <div className="flex flex-col text-center w-full items-start">
            <Image
              className=" dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert "
              src="/asset2.svg"
              alt="Next.js Logo"
              width={500}
              height={500}
              priority
            />
          </div>
          <div className="flex flex-col items-center justify-center w-full">
            <p className="lg:w-2/3 mx-auto leading-relaxed mb-4 text-2xl font-bold text-center text-[#090467]">
              Vérifica fácilmente nuestros canales de comunicación
            </p>
            <div className="mb-4">
              <InputOTP
                maxLength={6}
                onComplete={onCompleteOtp}
                disabled={loading}
                onChange={() => {
                  setTokenInfo(null);
                }}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="bg-sky-50" />
                </InputOTPGroup>
                <InputOTPGroup>
                  <InputOTPSlot index={1} className="bg-sky-50" />
                </InputOTPGroup>
                <InputOTPGroup>
                  <InputOTPSlot index={2} className="bg-sky-50" />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} className="bg-sky-50" />
                </InputOTPGroup>
                <InputOTPGroup>
                  <InputOTPSlot index={4} className="bg-sky-50" />
                </InputOTPGroup>
                <InputOTPGroup>
                  <InputOTPSlot index={5} className="bg-sky-50" />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <p className="text-xs text-gray-600">
              Ingresa el código de 6 digitos que te compartió nuestro asesor.
            </p>
            <div className="flex flex-col justify-center text-center items-center">
              {tokenInfo && (
                <div className="bg-white p-4 rounded-md shadow-md w-80 mt-8">
                  <p className="text-blue-950 ">
                    <span className="font-bold">Empresa:</span>{" "}
                    {tokenInfo.company}
                  </p>
                  <p className="text-blue-950 ">
                    <span className="font-bold">Vacante:</span>{" "}
                    {tokenInfo.vacancy}
                  </p>
                  <p className="text-blue-950">
                    <span className="font-bold">Asunto:</span>{" "}
                    {tokenInfo.subject}
                  </p>
                  <p className="text-blue-950">
                    <span className="font-bold">Medio de comunicación:</span>{" "}
                    {tokenInfo.medium}
                  </p>
                  <p className="text-blue-950 ">
                    <span className="font-bold">Generado por:</span>{" "}
                    {tokenInfo.generatedBy}
                  </p>
                </div>
              )}

              {error && (
                <p className="text-red-500 mt-8">
                  La información del token no fue encontrada
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="bg-[#F1F9FD] p-4 rounded-md mb-10">
          <h1 className="text-5xl font-bold text-[#090467] my-6 pl-4">
            ¿Cómo funciona?
          </h1>

          <ol type="1" className="my-4 max-w-md pl-4 space-y-2">
            <li>
              1. <span className="font-bold text-[#00DF98]">Generamos</span>{" "}
              códigos únicos cada vez que nos comunicamos contigo
            </li>
            <li>
              2. Cuando generamos un código,{" "}
              <span className="font-bold text-[#00DF98]">
                incluimos información
              </span>{" "}
              de nuestro asesor, medio de contácto y más.
            </li>
            <li>
              3. Una vez consultas un código,{" "}
              <span className="font-bold text-[#00DF98]">no puede</span> volver
              a ser usado. Así evitamos que sean usados por personas mal
              intencionadas
            </li>
          </ol>
        </div>
        <Image
          src="/asset1.png"
          alt="hand"
          width={200}
          height={200}
          className="absolute bottom-0 right-0 overflow-hidden rounded-md"
        />
      </section>
      <section>
        <h1 className="text-xl font-bold">Los ultimos reportes de fraude</h1>
        {renderReports()}
      </section>
    </main>
  );
}
