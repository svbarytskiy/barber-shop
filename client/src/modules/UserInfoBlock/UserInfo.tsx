import { useContext } from 'react';
import { Context } from '../../index';
import { observer } from "mobx-react-lite";
import { Link } from 'react-router-dom';
import LinkButton from '../../comon/ui/LinkButton/LinkButton';

const UserInfo = () => {
    const { store } = useContext(Context)
    const userInfo = store.auth.user;
    return (
        <div className='rounded-lg p-4 bg-gray-500'>
            <h1 className='text-xx text-white text-center m-30'>Особистий кабінет</h1>
            <div className='flex-column justify-between items-center pt-2'>
                <div className='text-x text-white opacity-50'>
                    Ваше ім'я: {userInfo.username}
                </div>
                <div className='text-x text-white opacity-50'>
                    Ваш номер: {userInfo.phoneNumber}
                </div>
            </div>
            <LinkButton buttonText='Редагувати Інформацію' linkPath={`edit`} />
        </div>
    )
}
export default observer(UserInfo);