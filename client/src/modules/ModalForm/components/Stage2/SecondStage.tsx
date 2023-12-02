import { FC, useState } from "react";
import ToggleButton from "../../../../comon/ui/ToggleButton/TogleButton";

interface IBarberServices {
    haircut: string;
    hairDyeing: string;
    pedicure: string;
    manicure: string;
    hairExtension: string;
    hairStyling: string;
}

const SecondStage: FC = () => {
    const [services, setServices] = useState<string[]>(['']);
    const [haircut, setHaircut] = useState<boolean>(false);
    const [hairDyeing, setHairDyeing] = useState<boolean>(false);
    const [pedicure, setPedicure] = useState<boolean>(false);
    const [manicure, setManicure] = useState<boolean>(false);
    const [hairExtension, setHairExtension] = useState<boolean>(false);
    const [hairStyling, setHairStyling] = useState<boolean>(false);

    return (
        <>
            <h1 className='text-lg text-gray-600 pb-2 text-center'>Виберіть послуги працівника</h1>
            <div className="grid grid-cols-2 gap-4">
                <ToggleButton btnText='Стрижка волосся' isActive={haircut} btnClick={() => { setHaircut((prev) => !prev) }} />
                <ToggleButton btnText='Фарбування волосся' isActive={hairDyeing} btnClick={() => { setHairDyeing((prev) => !prev) }} />
                <ToggleButton btnText='Педикюр ніг' isActive={pedicure} btnClick={() => { setPedicure((prev) => !prev) }} />
                <ToggleButton btnText='Манікюр рук' isActive={manicure} btnClick={() => { setManicure((prev) => !prev) }} />
                <ToggleButton btnText='Нарощування волосся' isActive={hairExtension} btnClick={() => { setHairExtension((prev) => !prev) }} />
                <ToggleButton btnText='Укладка волосся' isActive={hairStyling} btnClick={() => { setHairStyling((prev) => !prev) }} />
            </div>
        </>
    )
}
export default SecondStage;