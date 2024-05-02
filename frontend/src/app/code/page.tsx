"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from 'next/navigation';

export default function Code() {
    const router = useRouter();
    const [token, setToken] = useState('');
    const searchParams = useSearchParams();
    useEffect(() => {
        setToken(searchParams.get('token') || "" )
    }, [searchParams])
    return (
        <div className="flex  justify-center h-screen">
            <div className="text-center">
                <h1 className="text-xl text-blue-950 font-extrabold max-w-lg mb-5">Tu código es</h1>
                <p className="text-2xl shadow border-500 p-4 rounded" style={{ color: 'rgb(111, 236, 211)' }}>{token ? <p>{token}</p> : <p>Cargando...</p>}</p>
            </div>
        </div>

    );
}
