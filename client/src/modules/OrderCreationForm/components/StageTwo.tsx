import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../../../hooks/useStore';
import Slider from '../../../comon/components/slider/Slider';
import { SlotBoxItem } from '../../../pages/SelectSlotPage/components/SlotBoxItem';
import { observer } from 'mobx-react-lite';
import LoadingSpinner from '../../../comon/ui/LoadingSpinner/LoadingSpinner';

interface StageTwoProps {
    onNext: (date: Date) => void;
    onPrev: () => void;
    selectedDayId: string | null;
}

export const StageTwo: FC<StageTwoProps> = ({ onNext, onPrev, selectedDayId }) => {
    const { store } = useStore();
    const { barberId } = useParams<{ barberId: string }>();
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (barberId && selectedDayId) {
            store.session.getValidSlots(barberId, selectedDayId);
        }
    }, [barberId, selectedDayId, store.session]);

    return (
        <div className='h-full max-h-[310px] sm:max-h-[370px] w-full'>
            <h2 className="text-lg sm:text-3xl my-5 text-gray-900">Choose a Time Slot</h2>
            {store.session.isLoading ? (
                <div className="flex justify-center items-center h-full w-full">
                    <LoadingSpinner />
                </div>
            ) : store.session.slots.length > 0 ? (
                <Slider
                    items={store.session.slots}
                    itemsPerPage={4}
                    isAnimating={isAnimating}
                    setIsAnimating={setIsAnimating}
                    onNextPage={() => { }}
                    onPrevPage={() => { }}
                    renderItem={(slot) => (
                        <SlotBoxItem key={slot.id} {...slot} onClick={() => onNext(slot.date)} />
                    )} rowsPerPage={3} />
            ) : (
                <div>No available slots</div>
            )}
            <div className="flex justify-start">
                <button
                    className="p-2 text-base sm:text-xl rounded bg-blue-500 text-white"
                    onClick={onPrev}
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default observer(StageTwo)