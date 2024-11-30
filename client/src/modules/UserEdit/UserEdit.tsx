import { observer } from "mobx-react-lite";
import { useContext } from 'react';
import { Context } from '../../index';
import { useState, useEffect, FunctionComponent } from 'react'
import FormInput from "../../comon/ui/FormInput/FormInput";
import DoButton from '../../comon/ui/DoButton/DoButton';

const UserEdit: FunctionComponent = () => {
    const { store } = useContext(Context)
    const userInfo = store.auth.user;
    const fullName = userInfo && userInfo.username ? userInfo.username.split(' ') : [];
    const [userSurname, setSurname] = useState<string>(fullName[0])
    const [userName, setName] = useState<string>(fullName[1])
    const [phoneNumber, setPhoneNumber] = useState<string>(userInfo.phoneNumber)
    const newfullName = `${userSurname} ${userName}`
    const handleSubmit = () => {
        try {
            store.auth.updateUser(newfullName, phoneNumber);
            setName('')
            setSurname('')
            setPhoneNumber('')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <form
            onSubmit={(e) => e.preventDefault()}
            className='w-1/4 h-60 mx-auto mt-40'
        >
            <h1 className='text-lg text-white text-center'>Редагування профілю</h1>
            <div className='flex space-x-4'>
                <FormInput labelText='Прізвище:' inputPlaceholder='Прізвище' inputType='text' inputValue={userSurname} setValue={setSurname} />
                <FormInput labelText="Ім'я:" inputPlaceholder="Ім'я" inputType='text' inputValue={userName} setValue={setName} />
            </div>
            <FormInput labelText='Введіть ваш номер телефону:' inputPlaceholder='Phone Number...' inputType='text' inputValue={phoneNumber} setValue={setPhoneNumber} />

            <div className='flex gap-8 justify-center mt-4'>
                <DoButton buttonText='Редагувати' buttonType='submit' callbackHandler={handleSubmit} />
            </div>
        </form>
    )
}
export default observer(UserEdit);