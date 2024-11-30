import { observer } from "mobx-react-lite";
import { useState, useEffect, FunctionComponent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FormInput from "../../comon/ui/FormInput/FormInput";
import DoButton from '../../comon/ui/DoButton/DoButton';
import { useStore } from "../../hooks/useStore";
import { Controller, useForm } from "react-hook-form";

interface MyForm {
    phoneNumber: string;
    password: string;
    userSurname: string;
    userName: string;
    submitPassword: string;
}

const RegisterForm: FunctionComponent = () => {
    const { handleSubmit, control, formState: { errors, isValid } } = useForm<MyForm>({ mode: "onChange", });
    const { store } = useStore()
    const navigate = useNavigate()
    const isAuth = store.auth.isAuth;

    useEffect(() => {
        if (isAuth) navigate('/')
    }, [isAuth, navigate])

    const handleSubmitSend = (data: MyForm) => {
        try {
            store.auth.registrationUser(`${data.userSurname} ${data.userName}`, data.password, data.phoneNumber);
        } catch (error) {
            console.log(error);
        }
    };

    const validateFields = (value: string) => {
        const hasCyrillic = /[а-яА-Я]/.test(value);
        const isValid = /^[A-Z][a-z]{2,}$/.test(value); 
        if (hasCyrillic) return "Fields must not contain Cyrillic characters.";
        return isValid || "Must be like 'Jimmy Neitron'.";
    };

    return (
        <form
            onSubmit={handleSubmit(handleSubmitSend)}
            className='w-[500px] h-[700px] mx-auto mt-40 rounded-xl bg-white border-gray-900 border-2 flex flex-col py-10 items-center'
        >
            <h1 className='text-grey-900 text-4xl text-center mb-5'>Sign up</h1>
            <div className='flex space-x-4 max-w-[380px] mb-4'>
                <Controller
                    name="userSurname"
                    control={control}
                    rules={{
                        required: "Surname is required.",
                        validate: validateFields,
                    }}
                    render={({ field }) => (
                        <FormInput
                            labelText='Surname:'
                            inputPlaceholder='Surname'
                            inputType='text'
                            inputValue={field.value || ""}
                            setValue={field.onChange}
                        />
                    )}
                />
                <Controller
                    name="userName"
                    control={control}
                    rules={{
                        required: "Name is required.",
                        validate: validateFields,
                    }}
                    render={({ field }) => (
                        <FormInput
                            labelText="Name:"
                            inputPlaceholder="Name"
                            inputType='text'
                            inputValue={field.value || ""}
                            setValue={field.onChange}
                        />
                    )}
                />
            </div>

            <div className="max-w-sm w-full">
                {(errors.userSurname || errors.userName) && (
                    <p className='text-red-500 mb-4'>
                        {errors.userSurname?.message || errors.userName?.message}
                    </p>
                )}
            </div>
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
                    minLength: {
                        value: 8,
                        message: "Password should be at least 8 symbols",
                    },
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
            <Controller
                name="submitPassword"
                control={control}
                rules={{
                    required: "Please confirm your password",
                    validate: {
                        match: (value, { password }) => value === password || "Passwords must match.",
                    },
                }}
                render={({ field }) => (
                    <FormInput
                        labelText='Submit your password:'
                        inputPlaceholder='Submit Password...'
                        inputType='password'
                        inputValue={field.value || ""}
                        setValue={field.onChange}
                    />
                )}
            />
            <div className="max-w-sm w-full">
                {errors.submitPassword && <p className='text-red-500'>{errors.submitPassword.message}</p>}
            </div>
            <div className='flex gap-8 justify-center mt-4'>
                <DoButton buttonText='Sign up' buttonType='submit' disabled={!isValid} />
                <Link
                    to='/login'
                    className='flex justify-center items-center text-lg text-grey-900'
                >
                    Маєте акаунт ?
                </Link>
            </div>
        </form >
    )
}
export default observer(RegisterForm);