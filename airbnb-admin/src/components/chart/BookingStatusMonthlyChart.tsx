import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { cn } from "@/lib/utils";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

ChartJS.register(ArcElement, Tooltip, Legend);

interface BookingStatusMonthlyChartProps {
  year: number;
  month: number;
  className: string;
}

const BookingStatusMonthlyChart: React.FC<
  BookingStatusMonthlyChartProps
> = ({ year, month, className }) => {
  const [data, setData] = useState<BookingStatusReportType>(
    {
      checkedOut: 0,
      cancel: 0,
      noShow: 0,
    }
  );
  const axios = useAxiosPrivate();

  console.log(year, month);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/admin/bookings/status/year/${year}/month/${month}`
        );
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error(
          "Error fetching booking status data:",
          error
        );
      }
    };

    fetchData();
  }, [year, month, axios]);

  const chartData = {
    labels: ["Checked Out", "Cancel", "No Show"],
    datasets: [
      {
        data: [data.checkedOut, data.cancel, data.noShow],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 205, 86, 0.6)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 205, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label: function (tooltipItem: any) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
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
        Booking Status for {month}/{year}
      </h3>

      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default BookingStatusMonthlyChart;
