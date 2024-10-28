import { FC, memo } from "react";
import ServiceItem from "../../../BarberList/ui/ServiceItem/ServiceItem";
import LinkButton from "../../../../comon/ui/LinkButton/LinkButton";

interface BarberCardProps {
    phoneNumber: string;
    barberName: string;
    image: File;
    barberId: string;
}

export const BarberCard: FC<BarberCardProps> = ({
    barberName,
    image,
    phoneNumber,
    barberId,

}) => {
    console.log(barberName)
    return (
        <article className="rounded-lg p-2 border h-full max-h-[200px] w-full overflow-hidden flex bg-white sm:p-5">
            <img
                className="h-[90px] w-[90px] rounded-full mb-2 md:h-[120px] md:w-[120px] xl:h-[150px] xl:w-[150px] object-cover p-2"
                src={`http://localhost:3009/static/${phoneNumber}/${image}`}
                alt={`Photo of ${barberName}`}
            />
            <div className="ml-1 sm:ml-3 w-full flex flex-col justify-between overflow-hidden">
                <h2 className="text-gray-900 text-lg md:text-xl font-bold truncate">
                    {barberName}
                </h2>
                <LinkButton
                    linkPath={`/setOrder/${barberId}`}
                    buttonText="Select barber"
                    className="mt-auto ml-auto"
                />
            </div>
        </article>
    );
};
