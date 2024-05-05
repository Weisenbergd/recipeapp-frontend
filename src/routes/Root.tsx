import { Outlet } from "react-router-dom";
import Header from "../components/logic/Header";

const Root = () => {
  return (
    <div className="bg-gray-200 px-padding ">
      <Header />
      <div className="sm:px-2 md:px-20">
        <Outlet />
      </div>
    </div>
  );
};
export default Root;
