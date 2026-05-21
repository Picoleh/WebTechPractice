import { useEffect, useState } from "react";
import SettingsCard from "./SettingsCard";
import { GoPerson } from "react-icons/go";
import { useKeycloak } from "@react-keycloak/web";
import { fetchData, uploadImage } from "../../DataManagement/DataManager";
import type { User } from "../../DataManagement/DataTypes";
import { FaRegEdit } from "react-icons/fa";
import { GrConfigure } from "react-icons/gr";
import { FiMonitor } from "react-icons/fi";
import { CiGlobe } from "react-icons/ci";
import Dropdown from "../../Util/Dropdown";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { MdOutlineLock, MdOutlineVerifiedUser } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { BsPencil } from "react-icons/bs";
import { useAlert } from "../../Util/Hooks/useAlert";
import Alert from "../../Util/Alert";
import { useTheme } from "../../Layouts/ThemeProvider";

export default function Settings() {
    const { keycloak } = useKeycloak();
    const [user, setUser] = useState<User | null>(null);
    const [selectedTheme, setSelectedTheme] = useState<string>("Light");
    const [imgPath, setImgPath] = useState<string>("");
    const { alert, showAlert, closeAlert } = useAlert();
    const { theme, setTheme } = useTheme();

    async function loadProfileImage(profileImagePath: string = imgPath) {
        console.log("loadinf prof info " + profileImagePath + "*");
        try{
            await fetchData("users/sync", "POST", {
                keycloak_id: keycloak.subject,
                username: keycloak.idTokenParsed?.preferred_username || "",
                first_name: keycloak.idTokenParsed?.given_name || "",
                last_name: keycloak.idTokenParsed?.family_name || "",
                email: keycloak.idTokenParsed?.email || "",
                img_path: profileImagePath
            });

            const response = await fetchData("users/me/?keycloak_id=" + keycloak.idTokenParsed?.sub);
            const data = response as User;
            setUser(data);
        }
        catch (error) {
            console.error("Error fetching user data:", error);
        }
    }



    useEffect(() => {
        loadProfileImage();
    }, []);

    async function handleUpload(file: File) {
        const path = await uploadImage(file);
        setImgPath(path);
        console.log("var path:", path);
        await loadProfileImage(path);
    };

    async function handlePasswordChange() {
        await keycloak.login({
            action: "UPDATE_PASSWORD"
        })
    }

    async function handleVerifyEmail() {
        if(keycloak.idTokenParsed?.email_verified) {
            showAlert("Your email is already verified.", "info");
            return;
        }
        try{
            await fetchData(`users/verify-email?keycloak_id=${keycloak.tokenParsed?.sub}`)

            showAlert("Verification email sent successfully.", "success");
        }
        catch (error) {
            console.error("Error sending verification email:", error);
            showAlert("Failed to send verification email.", "error");
        }


    }

    return (
        <div className="flex flex-col mt-8 gap-6">
            <Alert message={alert.message} type={alert.type} isOpen={alert.isOpen} triggerId={alert.triggerId} onClose={closeAlert}/>
            <SettingsCard title="Profile" icon={GoPerson}>
                <div className="flex flex-col justify-center items-center lg:flex-row lg:justify-start lg:items-start lg:p-4 lg:gap-16">
                    <div className="relative">
                        <img src={user?.img_path || "/default-profile.png"} alt="Profile" className="w-40 h-40 object-cover object-center rounded-full lg:w-56 lg:h-56"/>
                        <label htmlFor="file-input" className="cursor-pointer absolute bottom-1 right-1 bg-teal-50 hover:bg-teal-100 p-2 rounded-full border-2 border-white">
                            <FaRegEdit size={20}/>
                        </label>
                        <input id="file-input" className="hidden" type="file" accept="image/*" onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                handleUpload(file);
                            }
                        }} />
                    </div>

                    <div className="flex flex-col items-center lg:items-start w-full gap-4">
                        <label className="text-lg font-bold hidden lg:block text-[var(--text-color)]">Name</label>
                        <input type="text" className="w-full text-2xl font-bold text-center outline-none bg-transparent text-[var(--text-color)] border-[var(--gray-color)] rounded-lg
                         lg:p-2 lg:border lg:font-normal lg:text-left lg:bg-[var(--bg-color-100)]" value={`${user?.first_name} ${user?.last_name}`} readOnly/>
                        <label className="text-lg font-bold hidden lg:block text-[var(--text-color)]">Email</label>
                        <input type="email" className="w-full text-base text-[var(--gray-color)] bg-transparent text-center outline-none border-[var(--gray-color)] rounded-lg
                         lg:p-2 lg:border lg:text-left lg:text-[var(--text-color)] lg:bg-[var(--bg-color-100)]" value={user?.email} readOnly/>
                    </div>
                </div>
            </SettingsCard>

            <SettingsCard title="Preferences" icon={GrConfigure}>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-6 lg:flex-row justify-between lg:items-center">                    
                        <div className="flex flex-row items-center gap-6 flex-1 text-[var(--text-color)]">
                            <FiMonitor size={28}/>
                            <div className="flex flex-col">
                                <h1 className="font-semibold text-xl">Theme</h1>
                                <h2 className="text-gray-400">Choose your preferred appearance</h2>
                            </div>
                        </div>

                        <div className="flex-1">
                            <div className="flex flex-row justify-center">
                                <button type="button" className={`rounded-l-lg rounded-r-none border border-gray-400 p-3 w-full text-[var(--text-color)]
                                 ${selectedTheme === "Light" ? "bg-[var(--bg-color)] border-teal-600 border-2 text-teal-600" : "bg-[var(--bg-color-100)]"}`} 
                                 onClick={() => {
                                    setSelectedTheme("Light");
                                    setTheme("light");
                                }}>
                                    Light
                                </button>
                                <button type="button" className={`border border-gray-400 p-3 w-full text-[var(--text-color)]
                                 ${selectedTheme === "Dark" ? "bg-[var(--bg-color)] border-teal-600 border-2 text-teal-600" : "bg-[var(--bg-color-100)]"}`} 
                                 onClick={() => {
                                    setSelectedTheme("Dark");
                                    setTheme("dark");
                                }}>
                                    Dark
                                </button>
                                <button type="button" className={`rounded-l-none rounded-r-md border border-gray-400 p-3 w-full text-[var(--text-color)]
                                 ${selectedTheme === "System" ? "bg-[var(--bg-color)] border-teal-600 border-2 text-teal-600" : "bg-[var(--bg-color-100)]"}`} 
                                 onClick={() => {
                                    setSelectedTheme("System");
                                    setTheme("system");
                                }}>
                                    System
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <hr className="border-gray-300 hidden lg:block"/>

                    <div className="flex flex-col gap-6 lg:flex-row justify-between lg:items-center">
                        <div className="flex flex-row items-center gap-6 flex-1 text-[var(--text-color)]">
                            <CiGlobe size={28}/>
                            <div className="flex flex-col">
                                <h1 className="font-semibold text-xl">Language</h1>
                                <h2 className="text-gray-400">Choose your preferred language</h2>
                            </div>
                        </div>
                        <div className="flex-1">
                            <Dropdown title="Languages" data={["English", "Deutch", "Português"]} getLabel={(item) => String(item)} getId={(item) => String(item).length}
                                settedValueId={6} onValueChange={() => {}} expandRight={true}/>
                            </div>
                    </div>
                </div>
            </SettingsCard>

            <SettingsCard title="Security" icon={IoShieldCheckmarkOutline}>
                <div className="flex flex-col gap-3">
                    <button className="flex flex-row items-center gap-6 p-3 rounded-lg text-[var(--text-color)] hover:bg-[var(--bg-color-300)]" onClick={handlePasswordChange}>
                        <MdOutlineLock size={28}/>

                        <div className="flex flex-col items-start">
                            <h1 className="font-semibold text-xl">Password</h1>
                            <h2 className="text-gray-400">Change your password</h2>
                        </div>

                        <IoIosArrowForward size={20} className="text-gray-400 ml-auto"/>
                    </button>

                    <hr className="border-gray-300"/>

                    <button className="flex flex-row items-center gap-6 p-3 rounded-lg text-[var(--text-color)] hover:bg-[var(--bg-color-300)]" onClick={handleVerifyEmail}>
                        <MdOutlineVerifiedUser size={28}/>

                        <div className="flex flex-col items-start">
                            <h1 className="font-semibold text-xl">Email</h1>
                            <h2 className="text-gray-400">Verify your email address</h2>
                        </div>

                        <label className={`${keycloak.idTokenParsed?.email_verified ? "bg-green-200 text-green-600" : "bg-red-200 text-red-600"} 
                            rounded-full px-3 py-1  font-semibold ml-auto`}>{keycloak.idTokenParsed?.email_verified ? "Verified" : "Not Verified"}
                        </label>

                        <IoIosArrowForward size={20} className="text-gray-400 "/>
                    </button>

                    <hr className="border-gray-300"/>

                    <button className="flex flex-row items-center gap-6 p-3 rounded-lg text-[var(--text-color)] hover:bg-[var(--bg-color-300)]" onClick={keycloak.accountManagement}>
                        <BsPencil size={28}/>

                        <div className="flex flex-col items-start">
                            <h1 className="font-semibold text-xl">Data</h1>
                            <h2 className="text-gray-400">Change your data</h2>
                        </div>

                        <IoIosArrowForward size={20} className="text-gray-400 ml-auto"/>
                    </button>
                </div>
            </SettingsCard>
        </div>
    );
}