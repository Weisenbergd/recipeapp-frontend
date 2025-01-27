import { Outlet } from "react-router-dom";
import Header from "../components/logic/Header";

const Root = () => {
  return (
    <div className=" flex min-h-svh flex-col bg-gray-50">
      <Header />
      <main className="flex w-full justify-center">
        <Outlet />
      </main>
    </div>
  );
};
export default Root;
