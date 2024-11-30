import { FC } from "react";
import { observer } from "mobx-react-lite";
import LinkButton from "../../../../comon/ui/LinkButton/LinkButton";
import Article from "../../ui/Article/Article";

const FirstBlock: FC = () => {
    return (
        <section
            className="my-10 w-full h-[600px] bg-cover bg-center relative"
            style={{ backgroundImage: `url('/assets/barbershop_minsk-timiryazeva.jpg')` }}
        >
            <div className="h-full w-full absolute inset-0 bg-black opacity-50 rounded-md"></div>
            <div className="absolute text-white inset-x-5 inset-y-5 md:inset-x-10 md:inset-y-10">
                <article>
                    <h1 className="text-4xl my-5 md:text-7xl">Welcome to our barbershop!</h1>
                    <p className="text-2xl md:text-4xl w-full max-w-[500px]">Become part of our family. Enjoy impeccable haircuts and care from our professionals in a cozy atmosphere. We create style for real men!</p>
                </article>
                <div className="flex justify-center w-full">
                    <LinkButton className={'absolute bottom-0 sm:right-5'} linkPath={"/selectBarber"} buttonText={"Sign up for a haircut"} ></LinkButton>
                </div>
            </div>

        </section>

    );
}
export default FirstBlock;

