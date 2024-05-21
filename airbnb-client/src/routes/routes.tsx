import { ProtectedPage } from "@/components/common/ProtectedPage";
import { AuthPage } from "@/pages/AuthPage";
import { BookingPage } from "@/pages/BookingPage";
import { FavouristList } from "@/pages/FavouristList";
import { HomePage } from "@/pages/HomePage";
import { PropertyDetail } from "@/pages/PropertyDetail";
import { PropertyList } from "@/pages/PropertyList";
import { PasswordUpdate } from "@/pages/PasswordUpdate";
import { UserDetail } from "@/pages/UserDetail";

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
    path: "/users/:id",
    element: <UserDetail />,
    state: "user.detail",
  },
  {
    path: "/booking",
    element: (
      <ProtectedPage>
        <BookingPage />
      </ProtectedPage>
    ),
    state: "booking",
  },
  {
    path: "/favourites",
    element: (
      <ProtectedPage>
        <FavouristList />
      </ProtectedPage>
    ),
    state: "favourites",
  },
  {
    path: "/password_update",
    element: (
      <ProtectedPage>
        <PasswordUpdate />
      </ProtectedPage>
    ),
    state: "password.update",
  },
];

export default routes;
