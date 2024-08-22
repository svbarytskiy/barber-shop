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
        window.localStorage.removeItem('token');
    };

    return (
        <div className='flex px-5 py-4 justify-between items-center fixed top-0 w-full bg-white shadow-md z-50'>
            <span className='flex justify-center items-center px-5 py-2 bg-white-900 text-3xl text-black rounded-2xl shadow-lg transition transform hover:text-white hover:bg-gray-900 hover:-translate-y-1 font-dancing italic cursor-pointer'>
                Barbery
            </span>

            {isAuth && (
                <ul className='flex gap-8'>
                    <NavItem navPath='/' navText='main' />
                    <NavItem navPath={`/userpage/:${userid}`} navText='home' />
                    {userStatus === 'Admin' && (
                        <NavItem navPath={`/admin`} navText='Admin' />
                    )}
                    {userStatus === 'Barber' && (
                        <NavItem navPath={`/barberSchedule/:${userid}`} navText='schedule' />
                    )}
                </ul>
            )}
            {isAuth ? (
                <DoButton buttonText='Log out' callbackHandler={logoutHandler} />
            ) : (
                <LinkButton linkPath={'/login'} buttonText='Log in' />
            )}
        </div>
    );
};
export default observer(Navbar);