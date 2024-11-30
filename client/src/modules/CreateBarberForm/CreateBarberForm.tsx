import { ChangeEvent, FC, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import DoButton from "../../comon/ui/DoButton/DoButton"
import FormInput from "../../comon/ui/FormInput/FormInput"
import { observer } from "mobx-react-lite"
import MySelect from "../../comon/ui/MySelect/MySelect"
import { useStore } from "../../hooks/useStore"

const CreateBarberForm: FC = () => {
    const { store } = useStore()
    const [barberSurname, setSurname] = useState<string>('')
    const [barberName, setName] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [submitPassword, setSubmitPassword] = useState<string>('')
    const [phoneNumber, setPhoneNumber] = useState<string>('')
    const [image, setImage] = useState<File | null>(null);
    const fullName = `${barberSurname} ${barberName}`
    const navigate = useNavigate()

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        setImage(selectedFile || null);
    };
    const handleSubmit = () => {
        try {
            if (password == submitPassword) {
                //              store.barber.registration(fullName, password, phoneNumber);
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
            <h1 className='text-lg text-white text-center'>Реєстрація Працівника</h1>
            <label className='text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer'>
                Прикріпити зорбаження:
                <input
                    type='file'
                    className='hidden'
                    onChange={handleFileChange}
                />
            </label>
            <div className='flex object-cover py-2'>
                {image && (
                    <img src={URL.createObjectURL(image)} alt={image.name} />
                )}
            </div>
            <div className='flex space-x-4'>
                <FormInput labelText='Прізвище:' inputPlaceholder='Прізвище' inputType='text' inputValue={barberSurname} setValue={setSurname} />
                <FormInput labelText="Ім'я:" inputPlaceholder="Ім'я" inputType='text' inputValue={barberName} setValue={setName} />
            </div>
            <FormInput labelText='Введіть ваш номер телефону:' inputPlaceholder='Phone Number...' inputType='text' inputValue={phoneNumber} setValue={setPhoneNumber} />
            <FormInput labelText='Пароль:' inputPlaceholder='Password...' inputType='password' inputValue={password} setValue={setPassword} />
            <FormInput labelText='Підтвердіть ваш пароль:' inputPlaceholder='Submit Password...' inputType='password' inputValue={submitPassword} setValue={setSubmitPassword} />
            <div className='flex gap-8 justify-center mt-4'>
                <DoButton buttonText='Зареєструвати працівника' buttonType='submit' callbackHandler={handleSubmit} />
            </div>
        </form >
    )
}

export default observer(CreateBarberForm);