import { useEffect, useState } from "react";
import DiffChart from "./DiffChart";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

const MainDiffChart = () => {
  const axios = useAxiosPrivate();
  const [data, setData] = useState<DiffReportType>({
    current_month_booking: 0,
    current_month_user: 0,
    last_month_booking: 0,
    last_month_user: 0,
  });
  // console.log(data);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/admin/diff-report");
      // console.log(res.data);
      setData(res.data);
    };

    fetchData();
  }, [axios]);

  const lastMonthUsers = data.last_month_user;
  const thisMonthUsers = data.current_month_user;
  const lastMonthBooking = data.last_month_booking;
  const thisMonthBooking = data.current_month_booking;

  const chartData = [lastMonthUsers, thisMonthUsers];
  const chartDataBooking = [
    lastMonthBooking,
    thisMonthBooking,
  ];
  const chartLabels = ["Last Month", "This Month"];

  return (
    <div className="flex w-full gap-3">
      <div className="relative overflow-x-auto py-4 w-2/3">
        <DiffChart
          data={chartData}
          labels={chartLabels}
          title={"chartTitle"}
          showLegend={false}
          showTitle={false}
          reference="User"
        />
      </div>

      <div className="relative overflow-x-auto py-4 w-2/3">
        <DiffChart
          data={chartDataBooking}
          labels={chartLabels}
          title={"chartTitle"}
          showLegend={false}
          showTitle={false}
          reference="Booking"
        />
      </div>
    </div>
  );
};
export default MainDiffChart;
