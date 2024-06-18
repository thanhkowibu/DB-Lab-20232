import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { RedirectAuth } from "./components/auth/redirect-auth";
import { LoginForm } from "./components/auth/login-form";
import ProtectedRouteFallBack from "./components/auth/protected";
import MainDashBoard from "./components/dashboard/MainDashBoard";
import PersistLogin from "./components/auth/persist-login";
import Layout from "./components/layout";
import ReportPage from "./components/page/ReportPage";
import PropertyPage from "./components/page/PropertyPage";
import UserPage from "./components/page/UserPage";
import BookingPage from "./components/page/BookingPage";
import HostPage from "./components/page/HostPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PersistLogin />}>
          <Route element={<ProtectedRouteFallBack />}>
            <Route element={<Layout />}>
              <Route path="/" element={<MainDashBoard />} />
              <Route path="/user" element={<UserPage />} />
              <Route
                path="/report"
                element={<ReportPage />}
              />
              <Route />
              <Route
                path="/booking"
                element={<BookingPage />}
              />
              <Route />
              <Route
                path="/property"
                element={<PropertyPage />}
              />
              <Route path="/host" element={<HostPage />} />
              <Route />
              <Route />
            </Route>
          </Route>

          {/* CATCH ALL ROUTE*/}
          <Route
            path="*"
            element={<div>404 PAGE NOT FOUND</div>}
          />

          {/* AUTH ROUTE */}
          <Route element={<RedirectAuth />}>
            <Route path="/login" element={<LoginForm />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
