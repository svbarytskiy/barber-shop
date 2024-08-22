import React from 'react';

interface ProgressBarProps {
    step: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step }) => {
    const getWidth = () => {
        switch (step) {
            case 1:
                return '0%';
            case 2:
                return '33%';
            case 3:
                return '66%';
            case 4:
                return '100%';

            default:
                return '0%';
        }
    };

    return (
        <div className="w-full bg-gray-200 h-2 rounded-xl my-4">
            <div
                className="bg-blue-500 h-2 rounded-xl transition-width duration-500 ease-in-out"
                style={{ width: getWidth() }}
            ></div>
        </div>
    );
};

export default ProgressBar;
