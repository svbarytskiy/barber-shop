import { Link, NavLink } from 'react-router-dom'
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../../../index';
import DoButton from '../../ui/DoButton/DoButton';
import LinkButton from '../../ui/LinkButton/LinkButton';
import NavItem from '../../ui/NavItem/NavItem';

const Navbar = () => {
    const { store } = useContext(Context);
    const isAuth = store.auth.isAuth;
    const userid = store.auth.user.id;
    const userStatus = store.auth.user.status;

    const logoutHandler = () => {
        store.auth.logout();
        window.localStorage.removeItem('token')
    };

    return (
        <div className='flex py-4 justify-between items-center'>
            <span className='flex justify-center items-center w-6 h-6 bg-gray-600 text-xs text-white rounded-sm'>
                E
            </span>

            {isAuth && (
                <ul className='flex gap-8'>
                    <NavItem navPath='/' navText='Головна' />
                    <NavItem navPath={`/userpage/:${userid}`} navText='Кабінет' />
                    {userStatus === 'Admin' && (
                        <NavItem navPath={`/admin`} navText='Admin' />
                    )}
                    {userStatus === 'Barber' && (
                        <NavItem navPath={`/barberSchedule/:${userid}`} navText='Розклад' />
                    )}
                </ul>
            )}
            {isAuth ? (
                <DoButton buttonText='Вийти' callbackHandler={logoutHandler} />
            ) : (
                <LinkButton linkPath={'/login'} buttonText='Увійти' />
            )}

        </div>
    )
}
export default observer(Navbar);