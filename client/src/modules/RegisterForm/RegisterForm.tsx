import { observer } from "mobx-react-lite";
import { useState, useEffect, FunctionComponent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FormInput from "../../comon/ui/FormInput/FormInput";
import DoButton from '../../comon/ui/DoButton/DoButton';
import { useStore } from "../../hooks/useStore";

const RegisterForm: FunctionComponent = () => {
    const { store } = useStore()
    const [userSurname, setSurname] = useState<string>('')
    const [userName, setName] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [submitPassword, setSubmitPassword] = useState<string>('')
    const [phoneNumber, setPhoneNumber] = useState<string>('')
    const fullName = `${userSurname} ${userName}`
    const navigate = useNavigate()
    const isAuth = store.auth.isAuth;

    useEffect(() => {
        if (isAuth) navigate('/')
    }, [isAuth, navigate])

    const handleSubmit = () => {
        try {
            if (password == submitPassword) {
                store.auth.registrationUser(fullName, password, phoneNumber);
                setName('')
                setSurname('')
                setPassword('')
                setPhoneNumber('')
                setSubmitPassword('')
            } else throw ("Неправильно введений пароль.");
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <form
            onSubmit={(e) => e.preventDefault()}
            className='w-1/4 h-60 mx-auto mt-40'
        >
            <h1 className='text-lg text-white text-center'>Реєстрація</h1>

            <div className='flex space-x-4'>
                <FormInput labelText='Прізвище:' inputPlaceholder='Прізвище' inputType='text' inputValue={userSurname} setValue={setSurname} />
                <FormInput labelText="Ім'я:" inputPlaceholder="Ім'я" inputType='text' inputValue={userName} setValue={setName} />
            </div>
            <FormInput labelText='Введіть ваш номер телефону:' inputPlaceholder='Phone Number...' inputType='text' inputValue={phoneNumber} setValue={setPhoneNumber} />
            <FormInput labelText='Пароль:' inputPlaceholder='Password...' inputType='password' inputValue={password} setValue={setPassword} />
            <FormInput labelText='Підтвердіть ваш пароль:' inputPlaceholder='Submit Password...' inputType='password' inputValue={submitPassword} setValue={setSubmitPassword} />
            <div className='flex gap-8 justify-center mt-4'>
            <DoButton buttonText='Зареєструватися' buttonType='submit' callbackHandler={handleSubmit} />
                <Link
                    to='/login'
                    className='flex justify-center items-center text-xs text-white'
                >
                    Маєте акаунт ?
                </Link>
            </div>
        </form >
    )
}
export default observer(RegisterForm);