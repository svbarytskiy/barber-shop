import { FC, MouseEventHandler } from "react"

interface DoButtonProps {
    buttonText: string;
    buttonType?: "button" | "submit" | "reset";
    callbackHandler: MouseEventHandler<HTMLButtonElement>;
}

const DoButton: FC<DoButtonProps> = ({ buttonText, buttonType, callbackHandler }) => {
    return (
        <>
            <button type={buttonType} onClick={callbackHandler} className="max-w-xs px-5 py-2 bg-blue-500 hover:bg-gray-800 text-white font-bold rounded-full">
                {buttonText}
            </button>
        </>
    )
}
export default DoButton;