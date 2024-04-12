"use client";
import React, { useState, useEffect } from "react";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";

export default function Generar() {
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

  return (
    <div className="flex content-center justify-center flex-col items-center">
      <h1 className="font-extrabold text-2xl text-blue-950">
        Genera tu codigo
      </h1>

      <p className="text-xs text-wrap text-slate-200">{jwt}</p>
    </div>
  );
}
