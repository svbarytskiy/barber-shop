import { FC, useState } from "react";
import DoButton from "../../comon/ui/DoButton/DoButton";
import Modal from "../../comon/ui/ModalWrapper/ModalWrapper";
import { observer } from "mobx-react-lite";
import FirstStage from "./components/Stage1/FirstStage";
import { useStore } from "../../hooks/useStore";
import SecondBarberModalStage from "../../comon/components/form/SecondBarberModalStage/SecondBarberModalStage"

const ModalForm: FC = () => {
    const { store } = useStore()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [stage, setStage] = useState<number>(1);
    const [barberSurname, setSurname] = useState<string>('')
    const [barberName, setName] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [submitPassword, setSubmitPassword] = useState<string>('')
    const [phoneNumber, setPhoneNumber] = useState<string>('')
    const [image, setImage] = useState<File | null>(null);

    const [haircut, setHaircut] = useState<boolean>(false);
    const [hairDyeing, setHairDyeing] = useState<boolean>(false);
    const [pedicure, setPedicure] = useState<boolean>(false);
    const [manicure, setManicure] = useState<boolean>(false);
    const [hairExtension, setHairExtension] = useState<boolean>(false);
    const [hairStyling, setHairStyling] = useState<boolean>(false);
    const fullName = `${barberSurname} ${barberName}`

    const handleSubmitStage = (stage: number) => {
        setStage(stage);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };


    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('username', fullName);
            formData.append('password', password);
            formData.append('phoneNumber', phoneNumber);
            formData.append('haircut', String(haircut));
            formData.append('hairDyeing', String(hairDyeing));
            formData.append('pedicure', String(pedicure));
            formData.append('manicure', String(manicure));
            formData.append('hairExtension', String(hairExtension));
            formData.append('hairStyling', String(hairStyling));
            if (image) {
                formData.append('image', image);
            } else {
                console.log('ррррррррррррррр')
            }

            await store.barberAuth.registration(formData);
            closeModal();
            setDefaultState();
            store.barber.getAllBarbers();

        } catch (error) {
            console.error(error);
        }
    }
    const setDefaultState = () => {
        setHaircut(false)
        setHairDyeing(false)
        setPedicure(false)
        setManicure(false)
        setHairExtension(false)
        setHairStyling(false)
        setSurname('')
        setName('')
        setPassword('')
        setSubmitPassword('')
        setPhoneNumber('')
        setImage(null)
    }

    const closeModal = () => {
        setIsModalOpen(false);
        handleSubmitStage(1);
    };
    return (
        <>
            <DoButton buttonText='Створити працівника' buttonType='button' callbackHandler={handleOpenModal} />
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className='p-10 '
                >
                    {stage === 1 && (
                        <>
                            <FirstStage
                                barberSurname={barberSurname}
                                barberName={barberName}
                                password={password}
                                submitPassword={submitPassword}
                                phoneNumber={phoneNumber}
                                image={image}
                                setImage={setImage}
                                setPhoneNumber={setPhoneNumber}
                                setSubmitPassword={setSubmitPassword}
                                setPassword={setPassword}
                                setName={setName}
                                setSurname={setSurname}
                                handleSubmitStage={handleSubmitStage} />
                        </>
                    )}

                    {stage === 2 && (
                        <>
                            <SecondBarberModalStage haircut={haircut}
                                setHaircut={setHaircut}
                                hairDyeing={hairDyeing}
                                setHairDyeing={setHairDyeing}
                                pedicure={pedicure}
                                setPedicure={setPedicure}
                                manicure={manicure}
                                setManicure={setManicure}
                                hairExtension={hairExtension}
                                setHairExtension={setHairExtension}
                                hairStyling={hairStyling}
                                setHairStyling={setHairStyling}
                                handleSubmit={handleSubmit}
                                handleSubmitStage={handleSubmitStage} />
                        </>
                    )}
                </form>
            </Modal>
        </>

    )
}

export default observer(ModalForm);