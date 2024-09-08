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
            className={`inline-flex items-center mx-2 px-6 py-3 bg-blue-500 hover:bg-blue-100 text-white font-bold text-lg rounded-xl transition ${className}`}
        >
            {buttonText}
            {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg> */}
        </Link>
    );
}

export default LinkButton;
