import { FC } from "react";
import LinkButton from "../../../../comon/ui/LinkButton/LinkButton";

interface BarberCardProps {
    phoneNumber: string;
    barberName: string;
    image: File;
    barberId: string;
    orderService: string;

}

export const ForThreeBarberCard: FC<BarberCardProps> = ({
    barberName,
    image,
    phoneNumber,
    barberId,
    orderService,
}) => {
    return (
        <article className="rounded-lg  border  w-full overflow-hidden flex bg-white ml-10 p-5 flex-col items-center justify-center" >
            <img
                className="rounded-full mb-2 w-[150px] h-[150px] object-cover p-2"
                src={`http://localhost:3009/static/${phoneNumber}/${image}`}
                alt={`Photo of ${barberName}`}
            />
            <div className="ml-3 w-full flex flex-col justify-between">
                <h2 className="text-gray-900 text-xl font-bold text-center">{barberName}</h2>
                <LinkButton
                    linkPath={`/setOrder/${barberId}/${orderService}`}
                    buttonText="Select barber"
                    className="mt-5 mx-auto"
                />
            </div>
        </article >
    );
};

export default ForThreeBarberCard