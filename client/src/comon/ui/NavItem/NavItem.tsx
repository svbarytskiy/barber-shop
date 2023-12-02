import { FC } from "react"
import { NavLink } from "react-router-dom"


interface NavItemProps {
    navPath: string,
    navText: string
}

const NavItem: FC<NavItemProps> = ({ navPath, navText }) => {
    const activeStyles = {
        color: 'white',
    }
    return (
        <>
            <li>
                <NavLink
                    to={navPath}
                    className='text-xs text-gray-400 hover:text-white'
                    style={({ isActive }) =>
                        isActive ? activeStyles : undefined
                    }
                >
                    {navText}
                </NavLink>
            </li>
        </>
    )
}
export default NavItem;