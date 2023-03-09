import { AppRouter } from "../components/app.router/app.router";
import { Header } from "../components/header/header";
import { NavMenu } from "../components/nav/nav";

export type MenuOption = {
  label: string;
  path: string;
};

const menuOptions: MenuOption[] = [
  { label: "Users", path: "/users" },
  { label: "Register", path: "/users/register" },
  { label: "Login", path: "/users/login" },
];

function App() {
  return (
    <div className="App">
      <span hidden>Learn</span>
      <Header></Header>
      <NavMenu menuOptions={menuOptions}></NavMenu>
      <AppRouter menuOptions={menuOptions}></AppRouter>
    </div>
  );
}

export default App;
