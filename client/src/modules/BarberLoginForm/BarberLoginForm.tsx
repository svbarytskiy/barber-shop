import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DoButton from "../../comon/ui/DoButton/DoButton";
import FormInput from "../../comon/ui/FormInput/FormInput";
import { useStore } from "../../hooks/useStore";

const BarberLoginForm: FC = () => {
    const { store } = useStore();
    const [password, setPassword] = useState<string>('')
    const [phoneNumber, setPhoneNumber] = useState<string>('')
    const navigate = useNavigate()
    const isAuth = store.auth.isAuth;

    useEffect(() => {
        if (isAuth) navigate('/')
    }, [isAuth, navigate])

    const handleSubmit = () => {
        try {
            store.auth.loginBarber(phoneNumber, password);
            setPassword('')
            setPhoneNumber('')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <form
                onSubmit={(e) => e.preventDefault()}
                className='w-1/4 h-60 mx-auto mt-40'
            >
                <h1 className='text-lg text-white text-center'>Авторизация Барбера</h1>
                <FormInput labelText='Phone Number:' inputPlaceholder='Phone Number...' inputType='text' inputValue={phoneNumber} setValue={setPhoneNumber} />
                <FormInput labelText='Password:' inputPlaceholder='Password...' inputType='password' inputValue={password} setValue={setPassword} />
                <div className='flex gap-8 justify-center mt-4'>
                    <DoButton buttonText='Войти' buttonType='submit' callbackHandler={handleSubmit} />
                </div>
            </form>
        </>
    )
}

export default observer(BarberLoginForm)