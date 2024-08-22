"use client"
import Link from 'next/link';
import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

const Signup = () => {
    const router = useRouter();
    const [user, setUser] = React.useState({
        username: "",
        email: "",
        password: "",
    });

    const [buttonDisable, setButtonDisable] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        const isValid = Object.values(user).every((value) => value.length > 0);
        setButtonDisable(!isValid);
    }, [user]);

    const toSignup = async function () {
        try {
            await axios.post("/api/users/signup", user);
            toast.success("Signup Success");
            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        } finally {
            setLoading(true);
        }
    };
    return (
        <div className="flex flex-col w-[350px] h-fit gap-3 bg-gray-600 p-5 rounded">
            <h1 className="text-xl font-bold text-center">{
                loading ? <span className="loader2"></span> : "Sign Up"}</h1>
            <div className="flex flex-col">
                <input
                    type="text"
                    placeholder="Username"
                    className="p-2 outline-none text-black rounded"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                />
                <p className="text-xs text-red-600 pl-3 mt-1">
                    {user.username.length < 3 ? "Username must be at least 3 characters" : ""}
                </p>
            </div>
            <div className="flex flex-col">
                <input
                    type="email"
                    placeholder="Email"
                    className="p-2 outline-none text-black rounded"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <p className="text-xs text-red-600 pl-3 mt-1">
                    {user.email.length < 3 ? "Email must be at least 3 characters " : ""}
                </p>
            </div>
            <div className="flex flex-col">
                <input
                    type="password"
                    placeholder="Password"
                    className="p-2 outline-none text-black rounded lowercase placeholder:capitalize"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
                <p className="text-xs text-red-600 pl-3 mt-1">
                    {user.password.length < 3 ? "Password must be at least 6 characters " : ""}
                </p>
            </div>

            <button
                onClick={toSignup}
                className="bg-blue-600 rounded py-2 px-4 hover:bg-blue-700 duration-200 disabled:opacity-25 shadow-md"
                disabled={buttonDisable}
            >
                Sign up
            </button>
            <hr />
            <Link href="/login">
                <button className="bg-blue-600 shadow-md rounded py-2 px-4 w-full hover:bg-blue-700 duration-200">
                    Login
                </button>
            </Link>
        </div>
    )
};

export default Signup;