import { observer } from "mobx-react-lite"
import { useContext } from 'react';
import { Context } from '../../index';
import { Link } from 'react-router-dom';

const UserMail = () => {
    const { store } = useContext(Context)
    const userInfo = store.auth.user;
    return (
        <>
            <h1 className='text-xx text-white text-center p-5'>Пошта</h1>
            <div className='flex-column justify-between items-center pt-2 rounded-lg bg-gray-600 p-10'>
               
            </div>
        </>
    )
}
export default observer(UserMail)