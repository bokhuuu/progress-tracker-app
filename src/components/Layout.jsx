import CreateEmployeeButton from "../components/buttons/CreateEmployeeButton";
import CreateTaskButton from "../components/buttons/CreateTaskButton";

const Layout = ({ children }) => {
  return (
    <div
      className="mx-auto box-border"
      style={{
        width: "1920px",
        height: "1080px",
        overflow: "hidden",
        padding: "20px 100px",
        maxWidth: "100%",
      }}
    >
      <header className="flex justify-between items-center mb-[40px]">
        <img src="/assets/logo.png" className="w-[210px] h-[38px] gap-1" />

        <div className="flex space-x-[40px]">
          <CreateTaskButton />
          <CreateEmployeeButton />
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
};

export default Layout;
