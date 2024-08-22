import  { useState, useEffect, FunctionComponent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { observer } from "mobx-react-lite";
import FormInput from '../../comon/ui/FormInput/FormInput';
import DoButton from '../../comon/ui/DoButton/DoButton';
import { useStore } from '../../hooks/useStore';

const LoginForm: FunctionComponent = () => {
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
            store.auth.loginUser(phoneNumber, password);
            setPassword('')
            setPhoneNumber('')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <form
            onSubmit={(e) => e.preventDefault()}
            className='w-[500px] h-[400px] mx-auto mt-40 rounded-xl bg-white border-gray-900 border-2 flex flex-col py-10 items-center'
        >
            <h1 className='text-4xl text-grey-900 text-center mb-5'>Login</h1>
            <FormInput labelText='Phone Number:' inputPlaceholder='Phone Number...' inputType='text' inputValue={phoneNumber} setValue={setPhoneNumber} />
            <FormInput labelText='Password:' inputPlaceholder='Password...' inputType='password' inputValue={password} setValue={setPassword} />
            <div className='flex gap-8 justify-center mt-4'>
                <DoButton buttonText='Log in' buttonType='submit' callbackHandler={handleSubmit} />
                <Link
                    to='/register'
                    className='flex justify-center items-center text-lg text-grey-900'
                >
                    Нет аккаунта ?
                </Link>
            </div>
        </form>
    )
}
export default observer(LoginForm);