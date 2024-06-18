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

const MonthlyRevenueChart = ({
  year,
  className,
}: {
  year: number;
  className: string;
}) => {
  const [data, setData] = useState<monthlyRevenue[] | []>(
    []
  );

  const axios = useAxiosPrivate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `/admin/revenue/year/${year}`
      );
      // console.log(res.data);
      setData(fillMissingMonths(res.data));
    };

    fetchData();
  }, [axios, year]);

  const months = data.map((item) => `${item.month}`);
  const revenues = data.map((item) => item.revenue);

  const chartData = {
    labels: months,
    datasets: [
      {
        label: "Revenue ($)",
        data: revenues,
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderWidth: 1,
        fill: false,
      },
    ],
  };

  const fillMissingMonths = (data: monthlyRevenue[]) => {
    const filledData: monthlyRevenue[] = [];
    for (let i = 1; i <= 12; i++) {
      const existingMonthData = data.find(
        (item) => item.month === i
      );
      if (existingMonthData) {
        filledData.push(existingMonthData);
      } else {
        filledData.push({ month: i, revenue: 0 });
      }
    }
    return filledData;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Revenue In " + year,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
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
    <div className={cn(className)}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default MonthlyRevenueChart;
