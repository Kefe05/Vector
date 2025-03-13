import { Outlet } from "react-router-dom";
import HomeLayout from "../layout/homeLayout";

const Dashboard = () => {
  return (
    <HomeLayout>
      <Outlet />
    </HomeLayout>
  );
};

export default Dashboard;
