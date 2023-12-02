import { FC } from "react";
import { Link } from "react-router-dom";

interface LinkButton {
    linkPath: string;
    buttonText: string;
}

const LinkButton: FC<LinkButton> = ({ linkPath, buttonText }) => {
    return (
        <>
            <div className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2'>
                <Link to={linkPath}> {buttonText} </Link>
            </div>
        </>
    )
}
export default LinkButton;