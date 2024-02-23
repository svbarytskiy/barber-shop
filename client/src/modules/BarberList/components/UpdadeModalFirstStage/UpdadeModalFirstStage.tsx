import { FC } from "react"
import DoButton from "../../../../comon/ui/DoButton/DoButton";
import FileInput from "../../../ModalForm/ui/FileInput/FileInput";
import FormInput from "../../../../comon/ui/FormInput/FormInput";


interface UpdateModalFirstStageProps {
    newBarberSurname: string;
    setSurname: React.Dispatch<React.SetStateAction<string>>;
    newBarberName: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    newPhoneNumber: string;
    setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
    image: File | null;
    setImage: React.Dispatch<React.SetStateAction<File | null>>;
    handleSubmitStage: (stage: number) => void;
    newImage: File | null;
    phoneNumber: string;
}

const UpdateModalFirstStage: FC<UpdateModalFirstStageProps> = ({ 
     newBarberSurname,
     newBarberName,
     phoneNumber,
     newPhoneNumber, 
     image, 
     newImage,
     setImage, 
     setPhoneNumber, 
     setName, 
     setSurname, 
     handleSubmitStage }) => {
    return (
        <>
            <FileInput labelText="Прикріпити зорбаження:" setImage={setImage} />
            <div className='flex max-w-sm w-full block object-cover py-2'>
                {newImage !== null ? (
                    <img src={URL.createObjectURL(newImage)}
                        alt={newImage.name} />
                ) : (
                    <img src={`http://localhost:3009/static/${phoneNumber}/${image}`} alt={image?.name} />
                )}
            </div>
            <div className='flex max-w-sm space-x-4'>
                <FormInput labelText='Прізвище:' inputPlaceholder='Прізвище' inputType='text' inputValue={newBarberSurname} setValue={setSurname} />
                <FormInput labelText="Ім'я:" inputPlaceholder="Ім'я" inputType='text' inputValue={newBarberName} setValue={setName} />
            </div>
            <FormInput labelText='Введіть ваш номер телефону:' inputPlaceholder='Phone Number...' inputType='text' inputValue={newPhoneNumber} setValue={setPhoneNumber} />
            <div className='flex ml-auto space-x-4 mt-4'>
                <DoButton buttonText='Next' buttonType='button' callbackHandler={() => handleSubmitStage(2)} />
            </div></>
    )
}
export default UpdateModalFirstStage;