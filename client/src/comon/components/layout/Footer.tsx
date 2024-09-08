import { FC } from "react";
import Logo from "../../ui/Logo/Logo";
import { NavLink } from "react-router-dom"; // імпорт NavLink для навігації

const NAV_ITEMS = [
    { name: "main", path: "/" },
    { name: "contacts", path: "/contacts" },
    { name: "prices", path: "/prices" },
    { name: "academy", path: "/academy" },
    { name: "help", path: "/help" }
];

const NavItem: FC<{ name: string; path: string }> = ({ name, path }) => (
    <NavLink
        to={path}
        className="text-lg p-5 text-white hover:text-gray-400 hover:shadow-bottom cursor-pointer"

    >
        {name}
    </NavLink>
);

const Footer: FC = () => {
    return (
        <footer className=" w-full bg-blue-100">
            <div className="px-1 py-5 container mx-auto flex items-center justify-between sm:p-5">
                <Logo size="" />
                <nav className="hidden md:flex gap-6">
                    {NAV_ITEMS.map((item) => (
                        <NavItem key={item.name} name={item.name} path={item.path} />
                    ))}
                </nav>
                <button
                    className="px-4 py-2 bg-white text-gray-900 rounded-full focus:outline-none sm:hidden"
                >About us
                </button>
            </div>
        </footer>
    );
}

export default Footer;
