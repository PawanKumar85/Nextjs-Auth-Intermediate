"use client"
import Link from 'next/link'
import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

const Login = () => {

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const toLogin = async () => { }

    return (
        <>
            <div className="flex flex-col w-[350px] h-fit gap-3 bg-gray-600 p-5 rounded">
                <h1 className="text-xl font-bold text-center">Log in</h1>
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
                <button className="bg-blue-600 rounded py-2 px-4  hover:bg-blue-700 duration-200">Login</button>

                <hr />
                <Link href={"/signup"}>
                    <button className="bg-blue-600 rounded py-2 px-4 w-full  hover:bg-blue-700 duration-200">
                        Sign up
                    </button>
                </Link>
                <p className="flex text-xs capitalize justify-end text-blue-400 hover:underline cursor-pointer">forget password ?</p>
            </div>
        </>
    )
}

export default Login