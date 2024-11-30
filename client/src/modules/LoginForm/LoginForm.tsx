import { useState, useEffect, FunctionComponent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { observer } from "mobx-react-lite";
import FormInput from '../../comon/ui/FormInput/FormInput';
import DoButton from '../../comon/ui/DoButton/DoButton';
import { useStore } from '../../hooks/useStore';
import { Controller, useForm } from 'react-hook-form';

interface MyForm {
    phoneNumber: string,
    password: string
}

const LoginForm: FunctionComponent = () => {
    const { handleSubmit, control, formState: { errors } } = useForm<MyForm>();

    const { store } = useStore();
    const location = useLocation()
    const navigate = useNavigate()
    const isAuth = store.auth.isAuth;

    const fromPage = location.state?.from
        ? location.state.from.pathname + location.state.from.search
        : "/";

    useEffect(() => {
        if (isAuth) navigate(fromPage, { replace: true })
    }, [isAuth, navigate])

    const handleSubmitSend = (data: MyForm) => {
        try {
            store.auth.loginUser(data.phoneNumber, data.password);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(handleSubmitSend)}
            className='w-[500px] h-[450px] mx-auto mt-[250px] rounded-xl bg-white border-gray-900 border-2 flex flex-col py-10 items-center'
        >
            <h1 className='text-4xl text-grey-900 text-center mb-5'>Login</h1>
            <Controller
                name="phoneNumber"
                control={control}
                rules={{
                    required: "Phone number is required",
                    pattern: {
                        value: /^\d{10}$/,
                        message: "Phone number must be exactly 10 digits",
                    },
                    validate: {
                        validFormat: (value) => /^\d{10}$/.test(value) || "Phone number must be exactly 10 digits",
                    },
                }}
                render={({ field }) => (
                    <FormInput
                        labelText="Phone Number:"
                        inputPlaceholder="Phone Number..."
                        inputType="text"
                        inputValue={field.value || ""}
                        setValue={field.onChange}
                    />
                )}
            />
            <div className="max-w-sm w-full">
                {errors.phoneNumber && <p className='text-red-500'>{errors.phoneNumber.message}</p>}
            </div>
            <Controller
                name="password"
                control={control}
                rules={{
                    required: "Password is required",
                }}
                render={({ field }) => (
                    <FormInput
                        labelText="Password:"
                        inputPlaceholder="Password..."
                        inputType="password"
                        inputValue={field.value || ""}
                        setValue={field.onChange}
                    />
                )}
            />

            <div className="max-w-sm w-full">
                {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
            </div>
            <div className='flex gap-8 justify-center mt-4'>
                <DoButton buttonText='Log in' buttonType='submit' />
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