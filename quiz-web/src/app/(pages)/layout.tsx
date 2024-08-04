import Header from "./Header";

const AppLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="min-h-full">
      <Header />
      <div className="mx-auto max-w-7xl ">
      {children}
      </div>
    </div>
  );
};

export default AppLayout;
