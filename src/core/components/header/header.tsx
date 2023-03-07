import "./header.css";

export type MenuOption = {
  label: string;
  path: string;
};
const menuOptions: MenuOption[] = [
  { label: "Users", path: "/users" },
  { label: "Register", path: "/users/register" },
  { label: "Login", path: "/users/login" },
];

export function Header() {
  return (
    <header className="header">
      <h1> Social network app</h1>
    </header>
  );
}
