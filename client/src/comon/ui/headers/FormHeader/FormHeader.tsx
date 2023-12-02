import { FC } from "react";

interface FormHeaderProps {
    headerText: string;
    newStyles?: string;
}

const FormHeader: FC<FormHeaderProps> = ({ headerText, newStyles }) => {
    return (
        <>
            <h1 className={`text-lg text-gray-600 pb-2 text-center ${newStyles}`}>
                {headerText}
            </h1>
        </>
    );
};

export default FormHeader;
