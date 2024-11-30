import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface GoBackButtonProps {
  className?: string
}

const GoBackButton: FC<GoBackButtonProps> = ({className}) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <button onClick={goBack} className={`bg-blue-500 text-white p-3 rounded-full flex items-center justify-center ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"  
        />
        <line
          x1="9" 
          y1="12" 
          x2="22" 
          y2="12" 
          stroke="currentColor" 
          strokeWidth={2} 
        />
      </svg>
      <p className="text-white text-lg "></p>
    </button>
  );
};

export default GoBackButton;
