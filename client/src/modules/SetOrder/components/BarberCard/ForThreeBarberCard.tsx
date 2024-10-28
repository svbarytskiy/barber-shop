import { FC } from "react";
import LinkButton from "../../../../comon/ui/LinkButton/LinkButton";

interface BarberCardProps {
    phoneNumber: string;
    barberName: string;
    image: File;
    barberId: string;
}

export const ForThreeBarberCard: FC<BarberCardProps> = ({
    barberName,
    image,
    phoneNumber,
    barberId,
}) => {
    return (
        <article className="rounded-lg border w-full overflow-hidden flex bg-white p-5 flex-col items-center justify-center">
            <img
                className="rounded-full mb-2 w-[100px] h-[100px] md:w-[150px] md:h-[150px] object-cover p-2"
                src={`http://localhost:3009/static/${phoneNumber}/${image}`}
                alt={`Photo of ${barberName}`}
            />
            <div className="w-full flex flex-col items-center">
                <h2 className="text-gray-900 text-lg md:text-xl font-bold text-center truncate w-full">
                    {barberName}
                </h2>
                <LinkButton
                    linkPath={`/setOrder/${barberId}`}
                    buttonText="Select barber"
                    className="mt-5 mx-auto"
                />
            </div>
        </article>
    );
};

export default ForThreeBarberCard;
