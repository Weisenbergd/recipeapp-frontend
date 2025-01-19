import { Outlet } from "react-router-dom";
import Header from "../components/logic/Header";

const Root = () => {
  return (
    <div className=" flex  min-h-svh flex-col bg-gray-50">
      <Header />
      <main className="md:px-paddingDesktop">
        <Outlet />
      </main>
    </div>
  );
};
export default Root;
