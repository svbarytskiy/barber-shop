import { FC } from "react";
import { observer } from "mobx-react-lite";
import LinkButton from "../../../comon/ui/LinkButton/LinkButton";

export const Footer: FC = () => {
    return (
        <div
            className="w-full h-[100px] flex bg-gray-900 items-center flex "
        >
            <span className='px-5 items-center bg-white-900 text-4xl text-white shadow-lg font-dancing italic cursor-pointer'>
                Barbery
            </span>
            <div className="flex ml-auto mr-[100px] gap-[50px]">
                <div className="className='text-lg p-5 text-white hover:text-gray-400 hover:shadow-bottom cursor-pointer">main</div>
                <div className="className='text-lg p-5 text-white hover:text-gray-400 hover:shadow-bottom cursor-pointer">contacts</div>
                <div className="className='text-lg p-5 text-white hover:text-gray-400 hover:shadow-bottom cursor-pointer">prices</div>
                <div className="className='text-lg p-5 text-white hover:text-gray-400 hover:shadow-bottom cursor-pointer">academy</div>
                <div className="className='text-lg p-5 text-white hover:text-gray-400 hover:shadow-bottom cursor-pointer">help</div>
            </div>
        </div>

    );
}

