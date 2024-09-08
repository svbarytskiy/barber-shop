import { FC } from "react";
import ServiceItem from "../../../BarberList/ui/ServiceItem/ServiceItem";
import LinkButton from "../../../../comon/ui/LinkButton/LinkButton";

interface BarberCardProps {
    phoneNumber: string;
    barberName: string;
    image: File;
    barberId: string;
    orderService: string;
}

export const BarberCard: FC<BarberCardProps> = ({
    barberName,
    image,
    phoneNumber,
    barberId,
    orderService,
}) => {
    return (
        <article className="rounded-lg  border h-[200px] w-full overflow-hidden flex bg-white ml-10 p-5">
            <img
                className="rounded-full mb-2 w-[150px] object-cover p-2"
                src={`http://localhost:3009/static/${phoneNumber}/${image}`}
                alt={`Photo of ${barberName}`}
            />
            <div className="ml-3 w-full flex flex-col justify-between">
                <div>
                    <h2 className="text-gray-900 text-3xl font-bold">{barberName}</h2>
                </div>
                <LinkButton
                    linkPath={`/setOrder/${barberId}/${orderService}`}
                    buttonText="Select barber"
                    className="mt-auto ml-auto"
                />
            </div>
        </article>
    );
};
