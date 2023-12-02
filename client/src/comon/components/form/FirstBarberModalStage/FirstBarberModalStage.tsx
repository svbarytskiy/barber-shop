import { FC } from "react"
import DoButton from "../../../ui/DoButton/DoButton";
import ToggleButton from "../../../ui/ToggleButton/TogleButton";
import FormHeader from "../../../ui/headers/FormHeader/FormHeader";

interface SecondBarberModalStageProps {
    haircut: boolean;
    setHaircut: React.Dispatch<React.SetStateAction<boolean>>;
    hairDyeing: boolean;
    setHairDyeing: React.Dispatch<React.SetStateAction<boolean>>;
    pedicure: boolean;
    setPedicure: React.Dispatch<React.SetStateAction<boolean>>;
    manicure: boolean;
    setManicure: React.Dispatch<React.SetStateAction<boolean>>;
    hairExtension: boolean;
    setHairExtension: React.Dispatch<React.SetStateAction<boolean>>;
    hairStyling: boolean;
    setHairStyling: React.Dispatch<React.SetStateAction<boolean>>;
    handleSubmitStage: (stage: number) => void;
    handleSubmit: () => void;
}

const FirstBarberModalStage: FC<SecondBarberModalStageProps> = ({ haircut,
    setHaircut,
    hairDyeing,
    setHairDyeing,
    pedicure,
    setPedicure,
    manicure,
    setManicure,
    hairExtension,
    setHairExtension,
    hairStyling,
    setHairStyling,
    handleSubmitStage,
    handleSubmit
}) => {
    return (
        <>
            <FormHeader headerText='Виберіть послуги працівника' />
            <div className="grid grid-cols-2 gap-4">
                <ToggleButton btnText='Стрижка волосся' isActive={haircut} btnClick={() => { setHaircut((prev) => !prev) }} />
                <ToggleButton btnText='Фарбування волосся' isActive={hairDyeing} btnClick={() => { setHairDyeing((prev) => !prev) }} />
                <ToggleButton btnText='Педикюр ніг' isActive={pedicure} btnClick={() => { setPedicure((prev) => !prev) }} />
                <ToggleButton btnText='Манікюр рук' isActive={manicure} btnClick={() => { setManicure((prev) => !prev) }} />
                <ToggleButton btnText='Нарощування волосся' isActive={hairExtension} btnClick={() => { setHairExtension((prev) => !prev) }} />
                <ToggleButton btnText='Укладка волосся' isActive={hairStyling} btnClick={() => { setHairStyling((prev) => !prev) }} />
            </div>
            <div className='flex justify-between space-x-4 mt-4'>
                <DoButton buttonText='Back' buttonType='button' callbackHandler={() => handleSubmitStage(1)} />
                <DoButton buttonText='Submit' buttonType='button' callbackHandler={handleSubmit} />
            </div></>
    )
}
export default FirstBarberModalStage;