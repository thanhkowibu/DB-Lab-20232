import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { cn } from "@/lib/utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DailyRevenueChart = ({
  year,
  month,
  className,
}: {
  year: number;
  month: number;
  className: string;
}) => {
  const [data, setData] = useState<DailyRevenue[] | []>([]); // Define dailyRevenue type
  const axios = useAxiosPrivate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `/admin/revenue/year/${year}/month/${month}`
      );
      // console.log(res);
      setData(res.data);
    };
    fetchData();
  }, [axios, year, month]);

  const days = data.map((item) => `${item.day}`);
  const revenues = data.map((item) => item.revenue);

  const chartData = {
    labels: days,
    datasets: [
      {
        label: `Revenue ($)`,
        data: revenues,
        borderColor: "rgba(75, 192, 192, 1)", // Change line color
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Change fill color
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Day",
        },
      },
      y: {
        title: {
          display: true,
          text: "Revenue ($)",
        },
      },
    },
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center",
        className
      )}
    >
      <h3 className="text-md font-semibold mb-2">
        Daily Revenue Chart In {`${month}/${year}`}
      </h3>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default DailyRevenueChart;
