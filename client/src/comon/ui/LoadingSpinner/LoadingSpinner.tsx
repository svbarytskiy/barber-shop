import { FC } from 'react';

const LoadingSpinner: FC = () => (
    <div className="flex items-center justify-center h-40">
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
    </div>
);

export default LoadingSpinner;
