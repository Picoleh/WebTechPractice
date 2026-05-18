import { Outlet } from "react-router-dom";

export default function PublicLayout() {
    return(
        <div className="h-screen relative bg-[url('/login-bg.jpg')] bg-cover bg-center flex items-center justify-center">
            <div className="absolute inset-0 bg-white/30 flex items-center justify-center backdrop-blur-sm"/> 

            <div className="relative z-10 bg-slate-100 rounded flex flex-col shadow-lg items-center scale-100 lg:scale-125">
                <Outlet/>
            </div>
        </div>
    );
}