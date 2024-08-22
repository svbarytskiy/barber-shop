import { FC } from "react"
import { NavLink } from "react-router-dom"


interface NavItemProps {
    navPath: string,
    navText: string
}

const NavItem: FC<NavItemProps> = ({ navPath, navText }) => {
    const activeStyles = {
        color: 'gray',
    }
    return (
        <li className='font-poppins'>
      <NavLink
        to={navPath}
        className='text-lg p-5 text-gray-900 hover:text-gray-700 hover:shadow-bottom hover:border-b-2 hover:border-gray-900 transition-all duration-300'
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