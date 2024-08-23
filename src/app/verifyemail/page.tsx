"use client"
import axios from "axios"
import Link from "next/link"
import React, { useState, useEffect } from "react"


export default function verifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyToken", { token })
            setVerified(true);
        } catch (error: any) {
            setError(true);
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, [])

    useEffect(() => {
        if (token.length > 0) verifyUserEmail();
    }, [token])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Verify your Email</h1>
            <h2 className="p-2 bg-orange-500 text-black rounded-md mt-3">{
                token ? `${token}` : "no token"
            }</h2>
            {
                verified && (
                    <div className="bg-green-500 p-2 text-white">
                        <p>Email verified successfully!</p>
                        <Link href={"/login"}>Login</Link>
                    </div>
                )
            }
            {
                error && (
                    <div className="bg-green-500 p-2 text-white">
                        <p className="text-2xl bg-red-500 text-black">Error</p>
                    </div>
                )
            }
        </div>
    );
}