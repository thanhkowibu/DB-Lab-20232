import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import routes from "./routes/routes";

function App() {
  return (
    <>
      <BrowserRouter>
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
                <Route path={route.path} key={index} element={route.element} />
              )
            )}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
