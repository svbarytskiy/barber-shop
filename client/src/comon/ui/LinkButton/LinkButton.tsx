import { FC } from "react";
import { Link } from "react-router-dom";

interface LinkButtonProps {
    linkPath: string;
    buttonText: string;
    className?: string; // Додатковий пропс для стилів
}

const LinkButton: FC<LinkButtonProps> = ({ linkPath, buttonText, className = '' }) => {
    return (
        <Link 
            to={linkPath} 
            className={`inline-flex items-center justify-center px-2 py-2 sm:px-5 sm:py-3 xl:px-6 xl:py-4 bg-blue-500 hover:bg-blue-400 text-white font-bold text-xs sm:text-sm xl:text-lg rounded-xl transition whitespace-nowrap overflow-hidden text-ellipsis ${className}`}
        >
            {buttonText}
        </Link>
    );
}

export default LinkButton;
