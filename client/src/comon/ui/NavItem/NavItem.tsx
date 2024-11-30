import { FC } from "react"
import { NavLink } from "react-router-dom"


interface NavItemProps {
  navPath: string,
  navText: string
}

const NavItem: FC<NavItemProps> = ({ navPath, navText }) => {
  const activeStyles = {
    color: 'blue',
  }
  return (
    <li className='font-poppins p-3'>
      <NavLink
        to={navPath}
        className='text-lg p-5 text-gray-900'
        style={({ isActive }) =>
          isActive ? activeStyles : undefined
        }
      >
        {navText}
      </NavLink>
    </li>
  );
}
export default NavItem;