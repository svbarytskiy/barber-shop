import { FC, MouseEventHandler } from "react"

interface DoButtonProps {
    buttonText: string;
    buttonType?: "button" | "submit" | "reset";
    callbackHandler: MouseEventHandler<HTMLButtonElement>;
}

const DoButton: FC<DoButtonProps> = ({ buttonText, buttonType, callbackHandler }) => {
    return (
        <>
            <div className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-2 py-2 max-w-xs' >
                <button type={buttonType} onClick={callbackHandler} className="max-w-xs w-full mx-2 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded">
                    {buttonText}
                </button>
            </div>
        </>
    )
}
export default DoButton;