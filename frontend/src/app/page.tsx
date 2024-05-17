"use client";
import { useState } from "react";
import Image from "next/image";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

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
      console.log(data);
    } catch (error) {
      setLoading(false);
      console.log("Error al verificar el código");
    }
  };

  return (
    <main>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12 items-center">
            <Image
              className=" dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
              src="/logo.svg"
              alt="Next.js Logo"
              width={500}
              height={500}
              priority
            />
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Vérifica fácilmente nuestros canales de comunicación
            </p>
          </div>
          <div className="flex items-center justify-center ">
            <div className="mb-4">
              <InputOTP
                maxLength={6}
                onComplete={onCompleteOtp}
                disabled={loading}
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
          </div>
          <div className="flex flex-col justify-center text-center items-center">
            <p className="text-xs text-gray-600">
              Ingresa el código de 6 digitos que te compartió nuestro asesor.
            </p>

            {tokenInfo && (
              <div className="bg-white p-4 rounded-md shadow-md w-80 mt-8">
                <p className="text-blue-950 font-bold">
                  Empresa: {tokenInfo.company}
                </p>
                <p className="text-blue-950 font-bold">
                  Vacante: {tokenInfo.vacancy}
                </p>
                <p className="text-blue-950 font-bold">
                  Asunto: {tokenInfo.subject}
                </p>
                <p className="text-blue-950 font-bold">
                  Medio de comunicación: {tokenInfo.medium}
                </p>
                <p className="text-blue-950 font-bold">
                  Generado por: {tokenInfo.generatedBy}
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
      </section>
    </main>
  );
}
