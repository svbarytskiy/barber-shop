import { Link, NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { FC, useContext, useEffect, useState } from 'react';
import { Context } from '../../../index';
import DoButton from '../../ui/DoButton/DoButton';
import LinkButton from '../../ui/LinkButton/LinkButton';
import NavItem from '../../ui/NavItem/NavItem';
import Logo from '../../ui/Logo/Logo';
import SelectAccordion from '../../ui/SelectAccordion/SelectAccordion';

const Navbar: FC = () => {
    const { store } = useContext(Context);
    const isAuth = store.auth.isAuth;
    const userid = store.auth.user.id;
    const userStatus = store.auth.user.status;
    const [isScrollingDown, setIsScrollingDown] = useState(false);
    const [lastScrollTop, setLastScrollTop] = useState(0);

    const logoutHandler = () => {
        store.auth.logout();
        window.localStorage.removeItem('userToken');
        window.localStorage.removeItem('barberToken');
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            setIsScrollingDown(scrollTop > lastScrollTop);
            setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollTop]);

    return (
        <header className={`fixed top-0 w-full bg-blue-100 shadow-md z-10 transition-transform duration-300 ${isScrollingDown ? '-translate-y-full' : 'translate-y-0'}`}>
            <nav className="px-1 flex sm:px-5 py-4 items-center container mx-auto">
                <Logo size={""} />
                <SelectAccordion defaultText={"Services"} className="mr-1 ml-10 sm:mr-auto">
                    <NavItem navPath='/' navText='main' />
                    {isAuth && (
                        <>
                            <NavItem navPath={`/userpage/${userid}`} navText='home' />
                            {userStatus === 'Admin' && (
                                <NavItem navPath={`/admin`} navText='Admin' />
                            )}
                            {userStatus === 'Barber' && (
                                <NavItem navPath={`/barberSchedule/${userid}`} navText='schedule' />
                            )}
                            {/* Логаут з SVG всередині акордеону для мобільних пристроїв */}
                            <button className="text-lg p-3 text-gray-900 flex items-center cursor-pointer sm:hidden" onClick={logoutHandler}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H5a3 3 0 01-3-3V7a3 3 0 013-3h5a3 3 0 013 3v1" />
                                </svg>
                                Log out
                            </button>
                        </>
                    )}
                </SelectAccordion>
                {/* Кнопка логауту видима лише на екранах sm і більше */}
                <div className="hidden sm:block ml-auto">
                    {isAuth ? (
                        <DoButton buttonText='Log out' callbackHandler={logoutHandler} />
                    ) : (
                        <LinkButton linkPath={'/login'} buttonText='Log in' />
                    )}
                </div>
            </nav>
        </header>
    );
};

export default observer(Navbar);
