import Link from "next/link"

const Navbar = () => {
    return (
        <div className="max-w-6xl mx-auto flex justify-end p-3 items-center">
            <ul className="flex gap-5">
                <li><Link href="/">Home</Link></li>
                <li><Link href="#">About Us</Link></li>
                <li><Link href="#">Portfolio</Link></li>
            </ul>
            <div className="flex gap-1 ml-5">
                <Link href={"/login"} className="bg-blue-500 p-3 rounded-md">Login</Link>
                <Link href="/signup" className="bg-blue-500 p-3 rounded-md">Sign Up</Link>
            </div>
        </div >
    )
}

export default Navbar