import { FC } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

interface StageFiveProps {
    onSubmit: () => void;
}

export const StageFive: FC<StageFiveProps> = ({ onSubmit }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full  sm:max-h-[480px] ">
            <div className="relative w-full max-w-md sm:p-8 rounded-lg text-center transform transition duration-700 ease-in-out animate-fade-in">
                <img 
                    src="https://i.imgur.com/O9MOmaN.gif" 
                    alt="Success" 
                    className="w-50 sm:w-100 sm:h-60 mx-auto mb-4 "
                />
                <h2 className="text-base md:text-2xl font-semibold mb-4 text-gray-900">
                    You have successfully created an order!
                </h2>
                <p className="text-xs md:text-lg text-gray-700">
                    Thank you for your order. We will process it shortly.
                </p>
                <Link 
                    to="/" 
                    className="mt-6 text-xs px-2 py-1 md:px-6 py-2 md:text-lg bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 inline-block"
                >
                    Return to Home 
                </Link>
            </div>
        </div>
    );
};

export default observer(StageFive);