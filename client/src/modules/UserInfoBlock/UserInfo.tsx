import { useContext } from 'react';
import { Context } from '../../index';
import { observer } from "mobx-react-lite";
import { Link } from 'react-router-dom';
import LinkButton from '../../comon/ui/LinkButton/LinkButton';

const UserInfo = () => {
    const { store } = useContext(Context)
    const userInfo = store.auth.user;
    return (
        <div className='px-4 py-2 bg-gray-100 fixed w-full top-[84px]'>
            {/* <h1 className='text-4xl text-gray-900 text-center '>Personal Cabinet</h1> */}
            <div className="flex ">
                <div className='flex-column justify-between items-center pt-2'>
                    <div className='text-xl text-gray-900'>
                        Your Name: {userInfo.username}
                    </div>
                    <div className='text-xl text-gray-900'>
                        Your Number: {userInfo.phoneNumber}
                    </div>
                </div>
                <LinkButton className='border-2 border-gray-900 ml-auto' buttonText='Edit information' linkPath={`edit`} />
            </div>

        </div>
    )
}
export default observer(UserInfo);