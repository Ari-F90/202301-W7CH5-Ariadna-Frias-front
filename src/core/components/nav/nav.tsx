import { MenuOption } from "../../app/app";

type MenuProps = {
  menuOptions: MenuOption[];
};

export function NavMenu({ menuOptions }: MenuProps) {
  return (
    <ul className="menu">
      {menuOptions.map((option) => (
        <li key={option.label}>
          <a href={option.path}>{option.label}</a>
        </li>
      ))}
    </ul>
  );
}
