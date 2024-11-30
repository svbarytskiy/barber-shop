import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../../../hooks/useStore';
import { observer } from 'mobx-react-lite';
import ServiceItem from '../ui/ServiceItem/ServiceItem';
import { IBarber } from '../../../models/IBarber';
import LoadingSpinner from '../../../comon/ui/LoadingSpinner/LoadingSpinner';

interface StageThreeProps {
    onNext: (service: string) => void;
    onPrev: () => void;
    selectedDayId: string | null;
}

export const StageThree: FC<StageThreeProps> = ({ onNext, onPrev, selectedDayId }) => {
    const { store } = useStore();
    const { barberId } = useParams<{ barberId: string }>();
    const [barber, setBarber] = useState<IBarber>();

    useEffect(() => {
        if (barberId && selectedDayId) {
            const foundBarber = store.barber.barbers.find(barber => barber.id === barberId);
            setBarber(foundBarber);
        }
    }, [barberId, selectedDayId, store.barber.barbers]);

    useEffect(() => {
        if (!barber) {
            store.barber.getAllBarbers(); 
        }
    }, [barber, barberId, store.barber]);

    const availableServices = barber ? Object.entries(barber.services)
        .filter(([service, isAvailable]) => isAvailable === true)  
        .map(([service]) => service)  
        : [];

    return (
        <div className='h-full max-h-[410px] sm:max-h-[480px] flex flex-col justify-between'>
            <h2 className="text-xl sm:text-3xl my-5 text-gray-900">Choose a Service</h2>
            {store.session.isLoading ? (
                <div className="flex justify-center items-center h-full w-full">
                    <LoadingSpinner />
                </div>
            ) : store.session.slots.length > 0 ? (
                <div className='grid grid-cols-2 gap-4'>
                    {availableServices.length > 0 ? (
                        availableServices.map((service, index) => (
                            <ServiceItem
                                key={index}
                                service={service}
                                onClick={() => onNext(service)}
                            />
                        ))
                    ) : (
                        <div className="text-center text-xl h-full w-full">No Services</div>
                    )}
                </div>
            ) : (
                <div>No available slots</div>
            )}
            <div className="flex justify-start mt-auto">
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

export default observer(StageThree);
