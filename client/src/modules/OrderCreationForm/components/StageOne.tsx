import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../../../hooks/useStore';
import Slider from '../../../comon/components/slider/Slider';
import { DayBoxItem } from '../../SelectDay/components/DayBoxItem/DayBoxItem';
import { observer } from 'mobx-react-lite';

interface StageOneProps {
    onNext: (dayId: string) => void;
}

const StageOne: FC<StageOneProps> = ({ onNext }) => {
    const { store } = useStore();
    const { barberId } = useParams<{ barberId: string }>();
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (barberId) {
            store.session.getValidDays(barberId);
        }
    }, [barberId, store.session]);

    return (
        <div>
            <h1 className="text-3xl my-5 text-grey-900">Choose a day when you want to have a session</h1>
            {store.session.isLoading ? (
                <div>Loading...</div>
            ) : store.session.days.length > 0 ? (
                <Slider
                    items={store.session.days}
                    itemsPerPage={3}
                    isAnimating={isAnimating}
                    setIsAnimating={setIsAnimating}
                    onNextPage={() => { }}
                    onPrevPage={() => { }}
                    renderItem={(day) => (
                        <DayBoxItem key={day.id} {...day} onClick={() => onNext(day.id)} />
                    )} rowsPerPage={2} />
            ) : (
                <div>No available days</div>
            )}
        </div>
    );
};

export default observer(StageOne)