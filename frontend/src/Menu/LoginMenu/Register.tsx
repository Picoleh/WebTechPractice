import { FcBiomass } from "react-icons/fc";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import Password from "../../Util/Password";
import Dropdown from "../../Util/Dropdown";
import { FaUserTag } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { use, useEffect, useState } from "react";
import { fetchData } from "../../DataManagement/DataManager";
import { EmptyUser, type User } from "../../DataManagement/DataTypes";
import { useKeycloak } from "@react-keycloak/web";


type Role = {
    id: number;
    name: string;
}

export default function Register(){
    const [roles, setRoles] = useState<Role[]>([]);
    const [newUser, setNewUser] = useState<User>(EmptyUser());
    const { keycloak} = useKeycloak();

    async function loadRoles(){
        const response = await fetchData("register/roles");
        setRoles(response as Role[]);
    }

    async function handleRegister(){
        keycloak.register();
    }

    function checkPasswordMatch(confirmPassword: string): boolean{
        return newUser.password === confirmPassword;
    }

    useEffect(() => {
        loadRoles();
    }, []);

    return(
        <>
            <div className="flex flex-row items-center bg-teal-600 p-4 rounded-t w-full justify-center">
                <FcBiomass size={48}/> 
                <h1 className="text-xl lg:text-3xl font-bold text-white ml-2">BioMatDB | Register</h1>
            </div>

            <div className="flex flex-col items-center gap-4 p-6">
                <h1 className="text-2xl lg:text-4xl mb-4">Create a new Account</h1>

                <div className="flex flex-row items-stretch w-full">
                    <span className="bg-gray-300 p-2 flex items-center justify-center rounded-l shadow">
                        <IoPersonOutline size={28}/>
                    </span>
                    <input type="text" placeholder="Username" className="w-full p-2 rounded-r shadow" onChange={(e) => setNewUser({...newUser, username: e.target.value})}/>
                </div>

                <div className="flex flex-row items-stretch w-full">
                    <span className="bg-gray-300 p-2 flex items-center justify-center rounded-l shadow">
                        <MdOutlineEmail size={28}/>
                    </span>
                    <input type="email" placeholder="Email Address" className="w-full p-2 rounded-r shadow" onChange={(e) => setNewUser({...newUser, email: e.target.value})}/>
                </div>

                <div className="flex flex-row gap-2 w-full">
                    <div className="flex flex-row items-stretch w-full">
                        <span className="bg-gray-300 p-2 flex items-center justify-center rounded-l shadow">
                            <MdLockOutline size={28}/>
                        </span>
                        <Password placeholder="Password" onChange={(e) => setNewUser({...newUser, password: e.target.value})}/>
                    </div>
                    <div className="flex flex-row items-stretch w-full">
                        <span className="bg-gray-300 p-2 flex items-center justify-center rounded-l shadow">
                            <MdLockOutline size={28}/>
                        </span>
                        <Password placeholder="Confirm Password" onChange={(e) => checkPasswordMatch(e.target.value)}/>
                    </div>
                </div>

                <div className="flex flex-row items-stretch w-full">
                    <span className="bg-gray-300 p-2 flex items-center justify-center rounded-l shadow">
                        <FaUserTag size={28}/>
                    </span>
                    <Dropdown data={roles} title="Select Role" settedValueId={null} expandRight={true} 
                    onValueChange={(item) => setNewUser({...newUser, role_id: item.id})} getLabel={(item) => item.name} getId={(item) => item.id}/>
                </div>

                <button className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded w-full" onClick={handleRegister}>
                    <span className="text-white font-bold">Create Account</span>
                </button>

                <div className="w-full flex flex-row items-center justify-center">
                    <div className="border border-gray-300 w-full h-0"/>
                    <span className="mx-4 text-gray-500">OR</span>
                    <div className="border border-gray-300 w-full h-0"/>
                </div>

                <Link to="/login" className="bg-white hover:bg-gray-200 py-2 px-4 rounded w-full text-center">
                    Already have an account? Sign In
                </Link>
            </div>
        </>
    );
}