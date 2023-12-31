import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import MainLayout from "./components/layout/MainLayout";
import routes from "./routes/routes";
import PageWrapper from "./components/common/PageWrapper";
import { useSelector } from "react-redux";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import themeConfigs from "./configs/theme.configs";

const App = () => {
  const { themeMode } = useSelector((state) => state.themeMode);

  return (
    <ThemeProvider theme={themeConfigs.custom({ mode: themeMode })}>
      {/* Config React Toastify START */}
      <ToastContainer
        position="bottom-left"
        autoClose={3500}
        theme={themeMode}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
      />
      {/* Config React Toastify END */}

      {/* Material UI reset CSS START */}
      <CssBaseline />
      {/* Material UI reset CSS END */}

      {/* App Routest START */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {routes.map((route, i) =>
              route.index ? (
                <Route
                  key={i}
                  index
                  element={
                    route.state ? (
                      <PageWrapper state={route.state}>
                        {route.element}
                      </PageWrapper>
                    ) : (
                      route.element
                    )
                  }
                />
              ) : (
                <Route
                  key={i}
                  path={route.path}
                  element={
                    route.state ? (
                      <PageWrapper state={route.state}>
                        {route.element}
                      </PageWrapper>
                    ) : (
                      route.element
                    )
                  }
                />
              )
            )}
          </Route>
        </Routes>
      </BrowserRouter>
      {/* App Routest END */}
    </ThemeProvider>
  );
};

export default App;
