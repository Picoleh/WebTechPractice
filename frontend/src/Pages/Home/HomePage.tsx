import NumberCard from "./NumberCard";
import { MdBarChart, MdFiberNew } from "react-icons/md";
import { FaFileAlt, FaFlask } from "react-icons/fa";
import { useEffect, useState } from "react";
import { fetchData } from "../../DataManagement/DataManager";
import { BarChart,Bar,XAxis,YAxis,Tooltip,CartesianGrid,ResponsiveContainer} from "recharts";

type NumberCardData = {
    total_biomaterials: number;
    study_types: number;
    active_experiments: number;
    new_submissions: number;
}

type DBChartData = {
    name: string;
    month: string;
    count: number;
}

type HomeData = {
    numberCardData: NumberCardData;
    barChartData: PivotChartData[];
}

type PivotChartData = {
  month: string;
  [name: string]: string | number;
};

export default function HomePage() {
    const [homeData, setHomeData] = useState<HomeData>({
        numberCardData: {
            total_biomaterials: 0,
            study_types: 0,
            active_experiments: 0,
            new_submissions: 0,
        },
        barChartData: [],
    });


    async function loadNumberCardData() {
        const responseJson = await fetchData("");
        console.log("Home Page Data:", responseJson);
        const numberCardData = responseJson.numberCardData as NumberCardData;
        let barChartData = responseJson.trendData as DBChartData[];
        barChartData = barChartData.map(item => ({
            ...item,
            month: ConvertDateToMonth(item.month)
        }));
        const pivotChartDatas = pivotData(barChartData);
        setHomeData(prev => ({ ...prev, numberCardData, barChartData: pivotChartDatas }));
    }

    function ConvertDateToMonth(data: string) {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const date = new Date(data);
        
        return monthNames[date.getMonth()];
    }

    function pivotData(rows: DBChartData[]): PivotChartData[] {
        const result: Record<string, PivotChartData> = {};
        const types = new Set<string>();

        // Descobrir todos os tipos
        rows.forEach(row => {
            types.add(row.name);
        });

        // Construir estrutura
        rows.forEach(({ month, name, count }) => {
            const key = month;

            if (!result[key]) {
            result[key] = { month: key };

            // inicializa todos tipos com 0
            types.forEach(t => {
                result[key][t] = 0;
            });
            }

            result[key][name] = Number(count);
        });

        return Object.values(result);
    }

    useEffect(() => {
        loadNumberCardData();
    }, []);


    return (
        <div className="flex flex-col items-start justify-start px-4 py-8 text-center sm:px-6 lg:px-8">
            <div className="flex flex-row gap-6 w-full">
                <NumberCard title="Total Biomaterials" number={homeData.numberCardData.total_biomaterials} icon={MdBarChart} />
                <NumberCard title="Study Types" number={homeData.numberCardData.study_types} icon={FaFileAlt} />
                <NumberCard title="Active Experiments" number={homeData.numberCardData.active_experiments} icon={FaFlask} />
                <NumberCard title="New Submissions" number={homeData.numberCardData.new_submissions} icon={MdFiberNew} />
            </div>

            <div className="bg-orange-300 w-full h-96">
                <ResponsiveContainer>
                    <BarChart data={homeData.barChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        {
                            homeData.barChartData.map(name => (
                                <Bar dataKey={name.month}/>
                            ))
                        }
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}