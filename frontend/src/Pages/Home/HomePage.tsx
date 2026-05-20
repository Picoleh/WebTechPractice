import NumberCard from "./NumberCard";
import { MdBarChart, MdFiberNew } from "react-icons/md";
import { FaFileAlt, FaFlask } from "react-icons/fa";
import { useEffect, useState } from "react";
import { fetchData } from "../../DataManagement/DataManager";
import { BarChart,Bar,XAxis,YAxis,Tooltip,CartesianGrid,ResponsiveContainer, LineChart, Line} from "recharts";
import ContentCard from "./ContentCard";
import { Link } from "react-router-dom";
import MaterialCard from "./MaterialCard";

type NumberCardData = {
    total_biomaterials: number;
    study_types: number;
    active_experiments: number;
    new_submissions: number;
}

type DBChartData = {
    name: string;
    count: number;
}

type StudyTypeData = {
    month: string;
    count: number;
}

type BiomaterialsData = {
    name: string;
    count: number;
    img_path: string;
}

type researchTechData = {
    name: string;
    username: string;
    days: number;
}

type HomeData = {
    numberCardData: NumberCardData;
    barChartData: DBChartData[];
    studyTypeData: StudyTypeData[];
    biomaterialsData: BiomaterialsData[];
    researchTechData: researchTechData[];
}

function monthName(month: string) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const date = new Date(month);
    return monthNames[date.getMonth()];
}

export default function HomePage() {
    const [homeData, setHomeData] = useState<HomeData>({
        numberCardData: {
            total_biomaterials: 0,
            study_types: 0,
            active_experiments: 0,
            new_submissions: 0,
        },
        barChartData: [],
        studyTypeData: [],
        biomaterialsData: [],
        researchTechData: [],
    });


    async function loadNumberCardData() {
        const responseJson = await fetchData("");
        console.log("Home Page Data:", responseJson);
        const numberCardData = responseJson.numberCardData as NumberCardData;
        const barChartData = responseJson.trendData as DBChartData[];
        const studyTypeData = responseJson.studyTypeData as StudyTypeData[];
        studyTypeData.forEach(item => {
            item.month = monthName(item.month);
        });
        const biomaterialsData = responseJson.biomaterialsData as BiomaterialsData[];
        const researchTechData = responseJson.researchTechData as researchTechData[];
        setHomeData(prev => ({ ...prev, numberCardData, barChartData: barChartData, studyTypeData: studyTypeData, biomaterialsData: biomaterialsData, researchTechData: researchTechData }));
    }


    useEffect(() => {
        loadNumberCardData();
    }, []);


    return (
        <div className="flex flex-col items-start justify-start gap-6 px-4 py-8 text-center sm:px-6 lg:px-8">
            <div className="flex flex-row gap-6 w-full">
                <NumberCard title="Total Biomaterials" number={homeData.numberCardData.total_biomaterials} icon={MdBarChart} />
                <NumberCard title="Study Types" number={homeData.numberCardData.study_types} icon={FaFileAlt} />
                <NumberCard title="Active Experiments" number={homeData.numberCardData.active_experiments} icon={FaFlask} />
                <NumberCard title="New Submissions" number={homeData.numberCardData.new_submissions} icon={MdFiberNew} />
            </div>

            <div className="grid grid-cols-[47fr_35fr_18fr] grid-rows-[repeat(20,1fr)] w-full h-full gap-6">
                <div className=" row-[span_15/span_15] col-start-1 row-start-1">
                    <ContentCard title="Biomaterials by Type">
                        <div className="w-full h-full">
                            <ResponsiveContainer>
                                <BarChart data={homeData.barChartData} margin={{bottom:20}}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" angle={-15} textAnchor="end" interval={0} tick={{ fontSize: 12 }}/>
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="count" fill="#14b8a6" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </ContentCard>
                </div>
                <div className="row-[span_10/span_10] col-start-2 row-start-1">
                    <ContentCard title="Study Type Frequency">
                        <div className="w-full h-full">
                            <ResponsiveContainer>
                                <LineChart data={homeData.studyTypeData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                                    <XAxis dataKey="month" axisLine={false} />
                                    <YAxis tickLine={false}/>
                                    <Tooltip />
                                    <Line dataKey="count" stroke="#14b8a6" strokeWidth={4} type={"monotone"} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </ContentCard>
                </div>

                <div className="bg-green-200 row-[span_20/span_20] col-start-3 row-start-1">
                    <ContentCard title="Quick Actions">
                        <div className="flex flex-col gap-4 w-full h-full">
                            <Link to="/biomaterials" className="bg-teal-500 w-full px-4 py-2 rounded-lg text-white font-bold hover:bg-teal-600 transition-colors">
                                Add Biomaterial
                            </Link>
                            <Link to="/biomaterials" className="bg-teal-500 w-full px-4 py-2 rounded-lg text-white font-bold hover:bg-teal-600 transition-colors">
                                Import Dataset
                            </Link>
                            <Link to="/biomaterials" className="bg-teal-500 w-full px-4 py-2 rounded-lg text-white font-bold hover:bg-teal-600 transition-colors">
                                Download Report
                            </Link>
                        </div>
                    </ContentCard>
                </div>        

                <div className="col-start-1 row-start-[16] row-[span_5/span_5]">
                    <ContentCard title="Favorite Materials">
                        <div className="flex flex-row w-full justify-between gap-4">
                            {homeData.biomaterialsData.map((biomaterial, index) => (
                                <MaterialCard key={index} title={biomaterial.name} number={biomaterial.count} img_path={biomaterial.img_path} />
                            ))}
                        </div>
                    </ContentCard>
                </div>

                <div className="col-start-2 row-start-11 row-[span_10/span_10]">
                    <ContentCard title="Recent Research Techniques">
                                <ul className="flex flex-col gap-4 justify-start items-start w-full h-full">
                                    {homeData.researchTechData.map((tech, index) => (
                                        <li key={index}>
                                            <span  className="text-left font-semibold">
                                                {tech.name + " "}
                                            </span>
                                            <span>
                                                was added {tech.days} days ago by
                                            </span>
                                            <span className="font-semibold">
                                                {" " + tech.username}
                                            </span>
                                        </li>
                                    ))}

                                    {homeData.researchTechData.length === 0 && (
                                        <span className="text-gray-500 italic">
                                            No recent research techniques added.
                                        </span>
                                    )}
                                </ul>

                    </ContentCard>
                </div>        
            </div>
        </div>
    );
}