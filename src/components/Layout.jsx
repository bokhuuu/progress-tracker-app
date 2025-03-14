const Layout = ({ children, pageTitle }) => {
  return (
    <div>
      <header className="bg-green-200">
        <div>logo</div>

        <div>
          <div>button1</div>
          <div>button2</div>
        </div>

        <p>{pageTitle}</p>
      </header>

      <main>{children}</main>
    </div>
  );
};

export default Layout;
