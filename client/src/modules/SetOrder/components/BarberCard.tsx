import { FC } from "react";
import ServiceItem from "../../BarberList/ui/ServiceItem/ServiceItem";
import LinkButton from "../../../comon/ui/LinkButton/LinkButton";

interface BarberCardProps {
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
    barberId: string;
    orderService: string;
}

export const BarberCard: FC<BarberCardProps> = ({ barberName, image, options, phoneNumber, barberId, orderService }) => {
    return (
        <div className="rounded p-4 border h-[600px] w-[400px] overflow-hidden"> {/* Додано класи для розмірів */}
            <img className="rounded mb-2 w-full h-1/2 object-cover" src={`http://localhost:3009/static/${phoneNumber}/${image}`} alt={image?.name} /> {/* Оновлено стилі зображення */}
            <div className="text-gray-400 text-xl my-2 ">{barberName}</div>
            <ul className="grid grid-cols-2 gap-2 overflow-auto mb-10"> {/* Додано overflow-auto для прокрутки, якщо вміст не вміщується */}
                {options.haircut && <ServiceItem label="Стрижка волосся" />}
                {options.hairDyeing && <ServiceItem label="Фарбування волосся" />}
                {options.pedicure && <ServiceItem label="Педикюр ніг" />}
                {options.manicure && <ServiceItem label="Манікюр рук" />}
                {options.hairExtension && <ServiceItem label="Нарощування волосся" />}
                {options.hairStyling && <ServiceItem label="Укладка волосся" />}
            </ul>
            <LinkButton linkPath={`/selectDate/:${barberId}/:${orderService}`} buttonText={"Select barber"}></LinkButton>
        </div>
    )
}