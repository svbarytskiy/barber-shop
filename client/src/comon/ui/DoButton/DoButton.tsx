import { FC, MouseEventHandler } from "react"

interface DoButtonProps {
    buttonText: string;
    buttonType?: "button" | "submit" | "reset";
    callbackHandler: MouseEventHandler<HTMLButtonElement>;
}

const DoButton: FC<DoButtonProps> = ({ buttonText, buttonType, callbackHandler }) => {
    return (
        <>
            <div className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2'>
                <button type={buttonType} onClick={callbackHandler}>{buttonText}</button>
            </div>
        </>
    )
}
export default DoButton;