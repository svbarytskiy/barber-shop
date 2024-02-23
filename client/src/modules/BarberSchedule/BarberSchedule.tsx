import { FC, MouseEvent, useEffect, useState } from "react"
import { Week } from "./components/Week"
import DoButton from "../../comon/ui/DoButton/DoButton"
import { useStore } from "../../hooks/useStore"
import Modal from "../../comon/ui/ModalWrapper/ModalWrapper"
import { CreateWeekModal } from "./components/CreateWeekModal/CreateWeekModal"

export const BarberSchedule: FC = () => {
    const { store } = useStore()
    const id = store.auth.user.id
    const [isSettingModalOpen, setIsSettingModalOpen] = useState<boolean>(false);

    const closeModal = () => {
        setIsSettingModalOpen(false)
    };

    const handleOpenModal = () => {
        setIsSettingModalOpen(true)
    };

    useEffect(() => {
        store.schedule.getWeekList(id)
    }, [store.schedule]);
    const weeks = store.schedule.weeks || []
    return (
        <>
            <DoButton buttonText={"Create new week"} callbackHandler={() => handleOpenModal()} />
            <Modal isOpen={isSettingModalOpen} onClose={closeModal}>
                <CreateWeekModal id={id} closeModal={closeModal} />
            </Modal >
            {weeks.length > 0 ? (
                weeks.map((week, index) => (
                    <Week key={index} {...week} />
                ))
            ) : (
                <div className="text-center text-xl text-gray-400 my-4">
                    В вас немає розкладу.Бажаєте створити?
                    <DoButton buttonText={"Create new week"} callbackHandler={() => handleOpenModal()} />
                </div>
            )}
        </>
    )
}