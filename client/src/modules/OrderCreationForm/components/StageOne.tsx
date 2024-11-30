import { FC, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../../../hooks/useStore';
import Slider from '../../../comon/components/slider/Slider';
import { DayBoxItem } from '../../SelectDay/components/DayBoxItem/DayBoxItem';
import { observer } from 'mobx-react-lite';
import LoadingSpinner from '../../../comon/ui/LoadingSpinner/LoadingSpinner';

interface StageOneProps {
    onNext: (dayId: string) => void;
}

const StageOne: FC<StageOneProps> = ({ onNext }) => {
    const { store } = useStore();
    const { barberId } = useParams<{ barberId: string }>();
    const [isAnimating, setIsAnimating] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState<number>(3);
    const [rowsPerPage, setRowsPerPage] = useState<number>(2);

    const handleResize = useCallback(() => {
        if (window.innerWidth < 640) {
            setItemsPerPage(2);
            setRowsPerPage(3); 
        } else {
            setItemsPerPage(3);
            setRowsPerPage(2);
        }
    }, []);

    useEffect(() => {
        if (barberId) {
            store.session.getValidDays(barberId);
        }
    }, [barberId, store.session]);

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);

    return (
        <section className="h-full max-h-[340px] sm:max-h-[400px] sm:max-h-[440px]">
            <h1 className="text-lg sm:text-3xl my-5 text-gray-900">Choose a day for your session</h1>
            {store.session.isLoading ? (
                <div className="flex justify-center items-center h-full w-full">
                    <LoadingSpinner />
                </div>
            ) : store.session.days.length > 0 ? (
                <Slider
                    items={store.session.days}
                    itemsPerPage={itemsPerPage}
                    isAnimating={isAnimating}
                    setIsAnimating={setIsAnimating}
                    onNextPage={() => {}}
                    onPrevPage={() => {}}
                    renderItem={(day) => (
                        <DayBoxItem key={day.id} {...day} onClick={() => onNext(day.id)} />
                    )}
                    rowsPerPage={rowsPerPage}
                />
            ) : (
                <div className="text-center text-xl text-gray-700">No available days</div>
            )}
        </section>
    );
};

export default observer(StageOne);
