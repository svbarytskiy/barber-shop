import { FC } from "react"

interface ToggleButtonProps {
    btnText: string;
    isActive: boolean;
    btnClick: () => void;
}

const ToggleButton: FC<ToggleButtonProps> = ({btnText, isActive, btnClick }) => {
    return (
        <button
            onClick={btnClick}
            className={`py-2 px-4 rounded-md border transition-all duration-300 ${
                isActive
                  ? 'bg-gray-600 text-white hover:bg-gray-700'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
        >
            {btnText}
        </button>
    );
};

export default ToggleButton;