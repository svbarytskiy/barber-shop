import { FC, MouseEventHandler } from "react"

interface DoButtonProps {
    buttonText: string;
    buttonType?: "button" | "submit" | "reset";
    callbackHandler: MouseEventHandler<HTMLButtonElement>;
}

const DoButton: FC<DoButtonProps> = ({ buttonText, buttonType, callbackHandler }) => {
    return (
        <>
            <div className='flex justify-center items-center text-lg text-white rounded-sm max-w-xs' >
                <button type={buttonType} onClick={callbackHandler} className="max-w-xs w-full px-5 py-2 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded">
                    {buttonText}
                </button>
            </div>
        </>
    )
}
export default DoButton;