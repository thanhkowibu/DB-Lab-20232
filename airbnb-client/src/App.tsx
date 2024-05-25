import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import routes from "./routes/routes";
import { GlobalContextProvider } from "./context/useAuth";

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalContextProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              {routes.map((route, index) =>
                route.index ? (
                  <Route
                    index
                    path={route.path}
                    key={index}
                    element={route.element}
                  />
                ) : (
                  <Route
                    path={route.path}
                    key={index}
                    element={route.element}
                  />
                )
              )}
            </Route>
          </Routes>
        </GlobalContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
