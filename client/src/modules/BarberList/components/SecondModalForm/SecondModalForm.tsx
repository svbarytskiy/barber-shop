import { useState, FC, useEffect } from "react"
import DoButton from "../../../../comon/ui/DoButton/DoButton"
import FormInput from "../../../../comon/ui/FormInput/FormInput"
import ToggleButton from "../../../../comon/ui/ToggleButton/TogleButton"
import FileInput from "../../../ModalForm/ui/FileInput/FileInput"
import { observer } from "mobx-react-lite"
import { useStore } from "../../../../hooks/useStore"
import FormHeader from "../../../../comon/ui/headers/FormHeader/FormHeader"
import SecondBarberModalStage from "../../../../comon/components/form/SecondBarberModalStage/SecondBarberModalStage"
import UpdateModalFirstStage from "../UpdadeModalFirstStage/UpdadeModalFirstStage"


interface SecondModalFormProps {
    phoneNumber: string,
    barberName: string,
    options: {
        haircut: boolean;
        hairDyeing: boolean;
        pedicure: boolean;
        manicure: boolean;
        hairExtension: boolean;
        hairStyling: boolean;
    };
    image: File;
    id: string;
    CloseModal: () => void;
}

const SecondModalForm: FC<SecondModalFormProps> = ({ phoneNumber, barberName, options, image, id, CloseModal }) => {
    const [stage, setStage] = useState<number>(1);
    const { store } = useStore()
    const fullName = barberName.split(' ')
    const [newBarberSurname, setSurname] = useState<string>(fullName[0])
    const [newBarberName, setName] = useState<string>(fullName[1])
    const [newPhoneNumber, setPhoneNumber] = useState<string>(phoneNumber)
    const [newImage, setImage] = useState<File | null>(null);
    const [newHaircut, setHaircut] = useState<boolean>(options.haircut);
    const [newHairDyeing, setHairDyeing] = useState<boolean>(options.hairDyeing);
    const [newPedicure, setPedicure] = useState<boolean>(options.pedicure);
    const [newManicure, setManicure] = useState<boolean>(options.manicure);
    const [newHairExtension, setHairExtension] = useState<boolean>(options.hairExtension);
    const [newHairStyling, setHairStyling] = useState<boolean>(options.hairStyling);
    const newFullName = `${newBarberSurname} ${newBarberName}`

    const handleSubmitStage = (stage: number) => {
        setStage(stage);
    };

    const handleSubmitForm = async () => {
        try {
            const formData = new FormData();
            formData.append('username', newFullName);
            formData.append('phoneNumber', newPhoneNumber);
            formData.append('haircut', String(newHaircut));
            formData.append('hairDyeing', String(newHairDyeing));
            formData.append('pedicure', String(newPedicure));
            formData.append('manicure', String(newManicure));
            formData.append('hairExtension', String(newHairExtension));
            formData.append('hairStyling', String(newHairStyling));
            if (newImage) {
                formData.append('image', newImage);
            } 
            await store.barber.updateBarber(formData, id)
            CloseModal()
            store.barber.getAllBarbers()
        } catch (e) {
            console.log(e)
        }


    }

    return (
        <>
            <form
                onSubmit={(e) => e.preventDefault()}
                className='p-10 '
            >
                <h1 className='text-xl text-gray-600 pb-5 text-center'>Редагування барбера {barberName}</h1>
                {stage === 1 && (
                    <>
                        <UpdateModalFirstStage
                            newBarberSurname={newBarberSurname}
                            newBarberName={newBarberName}
                            image={image}
                            newImage={newImage}
                            newPhoneNumber={newPhoneNumber}
                            setImage={setImage}
                            setPhoneNumber={setPhoneNumber}
                            setName={setName}
                            setSurname={setSurname}
                            handleSubmitStage={handleSubmitStage}
                            phoneNumber={phoneNumber}
                        />
                    </>
                )}

                {stage === 2 && (
                    <>
                        <SecondBarberModalStage haircut={newHaircut}
                            setHaircut={setHaircut}
                            hairDyeing={newHairDyeing}
                            setHairDyeing={setHairDyeing}
                            pedicure={newPedicure}
                            setPedicure={setPedicure}
                            manicure={newManicure}
                            setManicure={setManicure}
                            hairExtension={newHairExtension}
                            setHairExtension={setHairExtension}
                            hairStyling={newHairStyling}
                            setHairStyling={setHairStyling}
                            handleSubmit={handleSubmitForm}
                            handleSubmitStage={handleSubmitStage} />
                    </>
                )}
            </form>
        </>
    )
}

export default observer(SecondModalForm)