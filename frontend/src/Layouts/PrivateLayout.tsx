import { Outlet } from "react-router-dom";
import AsideMenu from "../Menu/AsideMenu/AsideMenu";
import TopBarMenu from "../Menu/TopBarMenu";
import PageTitle from "../Util/Pages/PageTitle";
import { useMediaQuery } from "../DataManagement/MediaQuery";
import { useEffect, useState } from "react";

export default function PrivateLayout() {
    const isDesktop = useMediaQuery("(min-width: 1024px)");
    const [isSideBarOpen, setIsSideBarOpen] = useState(isDesktop);

    useEffect(() => {
        setIsSideBarOpen(isDesktop);
    }, [isDesktop]);

    const toggleSideBar = () => {
        setIsSideBarOpen(!isSideBarOpen);
    };

    return(
        <div className="flex min-h-screen flex-row overflow-hidden bg-gray-100">
            <AsideMenu isSideBarOpen={isSideBarOpen} toggleSideBar={toggleSideBar}/>

            <div className="flex flex-1 flex-col overflow-hidden">
                <TopBarMenu/>

                <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:m-8 lg:rounded-lg lg:bg-[var(--bg-color-100)] lg:p-8 lg:shadow-[0_0_40px_rgba(0,0,0,0.15)]">
                    <PageTitle/>
                    <Outlet/>
                </div>
            </div>
    </div>
    );
}