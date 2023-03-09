import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { MenuOption } from "../../app/app";
import HomePage from "../home/home";

const Register = lazy(() => import("../register/register"));

type AppRouterProps = {
  menuOptions: MenuOption[];
};

export function AppRouter({ menuOptions }: AppRouterProps) {
  return (
    <Suspense>
      <Routes>
        <Route path={"/"} element={<HomePage></HomePage>}></Route>
        <Route
          path={menuOptions[0].path}
          element={<HomePage></HomePage>}
        ></Route>
        <Route
          path={menuOptions[1].path}
          element={<Register></Register>}
        ></Route>
      </Routes>
    </Suspense>
  );
}
