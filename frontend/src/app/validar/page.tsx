"use client";
import React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/components/ui/use-toast";

export default function Validar() {
  const { toast } = useToast();

  const onCompleteOtp = (otp: string) => {
    toast({
      title: "Código en proceso de verificación",
      description: "Tu codigo fue: " + otp,
    });
  };
  return (
    <div className="min-h-screen">
      <div className="flex flex-col justify-center content-center items-center">
        <h1 className="font-extrabold text-blue-950 text-4xl text-center my-10">
          Verifica facilmente nuestrosafdsdfs canales de comunicación
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
      </div>
    </div>
  );
}
