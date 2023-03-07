import { MenuOption } from "../header/header";
import "./nav.menu.scss";

export type MenuProps = {
  options: MenuOption[];
};

export function NavMenu({ options }: MenuProps) {
  return (
    <nav className="menu-container">
      <ul className="menu">
        {options.map((item: MenuOption) => (
          <li key={item.label} className="menu__option">
            <Link to={item.path}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
