import { FC } from "react";
import { observer } from "mobx-react-lite";
import LinkButton from "../../../comon/ui/LinkButton/LinkButton";

const FisrtBlock: FC = () => {
    return (
        <div
            className="my-10 w-full h-[600px] bg-cover bg-center relative"
            style={{ backgroundImage: `url('/assets/barbershop_minsk-timiryazeva.jpg')` }}
        >
            <div className="h-full w-full absolute inset-0 bg-black opacity-50 rounded-md"></div>
            <div className="absolute text-white inset-x-10 inset-y-10">
                <h1 className="text-7xl my-5">Welcome to our barbershop!</h1>
                <p className="text-4xl w-full max-w-[500px]">Become part of our family. Enjoy impeccable haircuts and care from our professionals in a cozy atmosphere. We create style for real men!</p>
                <LinkButton className={'absolute right-5 bottom-0'} linkPath={"/selectBarber"} buttonText={"Sign up for a haircut"} ></LinkButton>
            </div>
        </div>

    );
}

export default observer(FisrtBlock);
