import { FC } from "react";
import { Link } from "react-router-dom";

interface LinkButtonProps {
    linkPath: string;
    buttonText: string;
    className?: string; // Додатковий пропс для стилів
}

const LinkButton: FC<LinkButtonProps> = ({ linkPath, buttonText, className = '' }) => {
    return (
        <div
            className={`max-w-xs w-full mx-2 px-8 py-4 bg-white hover:bg-gray-900 text-gray-900 hover:text-white font-bold cursor-pointer text-lg rounded flex justify-center items-center ${className}`}
        >
            <Link to={linkPath} className="text-center">{buttonText}</Link>
        </div>
    )
}

export default LinkButton;
