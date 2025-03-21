import { Link } from "react-router-dom";
import CreateEmployeeButton from "../components/buttons/CreateEmployeeButton";
import CreateTaskButton from "../components/buttons/CreateTaskButton";

const Layout = ({ children }) => {
  return (
    <div
      className="mx-auto box-border"
      style={{
        overflowX: "hidden",
        overflowY: "auto",
        padding: "20px 100px",
      }}
    >
      <header className="flex justify-between items-center mb-[40px]">
        <Link to="/">
          <img src="/assets/logo.png" className="w-[210px] h-[38px] gap-1" />
        </Link>
        <div className="flex space-x-[40px]">
          <Link to="/employee/create">
            <CreateEmployeeButton />
          </Link>

          <Link to="/task/create">
            <CreateTaskButton />
          </Link>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
};

export default Layout;
