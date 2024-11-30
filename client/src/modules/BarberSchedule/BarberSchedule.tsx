import { FC, MouseEvent, useEffect, useState } from "react"
import { Week } from "./components/Week"
import DoButton from "../../comon/ui/DoButton/DoButton"
import { useStore } from "../../hooks/useStore"
import Modal from "../../comon/ui/ModalWrapper/ModalWrapper"
import { CreateWeekModal } from "./components/CreateWeekModal/CreateWeekModal"
import { observer } from 'mobx-react-lite';
import { toJS } from "mobx"

export const BarberSchedule: FC = observer(() => {

    const { store } = useStore()
    const id = store.auth.user.id


    useEffect(() => {
        store.schedule.getWeekList(id)
    }, [store.schedule]);
    const weeks = toJS(store.schedule.weeks) || []

    const [isSettingModalOpen, setIsSettingModalOpen] = useState<boolean>(false);
    const [selectedWeek, setSelectedWeek] = useState<number>(1);


    const toggleWeek = (WeekName: number) => {
        setSelectedWeek(WeekName);
        console.log(selectedWeek)
        const matchingWeeks = weeks.filter(week => week.number === selectedWeek);

        matchingWeeks.forEach(week => {
            console.log(`Days for ${week.number}:`, week.days);
        });
    };

    const closeModal = () => {
        setIsSettingModalOpen(false)
    };

    const handleOpenModal = () => {
        setIsSettingModalOpen(true)
    };

    return (
        <section className="w-full h-full flex-grow">
            <Modal isOpen={isSettingModalOpen} onClose={closeModal}>
                <CreateWeekModal id={id} closeModal={closeModal} />
            </Modal >
            <div className="max-w-[1200px] mx-auto h-full flex-grow my-[140px] ">
                <h1 className="text-6xl ml-5 mb-5">Weeks</h1>
                <div className="flex items-center ml-4">
                    {weeks.map((week, index) => (
                        <div
                            key={week.id}
                            onClick={() => toggleWeek(week.number)}
                            className={`cursor-pointer text-5xl mr-4 p-6 w-24 h-24 flex items-center justify-center rounded-full ${selectedWeek == week.number ? 'bg-blue-200 ' : 'bg-gray-200'} transition-colors`}
                        >
                            {week.number}
                        </div>
                    ))}
                    <div className="rounded-full bg-gray-200 w-16 h-16 p-3 text-5xl text-center cursor-pointer items-center" onClick={()=>handleOpenModal()}>+</div>
                </div>
                {weeks.length > 0 ? (
                    weeks.filter(week => week.number == selectedWeek).map((week, index) => (
                        <Week key={week.id} {...week} />
                    ))
                ) : (
                    <div className="text-center text-xl text-gray-400 my-4">
                        В вас немає розкладу.Бажаєте створити?
                        <DoButton buttonText={"Create new week"} callbackHandler={() => handleOpenModal()} />
                    </div>
                )}
            </div>
        </section>
    )
})