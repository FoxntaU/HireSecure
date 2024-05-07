"use client";
import React from "react";
import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/components/ui/use-toast";

export default function Validar() {
  const { toast } = useToast();
  
  interface TokenInfoType {
    company: string;
    vacancy: string;
    subject: string;
    medium: string;
    generatedBy: string;
  }
  
  const [tokenInfo, setTokenInfo] = useState<TokenInfoType | null>(null);
  const [error, setError] = useState(false);

  const onCompleteOtp = async (otp: string) => {
    toast({
      title: "Código en proceso de verificación",
      description: "Tu codigo fue: " + otp,
    });

    try {
      const response = await fetch("http://localhost:9000/api/codes/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: otp }),
      });

      if (!response.ok) {
        console.log("Error al verificar el código")
        setError(true);
        return;
      }

      const data = await response.json();
      setTokenInfo(data);
      console.log(data);
    } catch (error) {
      console.log("Error al verificar el código")
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex flex-col justify-center content-center items-center">
        <h1 className="font-extrabold text-blue-950 text-4xl text-center my-10">
          Verifica facilmente nuestros canales de comunicación
        </h1>
        <div className="mb-4">
          <InputOTP maxLength={6} onComplete={onCompleteOtp}>
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

        {tokenInfo && (
          <div className="bg-white p-4 rounded-md shadow-md w-80 mt-8">
            <p className="text-blue-950 font-bold">Empresa: {tokenInfo.company}</p>
            <p className="text-blue-950 font-bold">Vacante: {tokenInfo.vacancy}</p>
            <p className="text-blue-950 font-bold">Asunto: {tokenInfo.subject}</p>
            <p className="text-blue-950 font-bold">Medio de comunicación: {tokenInfo.medium}</p>
            <p className="text-blue-950 font-bold">Generado por: {tokenInfo.generatedBy}</p>
          </div>
        ) }

        {error && (
          <p className="text-red-500 mt-8">La información del token no fue encontrada</p>
        )}


      </div>
    </div>
  );
}
