import React, { FC, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import BarberItem from "./components/BarberItem/BarberItem";

const BarberList: FC = () => {
    const { store } = useContext(Context);
    const barbers = store.barber.barbers || [];
    useEffect(() => {
        store.barber.getAllBarbers();

    }, [store.barber]);

    return (
        <>
            {barbers.length > 0 ? (
                barbers.map((barber) => (
                    <BarberItem key={barber.id} options={barber.services} phoneNumber={barber.phoneNumber} barberName={barber.username} image={barber.image} id={barber.id} />
                ))
            ) : (
                <p className="my-10 text-lg text-gray-500 pb-2 text-center">No barbers available.</p>
            )}
        </>
    );
};

export default observer(BarberList);

