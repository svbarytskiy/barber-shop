import { FC, useState } from "react"
import DoButton from "../../../../comon/ui/DoButton/DoButton"
import FormInput from "../../../../comon/ui/FormInput/FormInput"
import FileInput from "../../ui/FileInput/FileInput"
import FormHeader from "../../../../comon/ui/headers/FormHeader/FormHeader";


interface BarberFirstStageFormData {
    barberSurname: string;
    setSurname: React.Dispatch<React.SetStateAction<string>>;
    barberName: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    submitPassword: string;
    setSubmitPassword: React.Dispatch<React.SetStateAction<string>>;
    phoneNumber: string;
    setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
    image: File | null;
    setImage: React.Dispatch<React.SetStateAction<File | null>>;
    handleSubmitStage: (stage: number) => void;
}

const FirstStage: FC<BarberFirstStageFormData> = ({ barberSurname, barberName, password, submitPassword, phoneNumber, image, setImage, setPhoneNumber, setSubmitPassword, setPassword, setName, setSurname, handleSubmitStage }) => {
    return (
        <>
            <FormHeader headerText='Реєстрація Працівника' />
            <FileInput labelText="Прикріпити зорбаження:" setImage={setImage} />
            <div className='flex max-w-sm w-full block object-cover py-2'>
                {image && (
                    <img src={URL.createObjectURL(image)} alt={image.name} />
                )}
            </div>
            <div className='flex max-w-sm space-x-4'>
                <FormInput labelText='Прізвище:' inputPlaceholder='Прізвище' inputType='text' inputValue={barberSurname} setValue={setSurname} />
                <FormInput labelText="Ім'я:" inputPlaceholder="Ім'я" inputType='text' inputValue={barberName} setValue={setName} />
            </div>
            <FormInput labelText='Введіть ваш номер телефону:' inputPlaceholder='Phone Number...' inputType='text' inputValue={phoneNumber} setValue={setPhoneNumber} />
            <FormInput labelText='Пароль:' inputPlaceholder='Password...' inputType='password' inputValue={password} setValue={setPassword} />
            <FormInput labelText='Підтвердіть ваш пароль:' inputPlaceholder='Submit Password...' inputType='password' inputValue={submitPassword} setValue={setSubmitPassword} />
            <div className='flex ml-auto space-x-4 mt-4'>
                <DoButton buttonText='Next' buttonType='button' callbackHandler={() => handleSubmitStage(2)} />
            </div>
        </>
    )
}
export default FirstStage;