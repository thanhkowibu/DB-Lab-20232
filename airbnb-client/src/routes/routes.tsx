import { AuthPage } from "@/pages/AuthPage";
import { FavouristList } from "@/pages/FavouristList";
import { HomePage } from "@/pages/HomePage";
import { PropertyDetail } from "@/pages/PropertyDetail";
import { PropertyList } from "@/pages/PropertyList";
import { PasswordUpdate } from "@/pages/PasswordUpdate";
import { UserDetail } from "@/pages/UserDetail";
import ProtectedRoute from "./ProtectedRoute";
import { CreateProperty } from "@/pages/CreateProperty";
import TripPage from "@/pages/TripPage";
import BookingPage from "@/pages/BookingPage";
import HostingPage from "@/pages/HostingPage";
import HelpPage from "@/pages/HelpPage";

export const routesGen = {
  home: "/",
  houseList: (type: string) => `${type}`,
  user: (id: number) => `/user/${id}`,
  favouriteList: "/favourites",
  passwordUpdate: "/password_update",
};

const routes = [
  {
    index: true,
    element: <HomePage />,
    state: "home",
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/properties",
    element: <PropertyList />,
  },
  {
    path: "/properties/:id",
    element: <PropertyDetail />,
  },
  {
    path: "/properties/create",
    element: (
      <ProtectedRoute>
        <CreateProperty />
      </ProtectedRoute>
    ),
  },
  {
    path: "/users/:id",
    element: <UserDetail />,
    state: "user.detail",
  },
  {
    path: "/booking/:id",
    element: (
      <ProtectedRoute>
        <BookingPage />
      </ProtectedRoute>
    ),
    state: "booking",
  },
  {
    path: "/trips",
    element: (
      <ProtectedRoute>
        <TripPage />
      </ProtectedRoute>
    ),
    state: "trips",
  },
  {
    path: "/hosting",
    element: (
      <ProtectedRoute>
        <HostingPage />
      </ProtectedRoute>
    ),
    state: "hosting",
  },
  {
    path: "/favourites",
    element: (
      <ProtectedRoute>
        <FavouristList />
      </ProtectedRoute>
    ),
    state: "favourites",
  },
  {
    path: "/help",
    element: (
      <ProtectedRoute>
        <HelpPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/password_update",
    element: (
      <ProtectedRoute>
        <PasswordUpdate />
      </ProtectedRoute>
    ),
    state: "password.update",
  },
];

export default routes;
