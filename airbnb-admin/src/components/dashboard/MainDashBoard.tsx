import BookingStatusMonthlyChart from "../chart/BookingStatusMonthlyChart";
import DailyRevenueChart from "../chart/DailyRevenueChart";
import MainDiffChart from "../chart/MainDiffChart";
import MonthlyRevenueChart from "../chart/MonthlyRevenueChart";

const MainDashBoard = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  return (
    <div className="w-full flex flex-col py-12 gap-12 px-6 bg-slate-50 items-center justify-center">
      <div className="w-full mb-12 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-4xl font-mono font-extrabold mb-2 text-center text-blue-600">
          Báo cáo tăng trưởng trong tháng
        </h2>
        <MainDiffChart />
      </div>

      <div className="w-full mb-12 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-4xl font-mono font-extrabold mb-4 text-center text-blue-600">
          Báo cáo chi tiết doanh thu trong tháng
        </h2>
        <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-12 px-3">
          <DailyRevenueChart
            year={currentYear}
            month={currentMonth}
            className="w-full lg:w-[60%] flex justify-center h-fit bg-white p-6 rounded-lg shadow-lg"
          />
          <BookingStatusMonthlyChart
            year={currentYear}
            month={currentMonth}
            className="w-full lg:w-[30%] flex justify-center h-fit bg-white p-6 rounded-lg shadow-lg"
          />
        </div>
      </div>

      <div className="w-full mb-12 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-4xl font-mono font-bold mb-4 text-center text-blue-600">
          Chi tiết doanh thu trong năm
        </h2>
        <MonthlyRevenueChart
          year={currentYear}
          className="w-full h-fit flex justify-center bg-white p-6 rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default MainDashBoard;
