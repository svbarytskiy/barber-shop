import { FC, useState, useContext } from "react"
import DoButton from "../../../../comon/ui/DoButton/DoButton";
import Modal from "../../../../comon/ui/ModalWrapper/ModalWrapper";
import SecondModalForm from "../SecondModalForm/SecondModalForm";
import { Context } from "../../../.."
import DeleteModal from "../DeleteModal/DeleteModal";
import ServiceItem from "../../ui/ServiceItem/ServiceItem";


interface BarberItemProps {
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
}

const BarberItem: FC<BarberItemProps> = ({ barberName, phoneNumber, options, image, id }) => {
    const {
        haircut,
        hairDyeing,
        pedicure,
        manicure,
        hairExtension,
        hairStyling,
    } = options;
    const { store } = useContext(Context);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isSecModalOpen, setIsSecModalOpen] = useState<boolean>(false);
    const UpdateModalOpen = () => {
        setIsSecModalOpen(true);
        setIsModalOpen(false);
    }


    const DeleteModalOpen = () => {
        setIsModalOpen(true);
    }

    const CloseModal = () => {
        setIsModalOpen(false);
        setIsSecModalOpen(false);
    }

    const onSubmitDelete = () => {
        store.barber.deleteBarber(id);
        CloseModal()
    }

    return (
        <div className="max-w-300 border-b">
            <div className="h-50 flex flex-col border-gray-300 justify-between p-4">
                <div className="text-xx text-gray-400">Ім'я: {barberName}</div>
                <div className="text-xx text-gray-400">Номер: {phoneNumber}</div>
            </div>
            <div className="p-3">
                <h1 className="text-lg text-gray-400 text-center">
                    Послуги працівника
                </h1>
                <ul className="grid grid-cols-2 gap-2">
                    {haircut && <ServiceItem label="Стрижка волосся" />}
                    {hairDyeing && <ServiceItem label="Фарбування волосся" />}
                    {pedicure && <ServiceItem label="Педикюр ніг" />}
                    {manicure && <ServiceItem label="Манікюр рук" />}
                    {hairExtension && <ServiceItem label="Нарощування волосся" />}
                    {hairStyling && <ServiceItem label="Укладка волосся" />}
                </ul>
            </div>
            <div className="p-3 flex justify-between">
                <DoButton callbackHandler={DeleteModalOpen} buttonText='Видалити' />
                <Modal isOpen={isModalOpen} onClose={CloseModal}>
                    <DeleteModal barberName={barberName} onSubmitDelete={onSubmitDelete} />
                </Modal>
                <DoButton callbackHandler={UpdateModalOpen} buttonText="Редагувати" />
                <Modal isOpen={isSecModalOpen} onClose={CloseModal}>
                    <SecondModalForm CloseModal={CloseModal} id={id} phoneNumber={phoneNumber} barberName={barberName} options={options} image={image} />
                </Modal>
            </div>
        </div>
    )
}
export default BarberItem;