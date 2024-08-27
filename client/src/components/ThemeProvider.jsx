import { useSelector } from "react-redux";

const ThemeProvider = ({ children }) => {
  const { theme } = useSelector((store) => store.theme);
  return (
    <div className={theme}>
      <div className="text-slate-800 bg-slate-100 dark:text-slate-100 dark:bg-slate-800 min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default ThemeProvider;
