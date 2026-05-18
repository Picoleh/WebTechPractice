import { FcBiomass } from "react-icons/fc";
import { MdLockOutline, MdOutlineEmail } from "react-icons/md";
import Password from "../../Util/Password";
import { Link } from "react-router-dom";

export default function Login() {
    return (
        <>
            <div className="flex flex-row items-center bg-teal-600 p-4 rounded-t w-full justify-center">
                <FcBiomass size={48}/> 
                <h1 className="text-xl lg:text-3xl font-bold text-white ml-2">BioMatDB | Login</h1>
            </div>

            <div className="flex flex-col items-center gap-4 p-6 min-w-96">
                <h1 className="text-2xl lg:text-4xl mb-4">Sign In to BioMat</h1>

                <div className="flex flex-row items-stretch w-full">
                    <span className="bg-gray-300 p-2 flex items-center justify-center rounded-l shadow">
                        <MdOutlineEmail size={28}/>
                    </span>
                    <input type="email" placeholder="Email Address" className="w-full p-2 rounded-r shadow"/>
                </div>

                <div className="flex flex-row items-stretch w-full">
                    <span className="bg-gray-300 p-2 flex items-center justify-center rounded-l shadow">
                        <MdLockOutline size={28}/>
                    </span>
                    <Password placeholder="Password"/>
                </div>

                <div className="flex flex-row items-center justify-between w-full">
                    <div>
                        <input type="checkbox" id="remember" className="mr-1"/>
                        <label htmlFor="remember" className="text-sm">Remember me</label>
                    </div>
                    <a href="#" className="text-sm hover:text-teal-600">Forgot password?</a>
                </div>

                <button className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded w-full">
                    <span className="text-white font-bold">Sign In</span>
                </button>

                <div className="w-full flex flex-row items-center justify-center">
                    <div className="border border-gray-300 w-full h-0"/>
                    <span className="mx-4 text-gray-500">OR</span>
                    <div className="border border-gray-300 w-full h-0"/>
                </div>

                <Link to="/register" className="bg-white hover:bg-gray-200 py-2 px-4 rounded w-full text-center">
                    Create New Account
                </Link>
            </div>
        </>
    )
}