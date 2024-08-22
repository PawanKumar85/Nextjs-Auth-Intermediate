"use client"
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface User {
    username: string;
    email: String
}



const page = () => {
    const route = useRouter();
    const [data, setData] = useState<User | null>(null);
    const toLogout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout Successfully");
            route.push("/login");
        } catch (error: any) {
            console.log(error.message)
            toast.error(error.message);
        }
    };

    const getUserDetails = async () => {
        try {
            const usersData = await axios('/api/users/myData');
            console.log(usersData.data);
            setData(usersData.data.user)
        } catch (error) {

        }
    }
    return (
        <>
            <div className="flex justify-end p-3 items-center">
                <ul className="flex gap-5">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="#">About Us</Link></li>
                    <li><Link href="#">Portfolio</Link></li>
                    <li><Link href="/contact">Contact Us</Link></li>
                </ul>
                <button onClick={toLogout} className='ml-5 rounded-md bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4'>Logout</button>
            </div >
            <div className='flex flex-col items-center justify-center h-[600px]'>
                <h1 className='p-2 bg-green-800 rounded'>{data?.email || "Nothing"}</h1>
                <h1>Page</h1>    
                <p>user profile page</p>

                <button onClick={getUserDetails} className='ml-5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4'>Get Info</button>
                
            </div>
        </>
    )
}

export default page