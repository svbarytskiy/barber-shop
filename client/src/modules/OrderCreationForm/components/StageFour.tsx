import { FC } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

interface StageFourProps {
    onSubmit: () => void;
}

export const StageFour: FC<StageFourProps> = ({ onSubmit }) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="relative w-full max-w-md p-8 rounded-lg text-center transform transition duration-700 ease-in-out animate-fade-in">
                <img 
                    src="https://i.imgur.com/O9MOmaN.gif" 
                    alt="Success" 
                    className="w-100 h-60 mx-auto mb-4 "
                />
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">
                    You have successfully created an order!
                </h2>
                <p className="text-lg text-gray-700">
                    Thank you for your order. We will process it shortly.
                </p>
                <Link 
                    to="/" // Use the `to` prop to specify the route
                    className="mt-6 px-6 py-2 text-lg bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 inline-block"
                >
                    Return to Home 
                </Link>
            </div>
        </div>
    );
};

export default observer(StageFour);
