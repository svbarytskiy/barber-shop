import { observer } from "mobx-react-lite";
import { FC } from "react";
import NoItemsBlock from "../../ui/NoItemsBlock/NoItemsBlock";
import { BarberCard } from "../BarberCard/BarberCard";
import ForThreeBarberCard from "../BarberCard/ForThreeBarberCard";
import { IBarber } from "../../../../models/IBarber";

interface BarbersMapProps {
    mapOption: string;
    paginatedBarbers: IBarber[];
}

const BarbersMap: FC<BarbersMapProps> = ({ mapOption, paginatedBarbers }) => {
    const columns = mapOption === "one" ? 1 : mapOption === "two" ? 2 : 3;

    return (
        <section>
            {paginatedBarbers.length > 0 ? (
                <div
                    className={`grid gap-4 justify-items-center ${columns === 1 ? 'grid-cols-1' : columns === 2 ? 'grid-cols-2' : 'grid-cols-3'} auto-cols-fr`}
                >
                    {paginatedBarbers.map((barber) =>
                        columns === 3 ? (
                            <ForThreeBarberCard
                                key={barber.id}
                                phoneNumber={barber.phoneNumber}
                                barberName={barber.username}
                                image={barber.image}
                                barberId={barber.id}
                            />
                        ) : (
                            <BarberCard
                                key={barber.id}
                                phoneNumber={barber.phoneNumber}
                                barberName={barber.username}
                                image={barber.image}
                                barberId={barber.id}
                            />
                        )
                    )}
                </div>
            ) : (
                <NoItemsBlock />
            )}
        </section>
    );
}

export default observer(BarbersMap);
