import { Outlet } from "react-router-dom";
import Header from "../components/logic/Header";
import DevNote from "../components/DevNote";

const Root = () => {
  return (
    <div className=" flex min-h-svh flex-col bg-gray-50">
      <Header />
      <main className="relative w-fit">
        <DevNote />
        <Outlet />
      </main>
    </div>
  );
};
export default Root;
