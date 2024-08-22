"use client"
import Link from 'next/link'
import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast';

const Login = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const [buttonDisable, setButtonDisable] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const toLogin = async () => {
        try {
            setLoading(true);
            await axios.post("/api/users/login", user);
            toast.success("Login Success");
            router.push("/profile");
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const isValid = Object.values(user).every((value) => value.length > 0);
        setButtonDisable(!isValid);
    }, [user]);

    return (
        <div className="flex flex-col w-[350px] h-fit gap-3 bg-gray-600 p-5 rounded">
            <h1 className="text-xl font-bold text-center">{
                loading ? <span className='loader2'></span> : "Log in"
            }</h1>
            <input
                type="text"
                placeholder="Email"
                className="p-2 outline-none text-black rounded"
                value={user.email}
                onChange={(e) => {
                    setUser({
                        ...user,
                        email: e.target.value
                    })
                }}
            />
            <input
                type="password"
                placeholder="Password"
                className="p-2 outline-none text-black rounded lowercase placeholder:capitalize"
                value={user.password}
                onChange={(e) => {
                    setUser({
                        ...user,
                        password: e.target.value
                    })
                }}
            />
            <button className="bg-blue-600 rounded py-2 px-4 hover:bg-blue-700 duration-200 disabled:opacity-25 shadow-md" disabled={buttonDisable} onClick={toLogin}>Login</button>

            <hr />
            <Link href={"/signup"}>
                <button className="bg-blue-600 rounded py-2 px-4 w-full  hover:bg-blue-700 duration-200">
                    Sign up
                </button>
            </Link>
            <p className="flex text-xs capitalize justify-end text-blue-400 hover:underline cursor-pointer">forget password ?</p>
        </div>
    )
}

export default Login